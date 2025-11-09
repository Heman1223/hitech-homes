import { MapPin, Bed, Bath, Square } from 'lucide-react';

const PropertyCard = ({ property, onClick }) => {
  const cardStyle = {
    background: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    animation: 'scaleUp 0.5s ease-out'
  };

  const cardHoverStyle = {
    transform: 'translateY(-12px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
  };

  const imageContainerStyle = {
    position: 'relative',
    height: '15rem',
    background: '#e5e7eb',
    overflow: 'hidden'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
  };

  const imageHoverStyle = {
    transform: 'scale(1.1)'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: 600,
    fontSize: '0.95rem',
    backdropFilter: 'blur(10px)',
    zIndex: 10,
    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
  };

  const contentStyle = {
    padding: '1.5rem'
  };

  const titleStyle = {
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#111827',
    marginBottom: '0.5rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    lineHeight: '1.4'
  };

  const locationStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#6b7280',
    fontSize: '0.95rem',
    marginBottom: '1rem'
  };

  const featuresStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.95rem',
    color: '#4b5563',
    marginBottom: '1.25rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e5e7eb'
  };

  const featureItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.875rem',
    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
  };

  const buttonHoverStyle = {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4)'
  };

  return (
    <>
      <style>{`
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      
      <div 
        style={cardStyle}
        onClick={onClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = cardHoverStyle.transform;
          e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
          const img = e.currentTarget.querySelector('img');
          if (img) img.style.transform = imageHoverStyle.transform;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
          const img = e.currentTarget.querySelector('img');
          if (img) img.style.transform = 'scale(1)';
        }}
      >
        <div style={imageContainerStyle}>
          <img 
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500'} 
            alt={property.title} 
            style={imageStyle}
          />
          <div style={badgeStyle}>
            ₹{property.price?.toLocaleString('en-IN')}
          </div>
        </div>
        
        <div style={contentStyle}>
          <h3 style={titleStyle}>{property.title}</h3>
          
          <div style={locationStyle}>
            <MapPin style={{ width: '1rem', height: '1rem', color: '#dc2626' }} />
            <span>{property.city}</span>
          </div>
          
          <div style={featuresStyle}>
            <div style={featureItemStyle}>
              <Bed style={{ width: '1rem', height: '1rem', color: '#2563eb' }} />
              <span>{property.bhk} BHK</span>
            </div>
            <div style={featureItemStyle}>
              <Bath style={{ width: '1rem', height: '1rem', color: '#2563eb' }} />
              <span>{property.bathrooms || 2} Bath</span>
            </div>
            <div style={featureItemStyle}>
              <Square style={{ width: '1rem', height: '1rem', color: '#2563eb' }} />
              <span>{property.area || 1200} sqft</span>
            </div>
          </div>
          
          <button 
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = buttonHoverStyle.transform;
              e.currentTarget.style.boxShadow = buttonHoverStyle.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;