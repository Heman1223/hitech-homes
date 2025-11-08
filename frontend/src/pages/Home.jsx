import { useContext, useEffect } from 'react';
import { Award, Users, Shield, ChevronRight, MapPin, Bed, Bath, Square } from 'lucide-react';
import { PropertyContext } from '../context/PropertyContext';
import Loader from '../components/Loader';

const Home = ({ setCurrentPage, setSelectedProperty }) => {
  const { properties, loading, fetchProperties } = useContext(PropertyContext);

  useEffect(() => {
    fetchProperties();
  }, []);

  const featuredProperties = (properties || []).slice(0, 6);


  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #dc2626 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 20s ease infinite'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)'
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}>
              Find Your Dream Home
            </h1>
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '2.5rem',
              maxWidth: '600px',
              lineHeight: 1.6
            }}>
              Turning Transactions into Relationships - Experience luxury living with our curated collection of premium properties
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setCurrentPage('listings')}
                style={{
                  padding: '1rem 2.5rem',
                  background: 'white',
                  color: '#2563eb',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Explore Properties
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                style={{
                  padding: '1rem 2.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            position: 'relative',
            zIndex: 10
          }}>
            {[
              { number: '500+', label: 'Properties Sold' },
              { number: '1000+', label: 'Happy Clients' },
              { number: '50+', label: 'Expert Agents' },
              { number: '10+', label: 'Years Experience' }
            ].map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <span style={{
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>{stat.number}</span>
                <span style={{
                  fontSize: '1.125rem',
                  opacity: 0.9,
                  fontWeight: 500
                }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(to bottom, #f9fafb 0%, white 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{
              color: '#2563eb',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.875rem',
              marginBottom: '0.5rem'
            }}>Premium Selection</p>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#111827',
              marginBottom: '1rem'
            }}>Featured Properties</h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover our handpicked selection of premium homes that redefine luxury living
            </p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {featuredProperties.map((property) => (
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
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-12px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: '250px',
                    background: '#e5e7eb'
                  }}>
                    <img
                      src={property.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'}
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
                    }}>{property.title}</h3>
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

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              onClick={() => setCurrentPage('listings')}
              style={{
                padding: '1rem 2.5rem',
                background: 'white',
                color: '#2563eb',
                borderRadius: '0.75rem',
                fontWeight: 700,
                fontSize: '1.125rem',
                border: '2px solid #2563eb',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#2563eb';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#2563eb';
              }}
            >
              View All Properties
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              marginBottom: '1.5rem',
              lineHeight: 1.2
            }}>
              Ready to Find Your Perfect Home?
            </h2>
            <p style={{
              fontSize: '1.25rem',
              marginBottom: '2.5rem',
              opacity: 0.95
            }}>
              Let our expert team guide you through every step of your real estate journey
            </p>
            <button 
              onClick={() => setCurrentPage('contact')}
              style={{
                padding: '1.25rem 3rem',
                background: 'white',
                color: '#dc2626',
                borderRadius: '0.75rem',
                fontWeight: 700,
                fontSize: '1.125rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
              }}
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;