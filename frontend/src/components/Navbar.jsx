import { useContext, useState } from 'react';
import { Building2, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Listings', page: 'listings' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' }
  ];

  const navStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid rgba(229, 231, 235, 0.5)'
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 2rem'
  };

  const contentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '4rem'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  };

  const logoTextStyle = {
    marginLeft: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#111827'
  };

  const desktopMenuStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem'
  };

  const navLinkStyle = (isActive) => ({
    color: isActive ? '#dc2626' : '#374151',
    padding: '0.5rem 0.75rem',
    fontSize: '0.95rem',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderBottom: isActive ? '2px solid #dc2626' : '2px solid transparent',
    position: 'relative'
  });

  const navLinkHoverStyle = {
    color: '#2563eb',
    transform: 'translateY(-2px)'
  };

  const buttonStyle = (variant = 'primary') => ({
    padding: '0.625rem 1.5rem',
    borderRadius: '0.75rem',
    fontSize: '0.95rem',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: variant === 'primary' 
      ? 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)'
      : 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
    color: 'white',
    boxShadow: variant === 'primary'
      ? '0 4px 12px rgba(37, 99, 235, 0.3)'
      : '0 4px 12px rgba(220, 38, 38, 0.3)'
  });

  const buttonHoverStyle = (variant = 'primary') => ({
    transform: 'translateY(-3px)',
    boxShadow: variant === 'primary'
      ? '0 6px 20px rgba(37, 99, 235, 0.4)'
      : '0 6px 20px rgba(220, 38, 38, 0.4)'
  });

  const mobileMenuButtonStyle = {
    display: 'none',
    background: 'transparent',
    border: 'none',
    color: '#374151',
    cursor: 'pointer',
    padding: '0.5rem'
  };

  const mobileMenuStyle = {
    display: mobileMenu ? 'block' : 'none',
    paddingBottom: '1rem',
    animation: 'slideInDown 0.3s ease-out'
  };

  const mobileMenuItemStyle = {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '0.75rem 1rem',
    color: '#374151',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: '0.5rem',
    transition: 'all 0.2s ease',
    fontSize: '0.95rem',
    fontWeight: 500,
    marginBottom: '0.25rem'
  };

  const mobileMenuItemHoverStyle = {
    background: '#f3f4f6',
    color: '#2563eb'
  };

  return (
    <>
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu-panel {
            display: none !important;
          }
        }
      `}</style>

      <nav style={navStyle}>
        <div style={containerStyle}>
          <div style={contentStyle}>
            {/* Logo */}
            <div 
              style={logoStyle} 
              onClick={() => setCurrentPage('home')}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Building2 style={{ width: '2rem', height: '2rem', color: '#dc2626' }} />
              <span style={logoTextStyle}>
                Hi-Tech <span style={{ color: '#2563eb' }}>Homes</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div style={desktopMenuStyle} className="desktop-menu">
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => setCurrentPage(link.page)}
                  style={navLinkStyle(currentPage === link.page)}
                  onMouseEnter={(e) => {
                    if (currentPage !== link.page) {
                      e.currentTarget.style.color = navLinkHoverStyle.color;
                      e.currentTarget.style.transform = navLinkHoverStyle.transform;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== link.page) {
                      e.currentTarget.style.color = '#374151';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {link.name}
                </button>
              ))}
              
              {user ? (
                <>
                  <button 
                    onClick={() => setCurrentPage('admin-dashboard')}
                    style={navLinkStyle(false)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = navLinkHoverStyle.color;
                      e.currentTarget.style.transform = navLinkHoverStyle.transform;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#374151';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={logout}
                    style={buttonStyle('secondary')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = buttonHoverStyle('secondary').transform;
                      e.currentTarget.style.boxShadow = buttonHoverStyle('secondary').boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setCurrentPage('admin-login')}
                  style={buttonStyle('primary')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = buttonHoverStyle('primary').transform;
                    e.currentTarget.style.boxShadow = buttonHoverStyle('primary').boxShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
                  }}
                >
                  Admin Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenu(!mobileMenu)}
              style={mobileMenuButtonStyle}
              className="mobile-menu-button"
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu Panel */}
          <div style={mobileMenuStyle} className="mobile-menu-panel">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => { 
                  setCurrentPage(link.page); 
                  setMobileMenu(false); 
                }}
                style={mobileMenuItemStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = mobileMenuItemHoverStyle.background;
                  e.currentTarget.style.color = mobileMenuItemHoverStyle.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#374151';
                }}
              >
                {link.name}
              </button>
            ))}
            {user ? (
              <>
                <button 
                  onClick={() => { 
                    setCurrentPage('admin-dashboard'); 
                    setMobileMenu(false); 
                  }}
                  style={mobileMenuItemStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = mobileMenuItemHoverStyle.background;
                    e.currentTarget.style.color = mobileMenuItemHoverStyle.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#374151';
                  }}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => { 
                    logout(); 
                    setMobileMenu(false); 
                  }}
                  style={{...mobileMenuItemStyle, color: '#dc2626'}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fef2f2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => { 
                  setCurrentPage('admin-login'); 
                  setMobileMenu(false); 
                }}
                style={{...mobileMenuItemStyle, color: '#2563eb'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#eff6ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;