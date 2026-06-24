// pages/non-developers-guide/FAQ.tsx
import { useState } from "react";
import {
  SectionTitle, Divider, OnPageNav, Callout, InlineCode,
} from "@/components/docs/ReusableComponents";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RiCustomerService2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const sections = [
  { id: "faq-general",    label: "General" },
  { id: "faq-branding",   label: "Branding & logo" },
  { id: "faq-sharing",    label: "Sharing & access" },
  { id: "faq-documents",  label: "Documents" },
  { id: "faq-account",    label: "Account & billing" },
];

interface FAQItem {
  q: string;
  a: React.ReactNode;
}

const FAQAccordion = ({ items }: { items: FAQItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
            >
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {item.q}
              </span>
              <span className="text-zinc-400 flex-shrink-0">
                {isOpen ? <FiChevronUp size={15} /> : <FiChevronDown size={15} />}
              </span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const generalFAQs: FAQItem[] = [
  {
    q: "Do I need technical knowledge to use ReachGRC Trust?",
    a: "Not at all. The Non-Developers Guide is designed for anyone on your team — from compliance officers to marketing managers. Everything is managed through a dashboard with no code required.",
  },
  {
    q: "What is the difference between the Trust Badge and the Hosted Trust Center?",
    a: (
      <>
        The <strong className="text-zinc-700 dark:text-zinc-300">Trust Badge</strong> is a
        small embeddable widget you place on your website. The{" "}
        <strong className="text-zinc-700 dark:text-zinc-300">Hosted Trust Center</strong> is a
        full dedicated page hosted by ReachGRC containing all your documents, certifications,
        and your security statement. They complement each other — the badge links to the Trust Center.
      </>
    ),
  },
  {
    q: "How quickly are changes reflected on my Trust Center?",
    a: "Changes made in the dashboard — adding documents, updating your logo, or changing visibility — take effect within seconds. There is no publish button or delay.",
  },
  {
    q: "Can multiple people manage the Trust Center?",
    a: "Yes. Multiple team members can have dashboard access. Contact your ReachGRC administrator to invite additional users to your account.",
  },
  {
    q: "Is my Trust Center publicly indexed by Google?",
    a: (
      <>
        Only if you set visibility to <InlineCode>Public</InlineCode>. If you choose{" "}
        <InlineCode>Link-only</InlineCode> or <InlineCode>Private</InlineCode>, search engines
        are instructed not to index your page via the{" "}
        <InlineCode>noindex</InlineCode> meta tag.
      </>
    ),
  },
];

const brandingFAQs: FAQItem[] = [
  {
    q: "What file formats are supported for the logo?",
    a: (
      <>
        PNG, SVG, and WebP are supported. SVG is recommended for the sharpest result at all
        sizes. Maximum file size is <InlineCode>2 MB</InlineCode>.
      </>
    ),
  },
  {
    q: "My logo has a white background — will it look good?",
    a: "A logo with a white background will look fine on the light version of the Trust Center but may appear as a white box on dark backgrounds. We recommend using a logo with a transparent background for the best result.",
  },
  {
    q: "Can I use different logos for the Trust Badge and the Trust Center?",
    a: "Currently, the same logo is used in both places. To use different assets, please contact ReachGRC support.",
  },
  {
    q: "Can I change the colours of the Trust Center to match my brand?",
    a: "Custom colour themes are available on the Enterprise plan. On the standard plan, the Trust Center uses the default ReachGRC theme with your logo.",
  },
];

const sharingFAQs: FAQItem[] = [
  {
    q: "Can I change the URL of my Trust Center?",
    a: "Trust Center URLs are set based on your company name at account creation. If you need to change it, contact ReachGRC support. Note that changing the URL will break any existing links you have shared.",
  },
  {
    q: "Can visitors download my documents?",
    a: "Yes. Documents you upload are available for download by visitors unless you enable NDA-gated access, in which case visitors must be approved first.",
  },
  {
    q: "How long are NDA-approved access links valid?",
    a: (
      <>
        Approved access links are valid for <InlineCode>30 days</InlineCode> by default.
        You can revoke access at any time from Dashboard → Sharing → Access Requests.
      </>
    ),
  },
  {
    q: "Can I see who has visited my Trust Center?",
    a: "Visitor analytics are available on the Pro and Enterprise plans. From the dashboard, you can see total views, unique visitors, and document download counts.",
  },
  {
    q: "What happens to links I have already shared if I set the Trust Center to Private?",
    a: "All visitors who follow the link will see an 'Access restricted' page. No content is shown until you restore a public visibility setting.",
  },
];

const documentFAQs: FAQItem[] = [
  {
    q: "What types of documents can I upload?",
    a: "PDF files only. This includes SOC 2 reports, ISO 27001 certificates, penetration test summaries, privacy policies, data processing agreements, and any other compliance documents.",
  },
  {
    q: "Is there a limit on the number of documents I can upload?",
    a: "The standard plan supports up to 20 documents. The Pro and Enterprise plans have higher or unlimited limits. Contact your administrator for your current limits.",
  },
  {
    q: "Can I replace a document without changing its URL?",
    a: "Yes. When you upload a new version of an existing document, the document listing is updated in place. Any visitor who bookmarked or shared the document link will get the latest version automatically.",
  },
  {
    q: "How do I remove a document?",
    a: "Go to Dashboard → Documents, click the three-dot menu next to the document, and select 'Delete'. The document is removed from your Trust Center immediately.",
  },
];

const accountFAQs: FAQItem[] = [
  {
    q: "Who is my ReachGRC administrator?",
    a: "Your ReachGRC administrator is the person in your organisation who set up your ReachGRC account. If you are unsure, check with your IT, security, or compliance team.",
  },
  {
    q: "What happens to my Trust Center if my subscription expires?",
    a: "If your subscription lapses, your Trust Center will be taken offline and will display a 'Page not available' message to visitors. Documents and settings are retained and will be restored when the subscription is renewed.",
  },
  {
    q: "Can I export all my documents from ReachGRC?",
    a: "Yes. Go to Dashboard → Documents → Export all to download a ZIP archive of all your uploaded documents.",
  },
  {
    q: "Is there a mobile app for managing my Trust Center?",
    a: "The ReachGRC dashboard is fully responsive and works on mobile browsers. A dedicated mobile app is not currently available.",
  },
];

const FAQ = () => (
  <div className="flex gap-12 p-8 max-w-5xl">
    <div className="flex-1 min-w-0">

      <SectionTitle>Non-Developers Guide</SectionTitle>
      <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">FAQ</h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Answers to the most common questions about setting up and managing your ReachGRC
        Trust Center without any technical knowledge.
      </p>

      <Divider />

      <div id="faq-general" className="mb-8 scroll-mt-6">
        <SectionTitle>General</SectionTitle>
        <FAQAccordion items={generalFAQs} />
      </div>

      <Divider />

      <div id="faq-branding" className="mb-8 scroll-mt-6">
        <SectionTitle>Branding & logo</SectionTitle>
        <FAQAccordion items={brandingFAQs} />
      </div>

      <Divider />

      <div id="faq-sharing" className="mb-8 scroll-mt-6">
        <SectionTitle>Sharing & access</SectionTitle>
        <FAQAccordion items={sharingFAQs} />
      </div>

      <Divider />

      <div id="faq-documents" className="mb-8 scroll-mt-6">
        <SectionTitle>Documents</SectionTitle>
        <FAQAccordion items={documentFAQs} />
      </div>

      <Divider />

      <div id="faq-account" className="mb-8 scroll-mt-6">
        <SectionTitle>Account & billing</SectionTitle>
        <FAQAccordion items={accountFAQs} />
      </div>

      {/* Still need help callout */}
      <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-1">
            Still can't find what you're looking for?
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Our support team is here to help with any questions not covered in this guide.
          </p>
        </div>
        <Link
          to="/docs/contact-us"
          className="flex items-center gap-2 px-4 py-2 bg-[#ff831c] hover:bg-[#e8731a] text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
        >
          <RiCustomerService2Line size={15} />
          Contact support
        </Link>
      </div>

      <Callout icon={<RiCustomerService2Line size={15} />} variant="info">
        For developer-specific questions, visit the{" "}
        <Link to="/docs/developers-guide/get-started" className="underline text-blue-600 dark:text-blue-400">
          Developers Guide
        </Link>{" "}
        or the{" "}
        <Link to="/docs/contact-us" className="underline text-blue-600 dark:text-blue-400">
          API reference
        </Link>.
      </Callout>

    </div>
    <OnPageNav sections={sections} />
  </div>
);

export default FAQ;