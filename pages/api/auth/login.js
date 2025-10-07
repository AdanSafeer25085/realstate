export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Simple credential check - no bcrypt, no complex auth
  const DEFAULT_EMAIL = 'admin@example.com';
  const DEFAULT_PASSWORD = 'admin123';

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