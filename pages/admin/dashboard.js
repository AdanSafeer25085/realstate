import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Trash2, Edit, Plus, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    checkAuth();
    fetchProperties();
  }, []);

  const checkAuth = () => {
    // Check if user is logged in using sessionStorage
    const adminUser = sessionStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
      return;
    }
    setUser(JSON.parse(adminUser));
  };

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      setProperties(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminUser');
    router.push('/');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProperties(properties.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleToggleDisplay = async (id, currentValue) => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ display_in_slider: !currentValue }),
      });

      if (res.ok) {
        setProperties(properties.map(p =>
          p.id === id ? { ...p, display_in_slider: !currentValue } : p
        ));
      } else {
        alert('Failed to update property display setting');
      }
    } catch (err) {
      console.error('Toggle display error:', err);
      alert('Error updating property display setting');
    }
  };

  const filteredProperties = selectedTab === 'all'
    ? properties
    : properties.filter(p => p.type === selectedTab);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-2xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="mb-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 rounded ${selectedTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              All Properties ({properties.length})
            </button>
            <button
              onClick={() => setSelectedTab('commercial')}
              className={`px-4 py-2 rounded ${selectedTab === 'commercial' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Commercial ({properties.filter(p => p.type === 'commercial').length})
            </button>
            <button
              onClick={() => setSelectedTab('residential')}
              className={`px-4 py-2 rounded ${selectedTab === 'residential' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Residential ({properties.filter(p => p.type === 'residential').length})
            </button>
            <button
              onClick={() => setSelectedTab('sco')}
              className={`px-4 py-2 rounded ${selectedTab === 'sco' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              SCO ({properties.filter(p => p.type === 'sco').length})
            </button>
          </div>
          <button
            onClick={() => router.push('/admin/properties/new')}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            <Plus className="w-5 h-5" />
            <span>Add Property</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Show in Slider</th>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Featured</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => (
                <tr key={property.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={property.display_in_slider === true}
                      onChange={() => handleToggleDisplay(property.id, property.display_in_slider)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      title={property.display_in_slider ? "Property shows in sliders" : "Property only shows in dropdown menus"}
                    />
                  </td>
                  <td className="px-4 py-3">{property.id}</td>
                  <td className="px-4 py-3 font-medium">{property.title}</td>
                  <td className="px-4 py-3">{property.location}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      property.type === 'commercial' ? 'bg-blue-100 text-blue-800' :
                      property.type === 'residential' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {property.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">{property.price}</td>
                  <td className="px-4 py-3">
                    {property.featured && <span className="text-green-600">✓</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/admin/properties/${property.id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}