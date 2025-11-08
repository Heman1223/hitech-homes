import { Target, Eye, Award, Users, TrendingUp, Shield } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '6rem 0 4rem',
        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        color: 'white',
        overflow: 'hidden'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              marginBottom: '1.5rem',
              lineHeight: 1.1
            }}>About Hi-Tech Homes</h1>
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.95,
              lineHeight: 1.7
            }}>
              Turning Transactions into Relationships - Building trust and creating lasting partnerships in real estate
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '3rem'
          }}>
            <div style={{
              position: 'relative',
              padding: '3rem',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.4s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                marginBottom: '1.5rem',
                background: '#2563eb',
                color: 'white'
              }}>
                <Target size={32} />
              </div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 800,
                marginBottom: '1rem',
                color: '#111827'
              }}>Our Mission</h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: '#4b5563'
              }}>
                To revolutionize the real estate industry by providing exceptional service, 
                cutting-edge technology, and personalized attention to every client. We believe 
                that buying or selling a property is not just a transaction—it's a life-changing 
                decision that deserves expert guidance and care.
              </p>
            </div>

            <div style={{
              position: 'relative',
              padding: '3rem',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.4s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                marginBottom: '1.5rem',
                background: '#dc2626',
                color: 'white'
              }}>
                <Eye size={32} />
              </div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 800,
                marginBottom: '1rem',
                color: '#111827'
              }}>Our Vision</h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: '#4b5563'
              }}>
                To be the most trusted and innovative real estate company, known for turning 
                transactions into lasting relationships. We envision a future where finding 
                your dream home is seamless, transparent, and exciting, powered by technology 
                and driven by genuine care for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Showcase */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: <TrendingUp size={32} />, number: '10+', label: 'Years of Excellence' },
              { icon: <Award size={32} />, number: '500+', label: 'Properties Sold' },
              { icon: <Users size={32} />, number: '1000+', label: 'Happy Clients' },
              { icon: <Shield size={32} />, number: '50+', label: 'Expert Agents' }
            ].map((stat, idx) => (
              <div key={idx} style={{
                textAlign: 'center',
                padding: '2.5rem 2rem',
                background: 'white',
                borderRadius: '1rem',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.4s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.06)';
              }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  margin: '0 auto 1.5rem',
                  background: 'linear-gradient(135deg, #2563eb 0%, #dc2626 100%)',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem'
                }}>
                  {stat.icon}
                </div>
                <span style={{
                  fontSize: '3rem',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #2563eb 0%, #dc2626 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>{stat.number}</span>
                <span style={{
                  fontSize: '1.125rem',
                  color: '#6b7280',
                  fontWeight: 600
                }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#111827',
              marginBottom: '1rem'
            }}>Our Journey</h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              Milestones that shaped Hi-Tech Homes
            </p>
          </div>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {[
              { year: '2015', title: 'Foundation', desc: 'Hi-Tech Homes was founded with a vision to revolutionize real estate through technology and personalized service.', color: '#2563eb' },
              { year: '2018', title: 'Expansion', desc: 'Expanded operations across multiple cities, serving over 500 satisfied clients and growing our expert team.', color: '#dc2626' },
              { year: '2021', title: 'Digital Innovation', desc: 'Launched our cutting-edge digital platform, making property search and transactions seamless and transparent.', color: '#2563eb' },
              { year: '2025', title: 'Industry Leader', desc: 'Recognized as one of the top real estate companies, with over 1000 happy clients and counting.', color: '#dc2626' }
            ].map((item, idx) => (
              <div key={idx} style={{
                position: 'relative',
                marginBottom: '3rem',
                paddingLeft: idx % 2 === 0 ? '0' : '50%',
                paddingRight: idx % 2 === 0 ? '50%' : '0',
                textAlign: idx % 2 === 0 ? 'right' : 'left'
              }}>
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: item.color,
                    marginBottom: '0.5rem',
                    display: 'block'
                  }}>{item.year}</span>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '0.75rem'
                  }}>{item.title}</h3>
                  <p style={{ color: '#6b7280', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;