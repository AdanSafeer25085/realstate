import supabase from '../../../lib/supabase';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Default admin credentials
  const DEFAULT_EMAIL = 'admin@example.com';
  const DEFAULT_PASSWORD = 'admin123';

  try {
    // Try database first
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (user && !error) {
      // Database user exists, check password
      const isValid = await bcrypt.compare(password, user.password_hash);
      if (isValid) {
        const { password_hash, ...userData } = user;
        return res.status(200).json({
          success: true,
          user: userData
        });
      }
    }
  } catch (dbError) {
    console.log('Database not available, using fallback credentials');
  }

  // Fallback to default credentials if database fails or user not found
  if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
    return res.status(200).json({
      success: true,
      user: {
        id: '1',
        email: DEFAULT_EMAIL,
        name: 'Admin User',
        role: 'super_admin'
      }
    });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}