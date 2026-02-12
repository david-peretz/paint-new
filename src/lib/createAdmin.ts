import { supabase } from './supabase';

export const createAdminUser = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@painting.com',
    password: 'Admin123!',
  });

  if (error) {
    console.error('Error creating admin user:', error.message);
    return;
  }

  console.log('Admin user created successfully');
};