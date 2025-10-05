import supabase from '../../lib/supabase';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create admin user table if it doesn't exist
    // Note: This requires admin/service key, not anon key for DDL operations

    // For now, just try to create the admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const { data, error } = await supabase
      .from('admin_users')
      .upsert({
        email: 'admin@example.com',
        password_hash: hashedPassword,
        name: 'Admin User',
        role: 'super_admin'
      }, {
        onConflict: 'email',
        ignoreDuplicates: true
      });

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: 'Database setup completed',
      user: data
    });

  } catch (error) {
    console.error('Database setup error:', error);
    return res.status(500).json({
      error: 'Database setup failed',
      details: error.message
    });
  }
}