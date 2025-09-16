import React, { useEffect, useState } from "react";
import { 
  Container, Grid, Paper, Typography, Box, Button, Card, CardContent, 
  Avatar, Chip, LinearProgress, Fade, Grow, IconButton, Tooltip
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  GavelTwoTone as GavelIcon,
  VerifiedUserTwoTone as VerifiedIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Accessibility as AccessibilityIcon,
  Psychology as PsychologyIcon,
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  KeyboardArrowRight as ArrowRightIcon,
  AutoFixHigh as AutoFixIcon
} from "@mui/icons-material";

export default function Home({ title }) {
  const [statsLoaded, setStatsLoaded] = useState(false);

  useEffect(() => {
    document.title = title;
    // Simulate loading animation
    setTimeout(() => setStatsLoaded(true), 500);
  }, [title]);

  const coreCategories = [
    { name: "Graphics", path: "/graphics", color: "#4caf50", icon: AccessibilityIcon, count: 12 },
    { name: "Forms", path: "/forms", color: "#2196f3", icon: AssessmentIcon, count: 8 },
    { name: "Keyboard", path: "/keyboard", color: "#ff9800", icon: SecurityIcon, count: 15 },
    { name: "Navigation", path: "/navigation", color: "#9c27b0", icon: DashboardIcon, count: 7 },
    { name: "Headings", path: "/headings", color: "#f44336", icon: PsychologyIcon, count: 6 },
    { name: "Errors", path: "/errors", color: "#607d8b", icon: AutoFixIcon, count: 10 }
  ];

  const advancedCategories = [
    { name: "Carousels", path: "/carousels", color: "#ff5722", icon: CheckCircleIcon, count: 4 },
    { name: "Clickables", path: "/clickables", color: "#e91e63", icon: GavelIcon, count: 9 },
    { name: "Context", path: "/context", color: "#00bcd4", icon: PsychologyIcon, count: 5 },
    { name: "Document", path: "/document", color: "#795748", icon: AssessmentIcon, count: 3 },
    { name: "Readability", path: "/readability", color: "#8bc34a", icon: VerifiedIcon, count: 7 },
    { name: "Tables", path: "/tables", color: "#3f51b5", icon: DashboardIcon, count: 11 }
  ];

  return (
    <Box sx={{ 
      position: 'relative',
      minHeight: 'calc(100vh - 100px)',
      '&::before': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        zIndex: -3
      },
      '&::after': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 25% 15%, rgba(167, 139, 250, 0.12) 0%, transparent 45%), radial-gradient(circle at 75% 85%, rgba(59, 130, 246, 0.08) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 60%)',
        zIndex: -2
      }
    }}>
      <Box sx={{ position: 'relative', zIndex: 1, py: 4, maxWidth: '100%', px: { xs: 2, sm: 3, md: 6 , lg: 9 } }}>
        {/* Hero Section */}
        <Fade in timeout={1000}>
          <Box textAlign="center" sx={{ mb: 8, py: 6, maxWidth: '65%', ml: 'auto', mr: '10%' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 4,
                background: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
                border: '3px solid rgba(255,255,255,0.8)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), inset 0 2px 8px rgba(255, 255, 255, 0.3)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -10,
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, rgba(102,126,234,0.6), rgba(167,139,250,0.6), rgba(245,101,101,0.6), rgba(102,126,234,0.6))',
                  zIndex: -1,
                  animation: 'rotate 8s linear infinite'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.05) 90%)',
                  zIndex: 1
                }
              }}
            >
              <AccessibilityIcon sx={{ fontSize: 60, color: 'white', zIndex: 2, position: 'relative' }} />
            </Avatar>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 900, 
                background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.9) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 3,
                textShadow: '0 4px 8px rgba(0,0,0,0.2)',
                fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                letterSpacing: '-0.02em'
              }}
            >
              AccessFlow
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'rgba(255,255,255,0.95)', 
                mb: 2,
                fontWeight: 500,
                fontSize: { xs: '1.5rem', md: '2rem' },
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              QA Testing Platform
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                mb: 6,
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.8,
                fontWeight: 400,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              Modern accessibility testing with 90+ automated rules, interactive examples, 
              and comprehensive WCAG 2.1 compliance guidance
            </Typography>
            
            {/* Quick Action Buttons */}
            <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap" sx={{ mt: 2 }}>
              <Link to="/rules" style={{ textDecoration: "none" }}>
                <Button 
                  variant="contained" 
                  size="large"
                  startIcon={<GavelIcon />}
                  sx={{ 
                    px: 8, py: 2,
                    background: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    borderRadius: 4,
                    border: '2px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15), inset 0 2px 8px rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    textTransform: 'none',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      transition: 'left 0.6s ease'
                    },
                    '&:hover': {
                      background: 'rgba(255,255,255,0.35)',
                      transform: 'translateY(-3px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), inset 0 2px 8px rgba(255, 255, 255, 0.3)',
                      border: '2px solid rgba(255,255,255,0.8)',
                      '&::before': {
                        left: '100%'
                      }
                    },
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  Browse All Rules
                </Button>
              </Link>
              <Link to="/scanner" style={{ textDecoration: "none" }}>
                <Button 
                  variant="outlined" 
                  size="large"
                  startIcon={<SpeedIcon />}
                  sx={{ 
                    px: 8, py: 2,
                    borderColor: 'rgba(255,255,255,0.6)',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    borderRadius: 4,
                    borderWidth: 2,
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1), inset 0 1px 4px rgba(255, 255, 255, 0.15)',
                    textTransform: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: 'left 0.6s ease'
                    },
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.9)',
                      backgroundColor: 'rgba(255,255,255,0.25)',
                      transform: 'translateY(-3px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), inset 0 1px 4px rgba(255, 255, 255, 0.25)',
                      borderWidth: 2,
                      '&::before': {
                        left: '100%'
                      }
                    },
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  Start Testing
                </Button>
              </Link>
            </Box>
          </Box>
        </Fade>

        {/* Stats Overview */}
        <Grow in={statsLoaded} timeout={1000}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 6, 
              mb: 6, 
              borderRadius: 6,
              maxWidth: '65%',
              ml: 'auto', 
              mr: '10%',
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '2px solid rgba(255,255,255,0.4)',
              borderTop: '3px solid rgba(255,255,255,0.7)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), inset 0 2px 8px rgba(255, 255, 255, 0.2)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                borderRadius: 6,
                pointerEvents: 'none'
              }
            }}
          >
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                textAlign: 'center', 
                mb: 6, 
                background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Platform Overview
            </Typography>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6} md={3}>
                <Box 
                  textAlign="center" 
                  sx={{ 
                    p: 3,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    border: '1px solid rgba(76, 175, 80, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      background: 'rgba(255,255,255,0.25)',
                      boxShadow: '0 15px 35px rgba(76, 175, 80, 0.2)'
                    }
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 64, color: '#4caf50', mb: 2 }} />
                  <Typography variant="h2" sx={{ fontWeight: 800, color: '#4caf50', mb: 1 }}>
                    90+
                  </Typography>
                  <Typography variant="h6" color="textPrimary" sx={{ fontWeight: 600 }}>
                    Accessibility Rules
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box 
                  textAlign="center" 
                  sx={{ 
                    p: 3,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    border: '1px solid rgba(33, 150, 243, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      background: 'rgba(255,255,255,0.25)',
                      boxShadow: '0 15px 35px rgba(33, 150, 243, 0.2)'
                    }
                  }}
                >
                  <SpeedIcon sx={{ fontSize: 64, color: '#2196f3', mb: 2 }} />
                  <Typography variant="h2" sx={{ fontWeight: 800, color: '#2196f3', mb: 1 }}>
                    12
                  </Typography>
                  <Typography variant="h6" color="textPrimary" sx={{ fontWeight: 600 }}>
                    Test Categories
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box 
                  textAlign="center" 
                  sx={{ 
                    p: 3,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 152, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      background: 'rgba(255,255,255,0.25)',
                      boxShadow: '0 15px 35px rgba(255, 152, 0, 0.2)'
                    }
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 64, color: '#ff9800', mb: 2 }} />
                  <Typography variant="h2" sx={{ fontWeight: 800, color: '#ff9800', mb: 1 }}>
                    100%
                  </Typography>
                  <Typography variant="h6" color="textPrimary" sx={{ fontWeight: 600 }}>
                    WCAG 2.1 Coverage
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box 
                  textAlign="center" 
                  sx={{ 
                    p: 3,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    border: '1px solid rgba(156, 39, 176, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      background: 'rgba(255,255,255,0.25)',
                      boxShadow: '0 15px 35px rgba(156, 39, 176, 0.2)'
                    }
                  }}
                >
                  <VerifiedIcon sx={{ fontSize: 64, color: '#9c27b0', mb: 2 }} />
                  <Typography variant="h2" sx={{ fontWeight: 800, color: '#9c27b0', mb: 1 }}>
                    3
                  </Typography>
                  <Typography variant="h6" color="textPrimary" sx={{ fontWeight: 600 }}>
                    Testing Tools
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grow>

        {/* Core Testing Categories */}
        <Box sx={{ textAlign: 'center', mb: 6, mt: 8, maxWidth: '65%', ml: 'auto', mr: '10%' }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 800, 
              mb: 2,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            Core Testing Categories
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.85)', 
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.7,
              textShadow: '0 1px 4px rgba(0,0,0,0.3)'
            }}
          >
            Essential accessibility testing areas with comprehensive rule coverage
          </Typography>
        </Box>
        
        <Box sx={{ maxWidth: '65%', ml: 'auto', mr: '10%' }}>
          <Grid container spacing={4} sx={{ mb: 8 }}>
          {coreCategories.map((category, index) => (
            <Grid item xs={12} sm={6} lg={4} key={category.name}>
              <Grow in timeout={1000 + index * 150}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      '& .card-icon': {
                        transform: 'scale(1.15) rotate(5deg)'
                      },
                      '& .arrow-icon': {
                        transform: 'translateX(8px)'
                      }
                    },
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    borderRadius: 4,
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: `0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 24px ${category.color}20`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${category.color}, ${category.color}CC)`,
                      borderRadius: '4px 4px 0 0'
                    }
                  }}
                  component={Link}
                  to={category.path}
                  style={{ textDecoration: 'none' }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Avatar
                      className="card-icon"
                      sx={{
                        width: 72,
                        height: 72,
                        mx: 'auto',
                        mb: 3,
                        background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}DD 100%)`,
                        boxShadow: `0 12px 24px ${category.color}40, inset 0 2px 8px rgba(255,255,255,0.3)`,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <category.icon sx={{ fontSize: 36, color: 'white' }} />
                    </Avatar>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      Comprehensive testing for {category.name.toLowerCase()} accessibility
                    </Typography>
                    <Chip
                      label={`${category.count} Rules`}
                      size="medium"
                      sx={{
                        background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}30 100%)`,
                        color: category.color,
                        fontWeight: 700,
                        mb: 3,
                        border: `1px solid ${category.color}40`,
                        backdropFilter: 'blur(8px)'
                      }}
                    />
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600 }}>
                        Explore Rules
                      </Typography>
                      <ArrowRightIcon 
                        className="arrow-icon"
                        sx={{ 
                          ml: 1, 
                          fontSize: 24, 
                          color: category.color,
                          transition: 'transform 0.3s ease'
                        }} 
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
        </Box>

        {/* Advanced Categories */}
        <Box sx={{ textAlign: 'center', mb: 6, mt: 8, maxWidth: '65%', ml: 'auto', mr: '10%' }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 800, 
              mb: 2,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            Advanced Testing Categories
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.85)', 
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.7,
              textShadow: '0 1px 4px rgba(0,0,0,0.3)'
            }}
          >
            Specialized accessibility testing for complex UI components and interactions
          </Typography>
        </Box>
        
        <Box sx={{ maxWidth: '65%', ml: 'auto', mr: '10%' }}>
          <Grid container spacing={4}>
          {advancedCategories.map((category, index) => (
            <Grid item xs={12} sm={6} lg={4} key={category.name}>
              <Grow in timeout={1500 + index * 150}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      '& .card-icon': {
                        transform: 'scale(1.15) rotate(-5deg)'
                      },
                      '& .arrow-icon': {
                        transform: 'translateX(8px)'
                      }
                    },
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    borderRadius: 4,
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: `0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 24px ${category.color}20`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${category.color}, ${category.color}CC)`,
                      borderRadius: '4px 4px 0 0'
                    }
                  }}
                  component={Link}
                  to={category.path}
                  style={{ textDecoration: 'none' }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Avatar
                      className="card-icon"
                      sx={{
                        width: 72,
                        height: 72,
                        mx: 'auto',
                        mb: 3,
                        background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}DD 100%)`,
                        boxShadow: `0 12px 24px ${category.color}40, inset 0 2px 8px rgba(255,255,255,0.3)`,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <category.icon sx={{ fontSize: 36, color: 'white' }} />
                    </Avatar>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      Advanced testing for {category.name.toLowerCase()} accessibility
                    </Typography>
                    <Chip
                      label={`${category.count} Rules`}
                      size="medium"
                      sx={{
                        background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}30 100%)`,
                        color: category.color,
                        fontWeight: 700,
                        mb: 3,
                        border: `1px solid ${category.color}40`,
                        backdropFilter: 'blur(8px)'
                      }}
                    />
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600 }}>
                        Explore Rules
                      </Typography>
                      <ArrowRightIcon 
                        className="arrow-icon"
                        sx={{ 
                          ml: 1, 
                          fontSize: 24, 
                          color: category.color,
                          transition: 'transform 0.3s ease'
                        }} 
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
        </Box>

        {/* Quick Tools Section */}
        <Box sx={{ textAlign: 'center', mb: 6, mt: 8, maxWidth: '65%', ml: 'auto', mr: '10%' }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 800, 
              mb: 2,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            Testing Tools & Utilities
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.85)', 
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.7,
              textShadow: '0 1px 4px rgba(0,0,0,0.3)'
            }}
          >
            Powerful tools to streamline your accessibility testing workflow and enhance productivity
          </Typography>
        </Box>
        
        <Box sx={{ mb: 6, maxWidth: '65%', ml: 'auto', mr: '10%' }}>
          
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} lg={4}>
              <Grow in timeout={1200}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      '& .tool-icon': {
                        transform: 'scale(1.15) rotate(-8deg)'
                      }
                    },
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    borderRadius: 4,
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(102,126,234,0.2)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #667eea, #764ba2)',
                      borderRadius: '4px 4px 0 0'
                    }
                  }}
                  component={Link}
                  to="/rules"
                  style={{ textDecoration: 'none' }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Avatar
                      className="tool-icon"
                      sx={{
                        width: 72,
                        height: 72,
                        mx: 'auto',
                        mb: 3,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 12px 24px rgba(102,126,234,0.4), inset 0 2px 8px rgba(255,255,255,0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <GavelIcon sx={{ fontSize: 36, color: 'white' }} />
                    </Avatar>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                      All Rules Browser
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      Browse and search through all 90+ accessibility rules with comprehensive examples and guidance
                    </Typography>
                    <Chip
                      label="90+ Rules"
                      size="medium"
                      sx={{
                        background: 'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)',
                        color: '#667eea',
                        fontWeight: 700,
                        border: '1px solid rgba(102,126,234,0.4)',
                        backdropFilter: 'blur(8px)'
                      }}
                    />
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
            
            <Grid item xs={12} lg={4}>
              <Grow in timeout={1400}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      '& .tool-icon': {
                        transform: 'scale(1.15) rotate(-8deg)'
                      }
                    },
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    borderRadius: 4,
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(33,150,243,0.2)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #2196f3, #21CBF3)',
                      borderRadius: '4px 4px 0 0'
                    }
                  }}
                  component={Link}
                  to="/scanner"
                  style={{ textDecoration: 'none' }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Avatar
                      className="tool-icon"
                      sx={{
                        width: 72,
                        height: 72,
                        mx: 'auto',
                        mb: 3,
                        background: 'linear-gradient(135deg, #2196f3 0%, #21CBF3 100%)',
                        boxShadow: '0 12px 24px rgba(33,150,243,0.4), inset 0 2px 8px rgba(255,255,255,0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <SpeedIcon sx={{ fontSize: 36, color: 'white' }} />
                    </Avatar>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                      Page Scanner
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      Automated accessibility scanning with real-time issue detection and detailed reporting
                    </Typography>
                    <Chip
                      label="Live Testing"
                      size="medium"
                      sx={{
                        background: 'linear-gradient(135deg, rgba(33,150,243,0.2) 0%, rgba(33,203,243,0.2) 100%)',
                        color: '#2196f3',
                        fontWeight: 700,
                        border: '1px solid rgba(33,150,243,0.4)',
                        backdropFilter: 'blur(8px)'
                      }}
                    />
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
            
            <Grid item xs={12} lg={4}>
              <Grow in timeout={1600}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      '& .tool-icon': {
                        transform: 'scale(1.15) rotate(-8deg)'
                      }
                    },
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    borderRadius: 4,
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(117,117,117,0.2)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #757575, #9E9E9E)',
                      borderRadius: '4px 4px 0 0'
                    }
                  }}
                  component={Link}
                  to="/elements"
                  style={{ textDecoration: 'none' }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Avatar
                      className="tool-icon"
                      sx={{
                        width: 72,
                        height: 72,
                        mx: 'auto',
                        mb: 3,
                        background: 'linear-gradient(135deg, #757575 0%, #9E9E9E 100%)',
                        boxShadow: '0 12px 24px rgba(117,117,117,0.4), inset 0 2px 8px rgba(255,255,255,0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <AssessmentIcon sx={{ fontSize: 36, color: 'white' }} />
                    </Avatar>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                      HTML Elements
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      Comprehensive guide to accessible HTML elements, attributes, and best practices
                    </Typography>
                    <Chip
                      label="Reference"
                      size="medium"
                      sx={{
                        background: 'linear-gradient(135deg, rgba(117,117,117,0.2) 0%, rgba(158,158,158,0.2) 100%)',
                        color: '#757575',
                        fontWeight: 700,
                        border: '1px solid rgba(117,117,117,0.4)',
                        backdropFilter: 'blur(8px)'
                      }}
                    />
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          </Grid>
        </Box>

        {/* Feature Highlights */}
        <Box sx={{ mt: 8, maxWidth: '65%', ml: 'auto', mr: '10%' }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 800, 
                mb: 2,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              Why Choose AccessFlow?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.7,
                textShadow: '0 1px 4px rgba(0,0,0,0.3)'
              }}
            >
              The most comprehensive accessibility testing platform designed for modern web development teams
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} lg={4}>
              <Grow in timeout={1800}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 5, 
                    height: '100%',
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(76, 175, 80, 0.15)',
                    textAlign: 'center',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 30px 50px rgba(0, 0, 0, 0.15), 0 12px 32px rgba(76, 175, 80, 0.25)'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #4caf50, #8bc34a)',
                      borderRadius: '4px 4px 0 0'
                    }
                  }}
                >
                  <SecurityIcon sx={{ fontSize: 80, color: '#4caf50', mb: 3, filter: 'drop-shadow(0 4px 12px rgba(76, 175, 80, 0.3))' }} />
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>
                    Complete Coverage
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                    90+ rules covering all WCAG 2.1 guidelines with both success and failure examples for thorough understanding
                  </Typography>
                </Paper>
              </Grow>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Grow in timeout={2000}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 5, 
                    height: '100%',
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(33, 150, 243, 0.15)',
                    textAlign: 'center',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 30px 50px rgba(0, 0, 0, 0.15), 0 12px 32px rgba(33, 150, 243, 0.25)'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #2196f3, #03dac6)',
                      borderRadius: '4px 4px 0 0'
                    }
                  }}
                >
                  <PsychologyIcon sx={{ fontSize: 80, color: '#2196f3', mb: 3, filter: 'drop-shadow(0 4px 12px rgba(33, 150, 243, 0.3))' }} />
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>
                    Interactive Learning
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                    Live code examples, interactive demos, and real-world scenarios help you master accessibility best practices
                  </Typography>
                </Paper>
              </Grow>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Grow in timeout={2200}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 5, 
                    height: '100%',
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(255, 152, 0, 0.15)',
                    textAlign: 'center',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 30px 50px rgba(0, 0, 0, 0.15), 0 12px 32px rgba(255, 152, 0, 0.25)'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #ff9800, #ffc107)',
                      borderRadius: '4px 4px 0 0'
                    }
                  }}
                >
                  <AutoFixIcon sx={{ fontSize: 80, color: '#ff9800', mb: 3, filter: 'drop-shadow(0 4px 12px rgba(255, 152, 0, 0.3))' }} />
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>
                    Actionable Insights
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                    Get specific, actionable guidance with code samples and step-by-step instructions to fix issues quickly
                  </Typography>
                </Paper>
              </Grow>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
