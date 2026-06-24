import { DocCard as Card, SectionHeader, PageFeedback as Feedback } from "@/components/docs/ReusableComponents";

const ConceptsForAdmins = () => (
  <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
      Concepts for administrators
    </h1>
    <p className="text-sm md:text-base text-gray-500 dark:text-zinc-400 leading-relaxed mb-10">
      Understand the core concepts you need to configure, manage, and maintain reachGRC for your organisation.
    </p>

    <section className="mb-12">
      <SectionHeader title="Organisation and structure" subtitle="How reachGRC models your organisation's GRC program." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card title="Domains" description="Domains group controls into logical areas such as Access Control, Data Security, or Operations." />
        <Card title="Control hierarchy" description="Understand how controls, sub-controls, and objectives are structured within a domain." />
        <Card title="Frameworks" description="Learn how reachGRC maps your controls to frameworks like ISO 27001, SOC 2, and NIST CSF." />
        <Card title="Organisations and tenants" description="Learn how data and access are separated between organisations in multi-tenant accounts." />
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader title="Users, roles, and access" subtitle="Control who can see and do what inside reachGRC." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card title="Roles and permissions" description="Learn the built-in roles — Admin, Manager, Reviewer, and Viewer — and what each can access." />
        <Card title="Custom roles" description="Create roles with tailored permission sets to match your organisation's structure." />
        <Card title="Single sign-on (SSO)" description="Configure SSO with your identity provider using SAML 2.0 or OIDC." />
        <Card title="User provisioning with SCIM" description="Automatically provision and deprovision users from your identity provider via SCIM." />
        <Card title="Access reviews" description="Periodically certify that users still require the access they have been granted." />
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader title="Compliance and assessments" subtitle="How reachGRC evaluates and scores your compliance posture." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card title="Assessment cycles" description="Learn how assessment periods work, how they are scheduled, and how results are retained." />
        <Card title="Compliance scoring" description="Understand how reachGRC calculates your compliance score across domains and frameworks." />
        <Card title="Evidence management" description="Learn how evidence is collected, stored, and linked to controls for audit purposes." />
        <Card title="Remediation workflows" description="Understand how failed controls flow into remediation tasks and how progress is tracked." />
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader title="Platform administration" subtitle="Keep reachGRC running smoothly for your organisation." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card title="Audit logs" description="Every action in reachGRC is logged. Learn how to access, filter, and export audit log entries." />
        <Card title="Notifications and alerts" description="Configure email and in-app notifications for deadlines, failures, and status changes." />
        <Card title="Data retention" description="Understand how long reachGRC retains assessment history, evidence, and audit logs." />
        <Card title="Integrations" description="Connect reachGRC to Jira, Slack, and other tools via webhooks or native integrations." />
        <Card title="Backup and recovery" description="Learn about reachGRC's backup strategy and how to request a data export." />
      </div>
    </section>

    <Feedback />
  </div>
);

export default ConceptsForAdmins;