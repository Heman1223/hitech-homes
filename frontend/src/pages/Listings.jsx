import { useContext, useEffect } from 'react';
import { Search, SlidersHorizontal, Grid, List, MapPin, Bed, Bath, Square, Home } from 'lucide-react';
import { PropertyContext } from '../context/PropertyContext';
import Loader from '../components/Loader';

const Listings = ({ setCurrentPage, setSelectedProperty }) => {
  const { filteredProperties, loading, error, fetchProperties } = useContext(PropertyContext);

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#ef4444'
      }}>
        <h2>Error Loading Properties</h2>
        <p>{error}</p>
        <button 
          onClick={() => fetchProperties()}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <section style={{
        padding: '3rem 0 2rem',
        background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#111827',
            marginBottom: '0.5rem'
          }}>All Properties</h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#6b7280',
            fontSize: '0.95rem'
          }}>
            <span 
              onClick={() => setCurrentPage('home')} 
              style={{
                color: '#2563eb',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.color = '#2563eb'}
            >
              Home
            </span>
            <span style={{ color: '#d1d5db' }}>/</span>
            <span>Properties</span>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1.5rem 0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '250px', maxWidth: '500px' }}>
              <input 
                type="text" 
                placeholder="Search properties..." 
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 3rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  background: '#f9fafb'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.background = 'white';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.background = '#f9fafb';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'scale(1)';
                }}
              />
              <Search style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }} size={20} />
            </div>

            {['Property Type', 'Price Range', 'BHK'].map((label, idx) => (
              <select key={idx} style={{
                padding: '0.875rem 2.5rem 0.875rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0.75rem',
                background: '#f9fafb',
                fontSize: '0.95rem',
                color: '#374151',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                appearance: 'none',
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.25rem'
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.background = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.background = '#f9fafb';
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563eb';
                e.target.style.background = 'white';
                e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
              }}>
                <option>{label}</option>
              </select>
            ))}

            <button style={{
              padding: '0.875rem 1.5rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.75rem',
              background: '#f9fafb',
              color: '#374151',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#eff6ff';
              e.target.style.borderColor = '#2563eb';
              e.target.style.color = '#2563eb';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#f9fafb';
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.color = '#374151';
            }}>
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProperties.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#6b7280'
          }}>
            <Home size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              No properties found
            </h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredProperties.map((property) => (
              <article 
                key={property._id}
                onClick={() => {
                  setSelectedProperty(property);
                  setCurrentPage('property-details');
                }}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={{
                  position: 'relative',
                  height: '240px',
                  overflow: 'hidden',
                  background: '#e5e7eb'
                }}>
                  <img 
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'} 
                    alt={property.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease'
                    }}
                  />
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <div style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: 800, 
                    color: '#2563eb',
                    marginBottom: '0.5rem'
                  }}>
                    ₹{property.price?.toLocaleString('en-IN')}
                  </div>

                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '0.5rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {property.title}
                  </h3>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#6b7280',
                    fontSize: '0.95rem',
                    marginBottom: '1rem'
                  }}>
                    <MapPin size={16} />
                    <span>{property.city}</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e5e7eb'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#4b5563',
                      fontSize: '0.95rem'
                    }}>
                      <Bed size={18} />
                      <span>{property.bhk} BHK</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#4b5563',
                      fontSize: '0.95rem'
                    }}>
                      <Bath size={18} />
                      <span>{property.bathrooms || 2}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#4b5563',
                      fontSize: '0.95rem'
                    }}>
                      <Square size={18} />
                      <span>{property.area || 1200} sqft</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;