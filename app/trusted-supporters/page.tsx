'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TrustedSupporterCard from '@/components/ui/TrustedSupporterCard';

export default function TrustedSupporters() {
  const supporters = [
    {
      name: 'Boston Children\'s Hospital',
      description: 'Leading pediatric allergy care center using AllergyLink to streamline patient information sharing.',
      logo: '/logos/boston-childrens.png'
    },
    {
      name: 'Food Allergy Research & Education (FARE)',
      description: 'National nonprofit organization supporting the food allergy community with AllergyLink integration.',
      logo: '/logos/fare.png'
    },
    {
      name: 'AllergyEats',
      description: 'Restaurant review platform for allergy-friendly dining, now powered by AllergyLink profiles.',
      logo: '/logos/allergyeats.png'
    }
  ];

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container-wide section">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1>Trusted Supporters</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Organizations and partners who trust and support AllergyLink in making dining safer for everyone.
          </p>
        </div>

        <div className="grid grid-3">
          {supporters.map((supporter, idx) => (
            <TrustedSupporterCard
              key={idx}
              name={supporter.name}
              description={supporter.description}
              logo={supporter.logo}
            />
          ))}
        </div>

        <div className="card" style={{ marginTop: '48px', background: 'rgba(0, 82, 204, 0.05)', borderColor: 'var(--color-primary)' }}>
          <h3 style={{ marginBottom: '12px', color: 'var(--color-primary)' }}>
            Become a Trusted Supporter
          </h3>
          <p style={{ marginBottom: '20px' }}>
            Are you an organization interested in partnering with AllergyLink? We'd love to hear from you.
          </p>
          <a
            href="mailto:partners@allergylink.com"
            className="btn btn-primary"
          >
            Contact Us
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
