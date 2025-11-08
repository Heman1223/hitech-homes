import { useContext, useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Building2 } from 'lucide-react';
import { PropertyContext } from '../context/PropertyContext';
import AdminSidebar from '../components/AdminSidebar';
import DashboardStats from '../components/DashboardStats';
import Loader from '../components/Loader';
import api from '../utils/api';
import '../styles/AdminDashboard.css';

const AdminDashboard = ({ setCurrentPage }) => {
  const { properties, fetchProperties } = useContext(PropertyContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setLoading(true);
      try {
        await api.delete(`/properties/${id}`);
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar currentPage="admin-dashboard" setCurrentPage={setCurrentPage} />
      <div className="flex-1 bg-gray-100 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your properties and view statistics</p>
        </div>

        <DashboardStats properties={properties} />

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">All Properties</h2>
            <button 
              onClick={() => setCurrentPage('add-property')} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Property
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No properties found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BHK</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {properties.map(property => (
                    <tr key={property._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img 
                            src={property.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100'} 
                            alt={property.title} 
                            className="w-12 h-12 rounded-lg object-cover mr-3" 
                          />
                          <span className="font-medium">{property.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{property.city}</td>
                      <td className="px-6 py-4 font-semibold text-red-600">
                        ₹{property.price?.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{property.bhk} BHK</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          className="text-blue-600 hover:text-blue-700 mr-3"
                        >
                          <Edit className="w-5 h-5 inline" />
                        </button>
                        <button 
                          onClick={() => handleDelete(property._id)} 
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;