import { useState } from "react";
import { Feedback } from "../DocShared";
import type { CustomerQuery } from "../../../types/CustomerQuery";
import CustomerQueryHandler from "../../../services/CustomerQueryHandler"
interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, description, action, href = "#" }) => (
  <a
    href={href}
    className="block bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-5 hover:border-[#ff831c] transition-colors no-underline group"
  >
    <div className="text-2xl mb-3">{icon}</div>
    <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 mb-1.5 group-hover:text-[#ff611a] transition-colors">
      {title}
    </h3>
    <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed mb-3">{description}</p>
    <span className="text-sm text-[#ff611a] font-medium">{action} →</span>
  </a>
);

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<CustomerQuery>({
  customerName: "",
  email: "",
  subject: "",
  description:"",
});

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
        Contact us
      </h1>
      <p className="text-sm md:text-base text-gray-500 dark:text-zinc-400 leading-relaxed mb-10">
        Get help from the reachGRC team — whether you have a technical question, a billing query, or want to explore enterprise options.
      </p>

      <section className="mb-12">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-4">
          How can we help?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ContactCard icon="📖" title="Documentation" description="Browse our full documentation for guides, API references, and tutorials." action="Browse docs" />
          <ContactCard icon="💬" title="Community forum" description="Ask questions and share knowledge with other reachGRC users and practitioners." action="Join the conversation" />
          <ContactCard icon="🎓" title="Training and certification" description="Take a course and get certified as a reachGRC administrator or compliance analyst." action="Start learning" />
          <ContactCard icon="🐛" title="Report a bug" description="Found something that isn't working as expected? Let us know so we can fix it." action="Submit a bug report" />
          <ContactCard icon="🏢" title="Enterprise sales" description="Talk to our sales team about enterprise plans, custom integrations, and volume pricing." action="Talk to sales" />
          <ContactCard icon="🔐" title="Security disclosures" description="Found a security vulnerability? Please report it through our responsible disclosure program." action="Report a vulnerability" />
        </div>
      </section>

      <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

      <section className="mb-12">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-1">
          Send us a message
        </h2>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">We typically respond within one business day.</p>

        {submitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center max-w-2xl">
            <p className="text-green-800 dark:text-green-400 font-semibold text-sm mb-1">Message sent!</p>
            <p className="text-green-700 dark:text-green-500 text-sm">Thanks for reaching out. We'll get back to you within one business day.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-6 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Name</label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  placeholder="Your name"
                  className="w-full border border-gray-200 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200 dark:placeholder-zinc-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff831c]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full border border-gray-200 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200 dark:placeholder-zinc-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff831c]"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="What is your question about?"
                className="w-full border border-gray-200 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200 dark:placeholder-zinc-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff831c]"
              />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Message</label>
              <textarea
                rows={5}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe your question or issue in detail..."
                className="w-full border border-gray-200 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200 dark:placeholder-zinc-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff831c] resize-none"
              />
            </div>
            <button
              onClick={() =>{
                 setSubmitted(true)
                 CustomerQueryHandler(form);
                }}
              className="px-5 py-2 bg-[#ff831c] text-white text-sm font-medium rounded-lg hover:bg-[#e57318] transition-colors"
            >
              Send message
            </button>
          </div>
        )}
      </section>

      <Feedback />
    </div>
  );
};

export default ContactUs;