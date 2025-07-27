-- Create admin configuration table to store the admin email
CREATE TABLE public.admin_config (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS for admin_config
ALTER TABLE public.admin_config ENABLE ROW LEVEL SECURITY;

-- Only admins can view and modify admin config
CREATE POLICY "Only admins can view admin config" 
ON public.admin_config 
FOR SELECT 
USING (auth.email() IN (SELECT admin_email FROM public.admin_config));

CREATE POLICY "Only admins can update admin config" 
ON public.admin_config 
FOR UPDATE 
USING (auth.email() IN (SELECT admin_email FROM public.admin_config));

-- Insert the default admin email (you can change this)
INSERT INTO public.admin_config (admin_email) VALUES ('admin@yourhotel.com');

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_config 
    WHERE admin_email = auth.email()
  );
$$;

-- Update training_modules table to allow admin operations
CREATE POLICY "Admins can manage training modules" 
ON public.training_modules 
FOR ALL 
USING (public.is_admin());

-- Update quizzes table to allow admin operations  
CREATE POLICY "Admins can manage quizzes" 
ON public.quizzes 
FOR ALL 
USING (public.is_admin());

-- Add trigger for updating timestamps on admin_config
CREATE TRIGGER update_admin_config_updated_at
BEFORE UPDATE ON public.admin_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();