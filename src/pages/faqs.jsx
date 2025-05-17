import React from 'react';
import Navbar from '../components/Navbar';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQs = () => {
  return (
    <>
      <Navbar />

      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          Frequently Asked Questions
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Answers to your most common questions about eco shopping 🌿
        </Typography>

        {[
          {
            question: 'What is the Eco Shop?',
            answer:
              'The Eco Shop is an online marketplace offering eco-friendly, sustainable products from trusted vendors.',
          },
          {
            question: 'How do I place an order?',
            answer:
              'Browse through our categories, add products to the cart, and securely complete your purchase.',
          },
          {
            question: 'Do you offer international shipping?',
            answer:
              'Yes, to select countries. Check our shipping policy for the full list.',
          },
          {
            question: 'How can I track my order?',
            answer:
              'After shipping, we send a tracking code via email that you can use on the carrier’s site.',
          },
          {
            question: 'What is your return policy?',
            answer:
              'Returns accepted within 30 days for unused products in original packaging.',
          },
        ].map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 2,
              borderRadius: 3,
              boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
              '&:before': { display: 'none' },
              '&.Mui-expanded': {
                bgcolor: '#f0fdfa',
              },
              '& .MuiAccordionSummary-root': {
                px: 3,
                py: 2,
              },
              '& .MuiAccordionDetails-root': {
                px: 3,
                pb: 3,
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default FAQs;
