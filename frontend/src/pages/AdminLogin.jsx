import { useState, useContext } from 'react';
import { Building2, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminLogin = ({ setCurrentPage }) => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const data = await login(formData.email, formData.password);
    setLoading(false);
    if (data.success) {
      setCurrentPage('admin-dashboard');
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #dc2626 100%)',
      backgroundSize: '400% 400%'
    }}>
      {/* Animated Background Elements */}
      {[
        { size: '300px', top: '10%', left: '10%', delay: 0 },
        { size: '200px', top: '60%', right: '15%', delay: 5 },
        { size: '150px', bottom: '15%', left: '20%', delay: 10 }
      ].map((elem, idx) => (
        <div key={idx} style={{
          position: 'absolute',
          width: elem.size,
          height: elem.size,
          background: 'white',
          borderRadius: '50%',
          opacity: 0.1,
          top: elem.top,
          bottom: elem.bottom,
          left: elem.left,
          right: elem.right
        }}></div>
      ))}

      {/* Login Card */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '450px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '1.5rem',
        padding: '3rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Building2 style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 1rem',
            display: 'block',
            color: '#2563eb'
          }} />
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #2563eb 0%, #dc2626 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Hi-Tech Homes</h1>
          <p style={{
            color: '#6b7280',
            fontSize: '0.95rem',
            marginTop: '0.5rem'
          }}>Admin Dashboard Access</p>
        </div>

        {error && (
          <div style={{
            padding: '1rem',
            background: '#fee2e2',
            border: '2px solid #dc2626',
            borderRadius: '0.75rem',
            color: '#991b1b',
            fontWeight: 600,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#111827',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>Welcome Back</h2>

          <div style={{ position: 'relative' }}>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="Email Address"
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
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
            <Mail style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }} size={20} />
          </div>

          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder="Password"
              style={{
                width: '100%',
                padding: '1rem 3rem 1rem 3rem',
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
            <Lock style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }} size={20} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                padding: '0.5rem'
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '-0.5rem 0'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}>
              <input type="checkbox" style={{
                width: '1.125rem',
                height: '1.125rem',
                cursor: 'pointer'
              }} />
              <span style={{
                fontSize: '0.95rem',
                color: '#4b5563'
              }}>Remember me</span>
            </label>
            <a href="#" style={{
              fontSize: '0.95rem',
              color: '#2563eb',
              fontWeight: 600,
              textDecoration: 'none'
            }}>Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.125rem',
              background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1.125rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
              opacity: loading ? 0.8 : 1
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
            }}
          >
            <span style={{ position: 'relative', zIndex: 10 }}>
              {loading ? 'Logging in...' : 'Sign In'}
            </span>
          </button>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          margin: '1.5rem 0'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
          <span style={{
            color: '#9ca3af',
            fontSize: '0.875rem',
            fontWeight: 500
          }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
        </div>

        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          fontSize: '0.95rem',
          color: '#6b7280'
        }}>
          <button 
            onClick={() => setCurrentPage('home')} 
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;