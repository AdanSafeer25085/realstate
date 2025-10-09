import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Trash2, Edit, Plus, LogOut, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const PROPERTIES_PER_PAGE = 25;

  useEffect(() => {
    checkAuth();
    fetchProperties();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Filter properties by tab and search term
  const filteredProperties = properties.filter(property => {
    const matchesTab = selectedTab === 'all' || property.type === selectedTab;
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / PROPERTIES_PER_PAGE);
  const startIndex = (currentPage - 1) * PROPERTIES_PER_PAGE;
  const endIndex = startIndex + PROPERTIES_PER_PAGE;
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 space-y-4 md:space-y-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Admin Dashboard</h1>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-sm md:text-base text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center space-x-2 bg-red-600 text-white px-3 py-2 md:px-4 rounded hover:bg-red-700 text-sm md:text-base"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search properties by name..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="mb-6 md:mb-8 flex flex-col lg:flex-row gap-4 lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded text-sm md:text-base ${selectedTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              All <span className="hidden sm:inline">Properties</span> ({filteredProperties.length})
            </button>
            <button
              onClick={() => setSelectedTab('commercial')}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded text-sm md:text-base ${selectedTab === 'commercial' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Commercial ({properties.filter(p => p.type === 'commercial' && p.title.toLowerCase().includes(searchTerm.toLowerCase())).length})
            </button>
            <button
              onClick={() => setSelectedTab('residential')}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded text-sm md:text-base ${selectedTab === 'residential' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Residential ({properties.filter(p => p.type === 'residential' && p.title.toLowerCase().includes(searchTerm.toLowerCase())).length})
            </button>
            <button
              onClick={() => setSelectedTab('sco')}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded text-sm md:text-base ${selectedTab === 'sco' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              SCO ({properties.filter(p => p.type === 'sco' && p.title.toLowerCase().includes(searchTerm.toLowerCase())).length})
            </button>
          </div>
          <button
            onClick={() => router.push('/admin/properties/new')}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm md:text-base w-full lg:w-auto"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            <span>Add Property</span>
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm">Show in Slider</th>
                <th className="px-4 py-3 text-left text-sm">ID</th>
                <th className="px-4 py-3 text-left text-sm">Title</th>
                <th className="px-4 py-3 text-left text-sm">Location</th>
                <th className="px-4 py-3 text-left text-sm">Type</th>
                <th className="px-4 py-3 text-left text-sm">Price</th>
                <th className="px-4 py-3 text-left text-sm">Featured</th>
                <th className="px-4 py-3 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProperties.map((property) => (
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
                  <td className="px-4 py-3 text-sm">{property.id}</td>
                  <td className="px-4 py-3 font-medium text-sm">{property.title}</td>
                  <td className="px-4 py-3 text-sm">{property.location}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      property.type === 'commercial' ? 'bg-blue-100 text-blue-800' :
                      property.type === 'residential' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {property.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{property.price}</td>
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

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{property.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{property.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={property.display_in_slider === true}
                      onChange={() => handleToggleDisplay(property.id, property.display_in_slider)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                    />
                    <span className="ml-2 text-xs text-gray-600">Show in Slider</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <span className="text-xs text-gray-500">ID:</span>
                  <p className="text-sm font-medium">{property.id}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Price:</span>
                  <p className="text-sm font-medium">{property.price}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Type:</span>
                  <p>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      property.type === 'commercial' ? 'bg-blue-100 text-blue-800' :
                      property.type === 'residential' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {property.type}
                    </span>
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Featured:</span>
                  <p className="text-sm">
                    {property.featured ? <span className="text-green-600 font-semibold">Yes</span> : <span className="text-gray-400">No</span>}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => router.push(`/admin/properties/${property.id}`)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-800 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredProperties.length > PROPERTIES_PER_PAGE && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredProperties.length)} of {filteredProperties.length} properties
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-2 text-sm rounded-lg ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  const isCurrentPage = page === currentPage;
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  if (!showPage) {
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-3 py-2 text-gray-400">...</span>;
                    }
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm rounded-lg ${
                        isCurrentPage
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center px-3 py-2 text-sm rounded-lg ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {filteredProperties.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">No properties found</p>
          </div>
        )}
      </div>
    </Layout>
  );
}