/**
 * schema.org structured data for the site. Values are drawn from real page
 * content only — nothing invented. Consumed by <JsonLd> and prerendered.
 */

const ORIGIN = 'https://www.clearbuildconsulting.co.uk';
const ORG_ID = `${ORIGIN}/#organization`;

/** Organization + ProfessionalService — homepage. */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'Clear Build Consulting',
  url: ORIGIN,
  description:
    'Senior advisory for small and mid sized businesses: AI consultancy and built environment advisory. Clear scope, clear systems, better decisions.',
  areaServed: 'GB',
  founder: {
    '@type': 'Person',
    name: 'Mike Anderson',
    jobTitle: 'Founder & Principal Consultant',
  },
  knowsAbout: [
    'AI consultancy',
    'Business process automation',
    'Built environment advisory',
    'Construction and infrastructure consulting',
  ],
};

/** Person — About page. */
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mike Anderson',
  jobTitle: 'Founder & Principal Consultant',
  worksFor: { '@id': ORG_ID },
  url: `${ORIGIN}/about`,
  sameAs: ['https://www.linkedin.com/in/michael-anderson-7996b546/'],
  description:
    'Senior project manager with over 20 years delivering complex civil engineering and infrastructure projects.',
};

/** Service builder — service pages. */
export const serviceSchema = (opts: {
  name: string;
  description: string;
  path: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: opts.name,
  description: opts.description,
  url: `${ORIGIN}${opts.path}`,
  provider: { '@id': ORG_ID },
  areaServed: 'GB',
});

/** FAQPage builder — pages with FAQ blocks. Pass the same Q&A data the UI renders. */
export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

/**
 * AI Advisory FAQ content — single source of truth for both the rendered
 * accordion (FAQSection) and the FAQPage structured data, so they can never
 * drift apart.
 */
export const aiAdvisoryFaqs: { q: string; a: string }[] = [
  {
    q: 'How do I know if my business is ready for AI?',
    a: 'You do not need to be technically advanced to engage. What matters is whether your business has repeatable processes, recurring administrative work, or decision bottlenecks that slow delivery.\n\nIf your team relies heavily on spreadsheets, email chains, manual document preparation, or duplicated effort, there is usually scope for improvement. The audit determines whether AI is commercially justified and where it should be applied. If it is not appropriate, that will be made clear.',
  },
  {
    q: 'What size businesses do you typically work with?',
    a: 'We work with established small and mid-sized businesses, from professional services to trades, where operational complexity is beginning to create drag.\n\nIf inefficiencies are affecting time, cost, reporting, or decision-making, the advisory model is designed to bring structure and measurable improvement.\n\nVery early-stage or informal ventures are usually not suitable.',
  },
  {
    q: 'Is this about replacing staff?',
    a: 'No. The focus is operational efficiency, not headcount reduction.\n\nMost opportunities in SMEs involve removing repetitive low value tasks, improving response times, and standardising outputs. The objective is improved margin and delivery quality, not replacing experienced people.',
  },
  {
    q: 'What does the AI audit actually produce?',
    a: 'The audit produces a structured written report including:\n\n• An AI Opportunity Register\n• Prioritised use cases\n• A Do Now / Do Later framework\n• A 90 day roadmap\n• Governance and risk commentary\n\nThis is a practical implementation framework, not a generic slide deck.',
  },
  {
    q: 'Do you also implement the recommended solutions?',
    a: 'Yes. Selected opportunities can move into a defined implementation phase.\n\nImplementation may be delivered directly or in partnership with trusted technical specialists, depending on complexity. Advisory oversight remains in place to ensure alignment, governance, and commercial discipline.',
  },
  {
    q: 'How long does the process take?',
    a: 'A typical audit runs between three and six weeks, depending on organisational size and complexity.\n\nThe engagement is fixed scope and time bound. Implementation phases are defined separately once priorities are agreed.',
  },
  {
    q: 'Do you sell software or receive commission from tools?',
    a: 'No.\n\nRecommendations are made independently and based on suitability, not affiliation. The objective is operational improvement, not software sales.',
  },
];
