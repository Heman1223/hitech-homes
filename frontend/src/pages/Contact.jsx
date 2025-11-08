import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import api from '../utils/api';

const Contact = () => {
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
      const response = await api.post('/enquiries', formData);
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Contact Hero */}
      <section style={{
        padding: '4rem 0 3rem',
        background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)',
        textAlign: 'center'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: 800,
            color: '#111827',
            marginBottom: '1rem'
          }}>Get in Touch</h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            We'd love to hear from you. Our team is here to answer your questions.
          </p>
        </div>
      </section>

      {/* Contact Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: '4rem 1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '3rem'
        }}>
          {/* Contact Info Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {[
              {
                icon: <Phone size={24} />,
                title: 'Phone',
                content: '+91 98765 43210',
                subtitle: 'Mon-Sat: 9:00 AM - 7:00 PM',
                bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                color: '#2563eb'
              },
              {
                icon: <Mail size={24} />,
                title: 'Email',
                content: 'info@hitechhomes.com',
                subtitle: "We'll respond within 24 hours",
                bg: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                color: '#dc2626'
              },
              {
                icon: <MapPin size={24} />,
                title: 'Address',
                content: '123 Real Estate Avenue',
                subtitle: 'Mumbai, Maharashtra 400001',
                bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                color: '#10b981'
              },
              {
                icon: <Clock size={24} />,
                title: 'Follow Us',
                isSocial: true,
                bg: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
                color: '#f59e0b'
              }
            ].map((card, idx) => (
              <div key={idx} style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) translateX(8px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) translateX(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)';
              }}>
                <div style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '1.5rem',
                  background: card.bg,
                  color: card.color,
                  transition: 'all 0.3s ease'
                }}>
                  {card.icon}
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>{card.title}</h3>
                {card.isSocial ? (
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    {[
                      { icon: <Facebook size={20} />, bg: '#1877f2' },
                      { icon: <Twitter size={20} />, bg: '#1da1f2' },
                      { icon: <Instagram size={20} />, bg: 'linear-gradient(135deg, #f58529 0%, #dd2a7b 50%, #8134af 100%)' },
                      { icon: <Linkedin size={20} />, bg: '#0077b5' }
                    ].map((social, i) => (
                      <a key={i} href="#" style={{
                        width: '2.75rem',
                        height: '2.75rem',
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: social.bg,
                        color: 'white',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}>
                        {social.icon}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    color: '#4b5563',
                    fontSize: '1rem',
                    lineHeight: 1.6
                  }}>
                    <a href={`tel:${card.content}`} style={{
                      color: '#2563eb',
                      textDecoration: 'none'
                    }}>{card.content}</a>
                    <p style={{ marginTop: '0.25rem' }}>{card.subtitle}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '1.5rem',
              padding: '3rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#111827',
                marginBottom: '0.5rem'
              }}>Send us a Message</h2>
              <p style={{
                color: '#6b7280',
                fontSize: '1rem',
                marginBottom: '2.5rem'
              }}>
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitted && (
                <div style={{
                  padding: '1rem 1.5rem',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontWeight: 600,
                  background: '#d1fae5',
                  color: '#065f46',
                  border: '2px solid #10b981',
                  marginBottom: '1.5rem'
                }}>
                  <Mail size={20} />
                  <div>
                    <p><strong>Thank you for contacting us!</strong></p>
                    <p style={{ fontSize: '0.875rem' }}>We'll get back to you as soon as possible.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1.5rem'
                }}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      id="name"
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '1.25rem 1rem 0.5rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        background: '#f9fafb'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#2563eb';
                        e.target.style.background = 'white';
                        e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.background = '#f9fafb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <label htmlFor="name" style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '1.125rem',
                      color: '#9ca3af',
                      fontSize: '1rem',
                      pointerEvents: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: 'transparent',
                      padding: '0 0.25rem'
                    }}>Your Name</label>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      id="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '1.25rem 1rem 0.5rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        background: '#f9fafb'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#2563eb';
                        e.target.style.background = 'white';
                        e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.background = '#f9fafb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <label htmlFor="email" style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '1.125rem',
                      color: '#9ca3af',
                      fontSize: '1rem',
                      pointerEvents: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}>Email Address</label>
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    placeholder=" "
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '1.25rem 1rem 0.5rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.background = 'white';
                      e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.background = '#f9fafb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <label style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '1.125rem',
                    color: '#9ca3af',
                    fontSize: '1rem',
                    pointerEvents: 'none'
                  }}>Phone Number</label>
                </div>

                <div style={{ position: 'relative' }}>
                  <textarea
                    placeholder=" "
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      minHeight: '150px',
                      padding: '1.5rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: '#f9fafb',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.background = 'white';
                      e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.background = '#f9fafb';
                      e.target.style.boxShadow = 'none';
                    }}
                  ></textarea>
                  <label style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '1.125rem',
                    color: '#9ca3af',
                    fontSize: '1rem',
                    pointerEvents: 'none'
                  }}>Your Message</label>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    padding: '1.25rem 2.5rem',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: loading ? 0.7 : 1
                  }}
                  onMouseOver={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(-4px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
                  }}
                >
                  <Send size={20} />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;