import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  Paper,
  Divider,
  Stack,
  Typography,
  Alert,
  AlertTitle,
  Chip,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ErrorOutline as ErrorIcon,
  ContentCopy as CopyIcon,
  Info as InfoIcon,
  BugReport as BugIcon,
  Code as CodeIcon,
} from "@mui/icons-material";
import CustomizedBreadcrumbs from "../util/ruleBreadcrumb";

const IssueFailure = ({ itemContent, itemDescription, helpText, fixSteps }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCopyCode = async (content, index) => {
    try {
      // Extract text content from React elements
      const textContent = typeof content === 'string' ? content : 
        content?.props?.children || 'Content not available';
      
      await navigator.clipboard.writeText(textContent);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  const renderFailureExample = (content, index) => {
    return (
      <Card 
        key={index}
        sx={{ 
          mb: 3, 
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          border: '1px solid rgba(244, 67, 54, 0.3)', 
          borderRadius: 3,
          boxShadow: '0 12px 28px rgba(244, 67, 54, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 16px 36px rgba(244, 67, 54, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            borderColor: 'rgba(244, 67, 54, 0.4)'
          },
          transition: 'all 0.3s ease-in-out'
        }}
        role="region"
        aria-labelledby={`failure-example-${index}`}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ErrorIcon sx={{ color: '#f44336', fontSize: 20 }} />
              <Typography 
                id={`failure-example-${index}`}
                variant="subtitle2" 
                sx={{ fontWeight: 600, color: '#f44336' }}
              >
                Failure Example #{index + 1}
              </Typography>
              <Chip 
                label="Accessibility Issue" 
                size="small"
                icon={<BugIcon />}
                sx={{
                  background: 'rgba(244, 67, 54, 0.15)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(244, 67, 54, 0.3)',
                  color: '#d32f2f',
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
              />
            </Stack>
            <Tooltip title={copiedIndex === index ? "Copied!" : "Copy example code"}>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(content, index)}
                sx={{ 
                  color: copiedIndex === index ? '#4caf50' : '#666',
                  background: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': { 
                    background: 'rgba(255, 255, 255, 0.4)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
                aria-label={`Copy failure example ${index + 1} code`}
              >
                <CopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
          
          <Box 
            sx={{ 
              p: 3, 
              background: 'rgba(255, 243, 243, 0.6)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 205, 210, 0.5)',
              borderRadius: 2,
              position: 'relative',
              boxShadow: 'inset 0 2px 8px rgba(244, 67, 54, 0.05)',
              '& .list-item': {
                border: '1px solid rgba(255, 205, 210, 0.6)',
                background: 'rgba(255, 235, 238, 0.7)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                margin: '8px 0',
                padding: '12px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(244, 67, 54, 0.1)'
              }
            }}
          >
            {content}
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Convert itemContent to array if it's not already
  // If itemContent contains multiple .list-item elements, extract them as separate examples
  const examples = useMemo(() => {
    if (React.isValidElement(itemContent) && itemContent.props.children) {
      // Look for .list-item divs within the content
      const children = React.Children.toArray(itemContent.props.children);
      const listItems = children.filter(child => 
        React.isValidElement(child) && 
        child.props.className && 
        child.props.className.includes('list-item')
      );
      
      // If we found list items, return them as separate examples
      if (listItems.length > 0) {
        return listItems;
      }
    }
    
    // Otherwise, treat the entire content as a single example
    return React.Children.toArray(itemContent);
  }, [itemContent]);

  return (
    <>
      {/* Header Section */}
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <CustomizedBreadcrumbs />
              <Divider sx={{ my: 2 }} />
              
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  background: 'rgba(244, 67, 54, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(244, 67, 54, 0.3)',
                  borderRadius: 2,
                  boxShadow: '0 8px 16px rgba(244, 67, 54, 0.1)'
                }}
                icon={<ErrorIcon />}
              >
                <AlertTitle sx={{ fontWeight: 'bold' }}>
                  Accessibility Failure Detected
                </AlertTitle>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {itemDescription}
                </Typography>
              </Alert>

              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip 
                  icon={<BugIcon />} 
                  label="Needs Fix" 
                  sx={{
                    background: 'rgba(244, 67, 54, 0.2)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(244, 67, 54, 0.4)',
                    color: '#d32f2f',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'rgba(244, 67, 54, 0.3)'
                    }
                  }}
                />
                <Chip 
                  icon={<InfoIcon />} 
                  label={`${examples.length} Example${examples.length !== 1 ? 's' : ''}`} 
                  sx={{
                    background: 'rgba(25, 118, 210, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(25, 118, 210, 0.3)',
                    color: '#1976d2',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'rgba(25, 118, 210, 0.2)'
                    }
                  }}
                />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Help and Context Section */}
      {(helpText || fixSteps) && (
        <Container sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Accordion
                sx={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  '&:before': {
                    display: 'none',
                  },
                  '& .MuiAccordionSummary-root': {
                    background: 'rgba(25, 118, 210, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '12px 12px 0 0',
                    '&:hover': {
                      background: 'rgba(25, 118, 210, 0.15)'
                    }
                  },
                  '& .MuiAccordionDetails-root': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="help-content"
                  id="help-header"
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <InfoIcon color="primary" />
                    <Typography variant="h6">Understanding This Issue</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  {helpText && (
                    <Typography paragraph sx={{ mb: 2 }}>
                      {helpText}
                    </Typography>
                  )}
                  {fixSteps && (
                    <>
                      <Typography variant="h6" sx={{ mb: 1, color: '#1976d2' }}>
                        How to Fix:
                      </Typography>
                      <ul>
                        {fixSteps.map((step, index) => (
                          <li key={index}>
                            <Typography paragraph>{step}</Typography>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Container>
      )}

      {/* Failure Examples Section */}
      <Container sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <CodeIcon sx={{ color: '#f44336', fontSize: 28 }} />
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#f44336'
                  }}
                >
                  Failure Examples
                </Typography>
              </Stack>
              
              <Typography 
                variant="body2" 
                sx={{ mb: 3, color: '#666' }}
              >
                The following examples demonstrate common accessibility failures. 
                Review each example to understand what makes it problematic.
              </Typography>
              
              <Divider sx={{ mb: 3 }} />

              <Box role="region" aria-label="Failure examples list">
                {examples.length > 0 ? (
                  examples.map((example, index) => renderFailureExample(example, index))
                ) : (
                  <Alert severity="info" icon={<InfoIcon />}>
                    No failure examples available for this rule.
                  </Alert>
                )}
              </Box>

              {examples.length > 0 && (
                <Box sx={{ 
                  mt: 4, 
                  p: 3, 
                  background: 'rgba(255, 243, 224, 0.6)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 193, 7, 0.3)',
                  borderRadius: 3,
                  boxShadow: '0 4px 16px rgba(255, 193, 7, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>💡 Tip:</strong> Use the copy button to grab example code. 
                    Each example shows a specific way this accessibility rule can fail.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

// PropTypes for better development experience
IssueFailure.propTypes = {
  itemContent: PropTypes.node.isRequired,
  itemDescription: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  fixSteps: PropTypes.arrayOf(PropTypes.string),
};

// Default props for optional parameters
IssueFailure.defaultProps = {
  helpText: null,
  fixSteps: null,
};

export default IssueFailure;
