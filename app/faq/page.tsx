'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Do I need to download an app?',
    answer: 'No. AllergyLink works in any modern browser. You can add it to your home screen if you want, but it\'s not required. No app downloads, no app store accounts needed.'
  },
  {
    question: 'What information is shared?',
    answer: 'Only the allergy and dietary information you choose to include in your profile. No personal identifying information like your phone number, last name, or address is shared with venues. You control what venues see.'
  },
  {
    question: 'Can I add multiple family members?',
    answer: 'Yes! You can create profiles for yourself, your children, partner, or any family member. Each profile has its own AllergyLink ID and QR code. Switch between profiles when sharing.'
  },
  {
    question: 'How do venues see my profile?',
    answer: 'Share your AllergyLink ID or QR code. Venues scan the QR code or enter the ID to see your allergy card—no account needed for them. They see a clear, simple allergy card with your information.'
  },
  {
    question: 'Is AllergyLink free?',
    answer: 'Yes. Creating and sharing your AllergyLink profile is free for families. No credit card required. We believe allergy safety should be accessible to everyone.'
  },
  {
    question: 'Can I update my profile?',
    answer: 'Yes, you can update your profile anytime. When you make changes, venues who have your AllergyLink ID will see the updated information automatically.'
  },
  {
    question: 'What if I have a rare allergy not in the list?',
    answer: 'You can add custom allergies using the "Other" field when creating your profile. Include the name and severity level, and it will appear on your allergy card.'
  },
  {
    question: 'Is my information secure?',
    answer: 'Yes. Your allergy information is stored securely and only shared when you choose to share your AllergyLink ID or QR code. We never share your personal contact information with venues.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container section">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1>Frequently Asked Questions</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Everything you need to know about AllergyLink
          </p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card"
              style={{
                marginBottom: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => toggleFAQ(index)}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px'
              }}>
                <h3 style={{ margin: 0, flex: 1, textAlign: 'left' }}>{faq.question}</h3>
                <span style={{
                  fontSize: '1.5rem',
                  color: 'var(--color-primary)',
                  transition: 'transform 0.2s',
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                  ▼
                </span>
              </div>
              {openIndex === index && (
                <div style={{
                  padding: '0 20px 20px',
                  borderTop: '1px solid var(--color-border)',
                  marginTop: '16px',
                  paddingTop: '20px'
                }}>
                  <p className="text-muted" style={{ margin: 0, lineHeight: 1.6 }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: '48px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', background: 'rgba(0, 82, 204, 0.05)', borderColor: 'var(--color-primary)' }}>
          <h3 style={{ marginBottom: '12px', color: 'var(--color-primary)' }}>
            Still have questions?
          </h3>
          <p style={{ marginBottom: '20px' }}>
            We're here to help. Contact our support team.
          </p>
          <a
            href="/support"
            className="btn btn-primary"
          >
            Contact Support
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
