import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LockIcon from '@mui/icons-material/Lock';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

const TrustBar = () => {
  const features = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 30 }} />,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: <LockIcon sx={{ fontSize: 30  }} />,
      title: 'Secure Payment',
      description: '100% protected checkout',
    },
    {
      icon: <HeadsetMicIcon sx={{ fontSize: 30 }} />,
      title: '24/7 Support',
      description: 'Always here to help you',
    },
    {
      icon: <RestartAltIcon sx={{ fontSize: 30 }} />,
      title: 'Easy Returns',
      description: '30-day return guarantee',
    },
  ];

  return (
    <Box
      sx={{
        mt: { xs: -10, sm: -12, md: -16 },
        pt: { xs: 6, sm: 8, md: 10 },
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#ffffff',
            borderRadius: '9999px',
            padding: { xs: '6px 8px', sm: '8px 8px', md: '16px 4px' },
            border: '1px solid #e6ddd2',
            boxShadow: '0 4px 16px rgba(99, 146, 121, 0.08)',
            gap: 0,
            animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
            animationDelay: '0.4s',
            animationFillMode: 'both',
          }}
        >
          {features.map((feature, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', px: { xs: 2, sm: 3, md: 4 }, gap: 3 }}>
              {/* Icon */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3b5849',
                  flexShrink: 0,
                }}
              >
                {feature.icon}
              </Box>
              
              {/* Content */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: '#131d19',
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#77a58d',
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    lineHeight: 1.2,
                    display: 'block',
                    margin: 0,
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>

              {/* Vertical Separator */}
              {index < features.length - 1 && (
                <Box
                  sx={{
                    width: '1px',
                    height: { xs: '32px', sm: '40px', md: '48px' },
                    backgroundColor: '#e6ddd2',
                    flexShrink: 0,
                    ml: { xs: 1, sm: 2, md: 4 },
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TrustBar;
