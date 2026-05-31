import { Card, SectionHeader, Feedback } from "../DocShared";

const SampleData = () => (
  <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
      Sample data
    </h1>
    <p className="text-sm md:text-base text-gray-500 dark:text-zinc-400 leading-relaxed mb-10">
      reachGRC provides ready-made sample data sets so you can explore the platform, run test assessments, and evaluate compliance workflows without setting up real data.
    </p>

    <section className="mb-12">
      <SectionHeader title="Framework sample sets" subtitle="Pre-built control libraries mapped to industry compliance frameworks." seeAll />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card badge="Sample" title="ISO 27001 control set" description="A read-only library of controls mapped to all clauses of the ISO/IEC 27001:2022 standard." />
        <Card badge="Sample" title="SOC 2 Type II controls" description="Sample trust service criteria controls covering security, availability, confidentiality, and privacy." />
        <Card badge="Sample" title="NIST CSF control set" description="Controls aligned to the five NIST Cybersecurity Framework functions: Identify, Protect, Detect, Respond, Recover." />
        <Card badge="Sample" title="GDPR readiness checklist" description="A control set covering the core obligations of the General Data Protection Regulation." />
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader title="Risk register samples" subtitle="Pre-populated risk registers to explore scoring, treatment, and linking." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card badge="Sample" title="IT risk register" description="Common IT risks including data breach, system downtime, and third-party failure with pre-assigned scores." />
        <Card badge="Sample" title="Operational risk register" description="Covers process failures, human error, and supply chain risks with likelihood and impact scores." />
        <Card badge="Sample" title="Risk treatment plan template" description="A register with example treatment plans showing accept, mitigate, transfer, and avoid strategies." />
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader title="Assessment and report samples" subtitle="Example assessments and exported reports to understand reachGRC's output format." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card badge="Sample" title="Completed assessment export" description="A sample PDF export of a completed ISO 27001 assessment showing scores, findings, and evidence." />
        <Card badge="Sample" title="Gap analysis report" description="An example gap analysis showing control coverage against a selected framework." />
        <Card badge="Sample" title="Audit evidence package" description="A sample bundle showing how reachGRC packages control responses and attachments for auditors." />
      </div>
    </section>

    <Feedback />
  </div>
);

export default SampleData;