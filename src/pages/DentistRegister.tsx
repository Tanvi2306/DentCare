import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, UserPlus, ArrowLeft } from "lucide-react";
import { z } from "zod";

const registrationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  fullName: z.string().min(2, "Full name is required").max(100),
  licenseNumber: z.string().min(3, "License number is required").max(50),
  clinicName: z.string().min(2, "Clinic name is required").max(200),
  clinicAddress: z.string().min(5, "Clinic address is required").max(500),
  phone: z.string().min(10, "Valid phone number is required").max(20),
  specialization: z.string().optional(),
  yearsOfExperience: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const DentistRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<RegistrationForm>>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    licenseNumber: "",
    clinicName: "",
    clinicAddress: "",
    phone: "",
    specialization: "",
    yearsOfExperience: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationForm, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof RegistrationForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form
    const validation = registrationSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof RegistrationForm, string>> = {};
      validation.error.errors.forEach(err => {
        const path = err.path[0] as keyof RegistrationForm;
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const { email, password, fullName, licenseNumber, clinicName, clinicAddress, phone, specialization, yearsOfExperience } = validation.data;
      
      // Sign up with Supabase
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dentist/dashboard`,
          data: {
            full_name: fullName,
            license_number: licenseNumber,
            clinic_name: clinicName,
            clinic_address: clinicAddress,
            phone: phone,
            specialization: specialization || null,
            years_of_experience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
          }
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      toast({
        title: "Registration Successful!",
        description: "Your account is pending verification. You can now login.",
      });

      // Redirect to login page
      setTimeout(() => {
        navigate("/dentist/login");
      }, 1500);
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-background to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="space-y-2">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dentist Registration
          </CardTitle>
          <CardDescription>
            Register your dental practice to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Account Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="doctor@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Dr. John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number *</Label>
                  <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    placeholder="DEN123456"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                  />
                  {errors.licenseNumber && <p className="text-xs text-destructive">{errors.licenseNumber}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization (Optional)</Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    placeholder="e.g., Orthodontics"
                    value={formData.specialization}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsOfExperience">Years of Experience (Optional)</Label>
                  <Input
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Clinic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Clinic Information</h3>
              <div className="space-y-2">
                <Label htmlFor="clinicName">Clinic Name *</Label>
                <Input
                  id="clinicName"
                  name="clinicName"
                  placeholder="Smile Dental Clinic"
                  value={formData.clinicName}
                  onChange={handleChange}
                  required
                />
                {errors.clinicName && <p className="text-xs text-destructive">{errors.clinicName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinicAddress">Clinic Address *</Label>
                <Input
                  id="clinicAddress"
                  name="clinicAddress"
                  placeholder="123 Main St, City, State, ZIP"
                  value={formData.clinicAddress}
                  onChange={handleChange}
                  required
                />
                {errors.clinicAddress && <p className="text-xs text-destructive">{errors.clinicAddress}</p>}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/dentist/login" className="text-primary hover:underline font-medium">
                Login here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DentistRegister;