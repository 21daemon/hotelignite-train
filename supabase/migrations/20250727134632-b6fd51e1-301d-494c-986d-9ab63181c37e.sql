-- Fix the security definer function by setting search path
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_config 
    WHERE admin_email = auth.email()
  );
$$;