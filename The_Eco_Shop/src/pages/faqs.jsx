import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import {Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';


const faqs = [
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
    }
  ];

const FAQs = () => {
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (_, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
    <>
        <Navbar onMenuClick={() => setOpen(true)} />
        <Box>
            <Card sx={{ mb: .5 }}>
                <CardContent>
                    <Typography variant="h5">Welcome to The Eco Shop </Typography>
                    <Typography variant="body1">Free deliveries over €100</Typography>
                    <Typography variant="body2">Becoming more eco-conscious is simple when you choose the right products.</Typography>
                </CardContent>
            </Card>
         </Box>
                    
        <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>
      
      {faqs.map((faq, index) => (
        <Accordion
        key={index}
        expanded={expanded === index}
        onChange={handleChange(index)}
        >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">{faq.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography variant="body2">{faq.answer}</Typography>
        </AccordionDetails>
        </Accordion>
      ))}
    </Container>

    <Box sx={{textAlign: 'center'}}>
        <Card sx={{ backgroundColor:'rgb(230, 243, 239)' }}>
          <CardContent>
              <Typography variant="body1">🚀 The Eco Revolution is Here</Typography>
              <Typography variant="body2">We believe sustainability should feel exciting, not overwhelming. That’s why we partner with brands leading the way in clean technology, ethical fashion, and waste-free living. Whether it’s clothes made from organic fibers or homeware built to last decades, each choice you make helps shape a future where innovation and nature work together — beautifully.</Typography><br/>
          </CardContent>
        </Card>
    </Box>
    <Footer />
    </>
    );
};

export default FAQs;