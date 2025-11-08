import { Building2, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerStyle = {
    background: '#111827',
    color: 'white',
    marginTop: '4rem'
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '3rem 2rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    marginBottom: '2rem'
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  };

  const logoTextStyle = {
    marginLeft: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  };

  const descriptionStyle = {
    color: '#9ca3af',
    lineHeight: '1.6',
    marginBottom: '1.5rem'
  };

  const sectionTitleStyle = {
    fontWeight: 600,
    fontSize: '1.125rem',
    marginBottom: '1rem'
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  const listItemStyle = {
    color: '#9ca3af',
    marginBottom: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-block'
  };

  const listItemHoverStyle = {
    color: '#2563eb',
    transform: 'translateX(5px)'
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    color: '#9ca3af',
    marginBottom: '0.75rem'
  };

  const socialLinksStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem'
  };

  const socialIconStyle = {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    background: 'rgba(255, 255, 255, 0.1)'
  };

  const socialIconHoverStyle = {
    transform: 'translateY(-5px) scale(1.1)',
    background: '#2563eb'
  };

  const dividerStyle = {
    borderTop: '1px solid #374151',
    marginTop: '2rem',
    paddingTop: '2rem'
  };

  const copyrightStyle = {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '0.95rem'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          {/* Company Info */}
          <div>
            <div style={logoContainerStyle}>
              <Building2 style={{ width: '2rem', height: '2rem', color: '#dc2626' }} />
              <span style={logoTextStyle}>
                Hi-Tech <span style={{ color: '#2563eb' }}>Homes</span>
              </span>
            </div>
            <p style={descriptionStyle}>
              Turning Transactions into Relationships. Your trusted partner in finding the perfect property.
            </p>
            <div style={socialLinksStyle}>
              {[
                { Icon: Facebook, bg: '#1877f2' },
                { Icon: Twitter, bg: '#1da1f2' },
                { Icon: Instagram, bg: 'linear-gradient(135deg, #f58529 0%, #dd2a7b 50%, #8134af 100%)' },
                { Icon: Linkedin, bg: '#0077b5' }
              ].map(({ Icon, bg }, idx) => (
                <div
                  key={idx}
                  style={socialIconStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = socialIconHoverStyle.transform;
                    e.currentTarget.style.background = typeof bg === 'string' && bg.startsWith('linear') ? bg : bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <Icon style={{ width: '1.25rem', height: '1.25rem' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={sectionTitleStyle}>Quick Links</h3>
            <ul style={listStyle}>
              {['Home', 'Listings', 'About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((link, idx) => (
                <li 
                  key={idx}
                  style={listItemStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = listItemHoverStyle.color;
                    e.currentTarget.style.transform = listItemHoverStyle.transform;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9ca3af';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={sectionTitleStyle}>Contact Us</h3>
            <div>
              <div style={contactItemStyle}>
                <Phone style={{ width: '1rem', height: '1rem', marginRight: '0.75rem', color: '#2563eb' }} />
                <span>+91 98765 43210</span>
              </div>
              <div style={contactItemStyle}>
                <Mail style={{ width: '1rem', height: '1rem', marginRight: '0.75rem', color: '#dc2626' }} />
                <span>info@hitechhomes.com</span>
              </div>
              <div style={contactItemStyle}>
                <Building2 style={{ width: '1rem', height: '1rem', marginRight: '0.75rem', color: '#10b981' }} />
                <span>Ludhiana, Punjab, India</span>
              </div>
            </div>
          </div>
        </div>

        <div style={dividerStyle}>
          <p style={copyrightStyle}>
            © 2025 Hi-Tech Homes. All rights reserved. | Crafted with ❤️ for your dream home.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;