import React from 'react';
import Navbar from '../components/Navbar';
import {Box, Typography, Accordion, AccordionSummary, AccordionDetails, Card, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '../components/Footer';
import { useState } from 'react';

const FAQs = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleChange = (index) => (_, isExpanded) => {
    setExpandedIndex(isExpanded ? index : null);
  };

  const faqList = [
    {
      question: "What makes your products eco-friendly?",
      answer: "Our products are sourced from certified sustainable suppliers. They are biodegradable, recyclable, made from organic materials, or have minimal environmental impact."
    },
    {
      question: "Do you offer local delivery in Dublin?",
      answer: "Yes! We offer two-day carbon-neutral delivery within the Dublin area for orders over €50 and free over €100"
    },
    {
      question: "Where are your products sourced from?",
      answer: "We prioritize Irish and European suppliers who meet high sustainability and ethical standards."
    },
    {
      question: "Are your packaging materials eco-friendly?",
      answer: "Absolutely. All of our packaging is plastic-free, compostable, or fully recyclable."
    },
    {
      question: "Can I return or exchange items?",
      answer: "Yes, we accept returns within 14 days of delivery. Items must be unused and in original condition."
    },
    {
      question: "How can I know if a product is vegan or cruelty-free?",
      answer: "Each product listing clearly indicates whether it is vegan and/or cruelty-free, along with relevant certifications."
    },
    {
      question: "Do you offer student or community discounts?",
      answer: "Yes, we offer a 10% discount for students, NGOs, and community organizations. Contact us with valid ID for a discount code."
    },
    {
      question: "Do you have a physical store in Dublin?",
      answer: "Currently, we operate online only, but we attend eco-markets and pop-ups around Dublin regularly!"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Visa, Mastercard, PayPal, Apple Pay, and Revolut."
    },
    {
      question: "How can I reduce my carbon footprint when shopping with you?",
      answer: "Choose local brands, opt for combined shipping, and select our minimal-packaging option at checkout."
    },
  ];
  return (
    <>
      <Navbar />
      <Box>
        <Card sx={{ mb: 1.5, mt: 4 }}>
          <CardContent>
            <Typography variant="h5">Frequently Asked Questions</Typography>
            <Typography variant="body2">
              Becoming more eco-conscious is simple when you choose the right products.
            </Typography>
          </CardContent>
        </Card>
      </Box>
        
          {faqList.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expandedIndex === index}
            onChange={handleChange(index)}
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
      <Footer />
    </>
  );
};

export default FAQs;