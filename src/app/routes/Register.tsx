// src/app/routes/Register.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [hoverClient, setHoverClient] = useState(false);
  const [hoverInternal, setHoverInternal] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    box: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      padding: '48px 40px',
      width: '100%',
      maxWidth: '800px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    boxBefore: {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    },
    title: {
      color: '#2c3e50',
      fontSize: '32px',
      fontWeight: '700',
      marginBottom: '8px',
      textAlign: 'center' as const,
      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subtitle: {
      color: '#7f8c8d',
      fontSize: '16px',
      textAlign: 'center' as const,
      marginBottom: '40px',
      fontWeight: '500',
    },
    options: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '24px',
      marginBottom: '40px',
    },
    optionBase: {
      border: '2px solid',
      borderRadius: '12px',
      padding: '32px 28px',
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: 'white',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    clientOption: (isHovered: boolean) => ({
      borderColor: isHovered ? '#667eea' : '#e1e5eb',
      background: isHovered 
        ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' 
        : 'white',
      transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      boxShadow: isHovered 
        ? '0 12px 30px rgba(102, 126, 234, 0.2)' 
        : '0 4px 12px rgba(0, 0, 0, 0.05)',
    }),
    internalOption: (isHovered: boolean) => ({
      borderColor: '#e1e5eb',
      backgroundColor: '#f8f9fa',
      opacity: 0.85,
      cursor: 'not-allowed',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
    }),
    optionIcon: {
      fontSize: '48px',
      marginBottom: '20px',
      textAlign: 'center' as const,
      transition: 'transform 0.3s ease',
    },
    clientIcon: (isHovered: boolean) => ({
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    }),
    optionContent: {
      textAlign: 'center' as const,
    },
    optionTitle: {
      color: '#2c3e50',
      fontSize: '22px',
      fontWeight: '700',
      marginBottom: '12px',
      transition: 'color 0.3s ease',
    },
    clientTitle: (isHovered: boolean) => ({
      color: isHovered ? '#667eea' : '#2c3e50',
    }),
    internalTitle: {
      color: '#95a5a6',
    },
    optionDescription: {
      color: '#7f8c8d',
      fontSize: '15px',
      lineHeight: '1.7',
      marginBottom: '20px',
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '12px',
      marginTop: '20px',
      padding: '0 10px',
    },
    feature: {
      color: '#27ae60',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '8px 12px',
      backgroundColor: '#e8f5e8',
      borderRadius: '6px',
      fontWeight: '500',
    },
    note: {
      backgroundColor: '#fff8e1',
      padding: '16px',
      borderRadius: '8px',
      marginTop: '20px',
      border: '1px solid #ffeaa7',
      position: 'relative' as const,
    },
    noteIcon: {
      position: 'absolute' as const,
      top: '-12px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#fff8e1',
      padding: '4px 12px',
      borderRadius: '12px',
      border: '1px solid #ffeaa7',
      fontSize: '12px',
      fontWeight: '600',
      color: '#856404',
    },
    noteText: {
      color: '#856404',
      fontSize: '14px',
      margin: '0',
      lineHeight: '1.6',
      textAlign: 'center' as const,
    },
    loginLink: {
      textAlign: 'center' as const,
      paddingTop: '30px',
      borderTop: '1px solid rgba(225, 229, 235, 0.5)',
    },
    loginText: {
      color: '#7f8c8d',
      fontSize: '15px',
      margin: '0',
      fontWeight: '500',
    },
    loginLinkText: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: '700',
      position: 'relative' as const,
      padding: '2px 4px',
      '&:hover': {
        textDecoration: 'none',
      },
      '&::after': {
        content: '""',
        position: 'absolute' as const,
        bottom: '0',
        left: '0',
        width: '100%',
        height: '2px',
        backgroundColor: '#667eea',
        transform: 'scaleX(0)',
        transition: 'transform 0.3s ease',
        transformOrigin: 'right',
      },
      '&:hover::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'left',
      },
    },
    lockIcon: {
      position: 'absolute' as const,
      top: '20px',
      right: '20px',
      fontSize: '24px',
      color: '#95a5a6',
      opacity: 0.7,
    },
    badge: {
      position: 'absolute' as const,
      top: '20px',
      left: '20px',
      backgroundColor: '#667eea',
      color: 'white',
      fontSize: '12px',
      fontWeight: '600',
      padding: '4px 12px',
      borderRadius: '12px',
      letterSpacing: '0.5px',
    },
    internalBadge: {
      backgroundColor: '#95a5a6',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.boxBefore} />
        
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Select account type to get started</p>
        
        <div style={styles.options}>
          {/* Client Registration Option */}
          <Link 
            to="/register/client" 
            style={{
              ...styles.optionBase,
              ...styles.clientOption(hoverClient),
            } as React.CSSProperties}
            className="register-option client-option"
            onMouseEnter={() => setHoverClient(true)}
            onMouseLeave={() => setHoverClient(false)}
          >
            <div style={styles.badge}>PUBLIC ACCESS</div>
            <div style={{
              ...styles.optionIcon,
              ...styles.clientIcon(hoverClient),
            } as React.CSSProperties}>
              🏢
            </div>
            <div style={styles.optionContent}>
              <h3 style={{
                ...styles.optionTitle,
                ...styles.clientTitle(hoverClient),
              } as React.CSSProperties}>
                IPO Applicant (Client)
              </h3>
              <p style={styles.optionDescription}>
                For companies applying for Initial Public Offerings. Submit your IPO applications, 
                track status in real-time, manage documents, and monitor your investment portfolio.
              </p>
              <div style={styles.features}>
                <span style={styles.feature}>✓ Submit IPO Applications</span>
                <span style={styles.feature}>✓ Real-time Status Tracking</span>
                <span style={styles.feature}>✓ Secure Document Upload</span>
                <span style={styles.feature}>✓ Portfolio Management</span>
              </div>
            </div>
          </Link>
          
          {/* Internal Accounts (Disabled) */}
          <div 
            style={{
              ...styles.optionBase,
              ...styles.internalOption(hoverInternal),
            } as React.CSSProperties}
            className="register-option internal-option"
            onMouseEnter={() => setHoverInternal(true)}
            onMouseLeave={() => setHoverInternal(false)}
          >
            <div style={{ ...styles.badge, ...styles.internalBadge } as React.CSSProperties}>
              ADMIN ONLY
            </div>
            <div style={styles.lockIcon}>🔒</div>
            <div style={styles.optionIcon}>👥</div>
            <div style={styles.optionContent}>
              <h3 style={{
                ...styles.optionTitle,
                ...styles.internalTitle,
              } as React.CSSProperties}>
                Internal Accounts
              </h3>
              <p style={styles.optionDescription}>
                Brokerage, IT Staff, and Viewer accounts are managed by system administrators 
                with enterprise-grade access controls and audit trails.
              </p>
              <div style={styles.note}>
                <div style={styles.noteIcon}>INFORMATION</div>
                <p style={styles.noteText}>
                  <strong>Access Restricted:</strong> Internal accounts (Brokerage, IT Staff, 
                  or Viewer roles) are created by system administrators only. Please contact 
                  your administrator for account creation requests.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={styles.loginLink}>
          <p style={styles.loginText}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              style={styles.loginLinkText as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#764ba2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#667eea';
              }}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;