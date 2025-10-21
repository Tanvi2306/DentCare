-- Create enum for dentist verification status
CREATE TYPE public.dentist_verification_status AS ENUM ('pending', 'verified', 'rejected');

-- Create dentists profile table
CREATE TABLE public.dentists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  license_number TEXT NOT NULL UNIQUE,
  clinic_name TEXT NOT NULL,
  clinic_address TEXT NOT NULL,
  phone TEXT NOT NULL,
  specialization TEXT,
  years_of_experience INTEGER,
  verification_status dentist_verification_status DEFAULT 'pending' NOT NULL,
  verification_documents JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.dentists ENABLE ROW LEVEL SECURITY;

-- Dentists can view their own profile
CREATE POLICY "Dentists can view own profile"
ON public.dentists
FOR SELECT
USING (auth.uid() = user_id);

-- Dentists can insert their own profile
CREATE POLICY "Dentists can insert own profile"
ON public.dentists
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Dentists can update their own profile
CREATE POLICY "Dentists can update own profile"
ON public.dentists
FOR UPDATE
USING (auth.uid() = user_id);

-- Create function to automatically create dentist profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_dentist()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.dentists (
    user_id,
    full_name,
    license_number,
    clinic_name,
    clinic_address,
    phone,
    specialization,
    years_of_experience
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'license_number',
    NEW.raw_user_meta_data->>'clinic_name',
    NEW.raw_user_meta_data->>'clinic_address',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'specialization',
    (NEW.raw_user_meta_data->>'years_of_experience')::INTEGER
  );
  RETURN NEW;
END;
$$;

-- Trigger to create dentist profile on user signup
CREATE TRIGGER on_dentist_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_dentist();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_dentist_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger for automatic timestamp updates
CREATE TRIGGER update_dentists_updated_at
  BEFORE UPDATE ON public.dentists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_dentist_updated_at();