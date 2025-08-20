export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Intense Group",
    "description": "We unite strategy, performance, creative, data, and MarTech to move brands forward across Africa and Europe.",
    "url": "https://intensegroup.com",
    "logo": "https://intensegroup.com/logo.png",
    "foundingDate": "2014",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "United Kingdom"
      }
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@intensegroup.com"
    },
    "sameAs": [
      "https://linkedin.com/company/intense-group",
      "https://twitter.com/intensegroup"
    ],
    "address": [
      {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "United Kingdom"
      },
      {
        "@type": "PostalAddress",
        "addressLocality": "Barcelona",
        "addressCountry": "Spain"
      }
    ]
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Marketing Agency Services",
    "description": "Strategy, performance, creative, data, and MarTech solutions to move brands forward across Africa and Europe.",
    "provider": {
      "@type": "Organization",
      "name": "Intense Group"
    },
    "serviceType": "Marketing and Advertising Services",
    "areaServed": ["Africa", "Europe"]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Intense Group",
    "url": "https://intensegroup.com",
    "description": "Marketing agency specializing in growth, creativity, data & AI",
    "publisher": {
      "@type": "Organization",
      "name": "Intense Group"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  )
}
