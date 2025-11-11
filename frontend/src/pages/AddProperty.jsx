import { useState, useContext } from 'react';
import { PropertyContext } from '../context/PropertyContext';
import AdminSidebar from '../components/AdminSidebar';
import { Upload, X, Image as ImageIcon, Video } from 'lucide-react';
import api from '../utils/api';

const AddProperty = ({ setCurrentPage }) => {
  const { fetchProperties } = useContext(PropertyContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    address: '',
    bhk: '',
    area: '',
    bathrooms: '',
    amenities: ''
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (imageFiles.length + files.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    // Validate file sizes
    const invalidFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      setError('Each image must be less than 5MB');
      return;
    }

    setImageFiles(prev => [...prev, ...files]);
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    setError('');
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('Video must be less than 50MB');
      return;
    }

    setVideoFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setVideoPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setError('');
  };

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      // Create FormData
      const formDataToSend = new FormData();
      
      // Append text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('bhk', formData.bhk);
      formDataToSend.append('bathrooms', formData.bathrooms);
      if (formData.area) formDataToSend.append('area', formData.area);
      if (formData.amenities) formDataToSend.append('amenities', formData.amenities);
      
      // Append image files
      imageFiles.forEach(file => {
        formDataToSend.append('images', file);
      });
      
      // Append video file
      if (videoFile) {
        formDataToSend.append('video', videoFile);
      }
      
      const response = await api.post('/properties', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        setSuccess(true);
        fetchProperties();
        setTimeout(() => {
          setCurrentPage('admin-dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error('Error adding property:', error);
      setError(error.response?.data?.message || 'Failed to add property. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar currentPage="add-property" setCurrentPage={setCurrentPage} />
      <div style={{
        flex: 1,
        background: '#f3f4f6',
        padding: '2rem',
        minHeight: '100vh'
      }}>
        <div style={{ maxWidth: '1000px' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#111827',
            marginBottom: '2rem'
          }}>Add New Property</h1>

          {success && (
            <div style={{
              background: '#d1fae5',
              border: '2px solid #10b981',
              color: '#065f46',
              padding: '1rem 1.5rem',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Success!</p>
              <p style={{ fontSize: '0.875rem' }}>Property added successfully. Redirecting...</p>
            </div>
          )}

          {error && (
            <div style={{
              background: '#fee2e2',
              border: '2px solid #ef4444',
              color: '#991b1b',
              padding: '1rem 1.5rem',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Error!</p>
              <p style={{ fontSize: '0.875rem' }}>{error}</p>
            </div>
          )}

          <div style={{
            background: 'white',
            borderRadius: '1.5rem',
            padding: '3rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}>
            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Property Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="Luxury Villa in Bandra"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: '#f9fafb'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    placeholder="Mumbai"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: '#f9fafb'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    placeholder="123 Main St, Bandra West"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: '#f9fafb'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    placeholder="5000000"
                    min="0"
                    step="1000"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: '#f9fafb'
                    }}
                  />
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    BHK *
                  </label>
                  <input
                    type="number"
                    value={formData.bhk}
                    onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                    required
                    placeholder="2"
                    min="1"
                    max="10"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: '#f9fafb'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    required
                    placeholder="2"
                    min="1"
                    max="10"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: '#f9fafb'
                    }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Area (sqft)
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="1200"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: '#f9fafb'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Enter property description..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    background: '#f9fafb',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Amenities (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  placeholder="Swimming Pool, Gym, Parking, Security"
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    background: '#f9fafb'
                  }}
                />
              </div>

              {/* Image Upload */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Property Images (Max 5)
                </label>
                <div style={{
                  border: '2px dashed #e5e7eb',
                  borderRadius: '0.75rem',
                  padding: '2rem',
                  textAlign: 'center',
                  background: '#f9fafb',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => document.getElementById('images').click()}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}>
                  <Upload size={40} style={{ color: '#6b7280', margin: '0 auto 1rem' }} />
                  <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                    Click to upload images or drag and drop
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                    PNG, JPG, WEBP up to 5MB each
                  </p>
                  <input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '1rem',
                    marginTop: '1rem'
                  }}>
                    {imagePreviews.map((preview, index) => (
                      <div key={index} style={{
                        position: 'relative',
                        borderRadius: '0.75rem',
                        overflow: 'hidden',
                        aspectRatio: '1',
                        background: '#e5e7eb'
                      }}>
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            position: 'absolute',
                            top: '0.5rem',
                            right: '0.5rem',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '2rem',
                            height: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Property Video (Optional)
                </label>
                <div style={{
                  border: '2px dashed #e5e7eb',
                  borderRadius: '0.75rem',
                  padding: '2rem',
                  textAlign: 'center',
                  background: '#f9fafb',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => document.getElementById('video').click()}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}>
                  <Video size={40} style={{ color: '#6b7280', margin: '0 auto 1rem' }} />
                  <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                    Click to upload video
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                    MP4, MOV up to 50MB
                  </p>
                  <input
                    id="video"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    style={{ display: 'none' }}
                  />
                </div>

                {/* Video Preview */}
                {videoPreview && (
                  <div style={{
                    position: 'relative',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    marginTop: '1rem',
                    maxWidth: '400px'
                  }}>
                    <video
                      src={videoPreview}
                      controls
                      style={{
                        width: '100%',
                        borderRadius: '0.75rem'
                      }}
                    />
                    <button
                      type="button"
                      onClick={removeVideo}
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '2rem',
                        height: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: loading ? 0.7 : 1,
                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
                  }}
                >
                  {loading ? 'Adding Property...' : 'Add Property'}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage('admin-dashboard')}
                  style={{
                    padding: '1rem 2rem',
                    background: '#f3f4f6',
                    color: '#374151',
                    borderRadius: '0.75rem',
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: '2px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;