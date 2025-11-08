import { useState } from 'react';
import { MapPin, Bed, Bath, Square, ChevronRight, Phone, Mail, Wifi, Car, Dumbbell, Shield, Send } from 'lucide-react';
import api from '../utils/api';

const PropertyDetails = ({ property, setCurrentPage }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/enquiries', { 
        ...formData, 
        propertyId: property._id 
      });
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    }
    setLoading(false);
  };

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p style={{ color: '#6b7280' }}>Property not found</p>
      </div>
    );
  }

  const defaultAmenities = property.amenities || ['Swimming Pool', 'Gym', 'Parking', 'Security', '24/7 Water', 'Power Backup'];

  return (
    <div>
      {/* Breadcrumb */}
      <section style={{
        padding: '1.5rem 0',
        background: '#f9fafb',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <span 
              onClick={() => setCurrentPage('home')} 
              style={{
                color: '#6b7280',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#2563eb'}
              onMouseOut={(e) => e.target.style.color = '#6b7280'}
            >
              Home
            </span>
            <ChevronRight size={16} style={{ color: '#d1d5db' }} />
            <span 
              onClick={() => setCurrentPage('listings')} 
              style={{
                color: '#6b7280',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#2563eb'}
              onMouseOut={(e) => e.target.style.color = '#6b7280'}
            >
              Properties
            </span>
            <ChevronRight size={16} style={{ color: '#d1d5db' }} />
            <span style={{
              color: '#111827',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>{property.title}</span>
          </nav>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: '2rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 300px)',
            gap: '1rem',
            borderRadius: '1rem',
            overflow: 'hidden'
          }}>
            <div style={{
              gridColumn: '1 / 3',
              gridRow: '1 / 3',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              background: '#e5e7eb'
            }}>
              <img 
                src={property.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'}
                alt={property.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                background: '#e5e7eb'
              }}>
                <img 
                  src={`https://images.unsplash.com/photo-${1600596542815 + i}?w=400`}
                  alt={`Gallery ${i}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '2rem',
          padding: '2rem 0'
        }}>
          {/* Main Content */}
          <div>
            {/* Property Header */}
            <div style={{ marginBottom: '2rem' }}>
              <span style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: '#10b981',
                color: 'white',
                borderRadius: '0.5rem',
                fontWeight: 600,
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}>For Sale</span>
              <h1 style={{
                fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: '#111827',
                marginBottom: '1rem',
                lineHeight: 1.2
              }}>{property.title}</h1>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#6b7280',
                fontSize: '1.125rem',
                marginBottom: '1.5rem'
              }}>
                <MapPin size={20} />
                <span>{property.address || property.city}</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                padding: '1.5rem 0',
                borderTop: '1px solid #e5e7eb',
                borderBottom: '1px solid #e5e7eb'
              }}>
                {[
                  { icon: <Bed size={24} />, value: property.bhk, label: 'Bedrooms' },
                  { icon: <Bath size={24} />, value: property.bathrooms || 2, label: 'Bathrooms' },
                  { icon: <Square size={24} />, value: property.area || 1200, label: 'Sq. Ft.' }
                ].map((meta, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      background: '#eff6ff',
                      color: '#2563eb',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {meta.icon}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#111827'
                      }}>{meta.value}</div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>{meta.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '1rem'
              }}>Property Description</h2>
              <p style={{
                color: '#4b5563',
                lineHeight: 1.8,
                fontSize: '1rem'
              }}>
                {property.description || 'Beautiful property with modern amenities and excellent location. This stunning residence offers spacious living areas, high-quality finishes, and a prime location close to schools, shopping, and entertainment.'}
              </p>
            </div>

            {/* Amenities */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '1rem'
              }}>Features & Amenities</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1.5rem'
              }}>
                {defaultAmenities.map((amenity, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    background: '#f9fafb',
                    borderRadius: '0.75rem',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#eff6ff';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#f9fafb';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}>
                    <div style={{
                      width: '2rem',
                      height: '2rem',
                      background: '#2563eb',
                      color: 'white',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {idx % 4 === 0 ? <Wifi size={20} /> :
                       idx % 4 === 1 ? <Dumbbell size={20} /> :
                       idx % 4 === 2 ? <Car size={20} /> :
                       <Shield size={20} />}
                    </div>
                    <span style={{
                      fontWeight: 600,
                      color: '#374151',
                      fontSize: '0.95rem'
                    }}>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                borderRadius: '0.75rem',
                marginBottom: '1.5rem',
                position: 'relative'
              }}>
                <span style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: 'white',
                  marginBottom: '0.25rem',
                  display: 'block'
                }}>₹{property.price?.toLocaleString('en-IN')}</span>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem'
                }}>Total Price</span>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                Send Enquiry
              </h2>

              {submitted ? (
                <div style={{
                  padding: '1rem',
                  background: '#d1fae5',
                  border: '2px solid #10b981',
                  borderRadius: '0.75rem',
                  color: '#065f46',
                  fontWeight: 600
                }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Thank you!</p>
                  <p style={{ fontSize: '0.875rem' }}>Your enquiry has been submitted successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {[
                    { label: 'Your Name', type: 'text', value: formData.name, field: 'name', placeholder: 'Enter your name' },
                    { label: 'Email', type: 'email', value: formData.email, field: 'email', placeholder: 'your@email.com' },
                    { label: 'Phone', type: 'tel', value: formData.phone, field: 'phone', placeholder: '+91 98765 43210' }
                  ].map((input, idx) => (
                    <div key={idx}>
                      <label style={{
                        fontWeight: 600,
                        color: '#374151',
                        fontSize: '0.95rem',
                        display: 'block',
                        marginBottom: '0.5rem'
                      }}>{input.label}</label>
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                        value={input.value}
                        onChange={(e) => setFormData({ ...formData, [input.field]: e.target.value })}
                        required
                        style={{
                          width: '100%',
                          padding: '0.875rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '0.75rem',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#2563eb';
                          e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{
                      fontWeight: 600,
                      color: '#374151',
                      fontSize: '0.95rem',
                      display: 'block',
                      marginBottom: '0.5rem'
                    }}>Message</label>
                    <textarea
                      placeholder="I'm interested in this property..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '0.875rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        fontSize: '0.95rem',
                        resize: 'vertical',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#2563eb';
                        e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                      padding: '1rem',
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      opacity: loading ? 0.7 : 1
                    }}
                    onMouseOver={(e) => {
                      if (!loading) {
                        e.target.style.background = '#1d4ed8';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = '#2563eb';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <Send size={20} />
                    {loading ? 'Sending...' : 'Submit Enquiry'}
                  </button>
                </form>
              )}

              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  color: '#4b5563',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.color = '#2563eb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#4b5563';
                }}>
                  <Phone size={18} />
                  <span>+91 98765 43210</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  color: '#4b5563',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.color = '#2563eb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#4b5563';
                }}>
                  <Mail size={18} />
                  <span>info@hitechhomes.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;