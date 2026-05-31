import { Card, SectionHeader, Feedback } from "../DocShared";

const Overview = () => (
  <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
      Get started
    </h1>
    <p className="text-sm md:text-base text-gray-500 dark:text-zinc-400 leading-relaxed mb-10">
      To begin with reachGRC and learn about its key features and benefits, start with the following topics.
    </p>

    <section className="mb-12">
      <SectionHeader
        title="Get started with reachGRC for users"
        subtitle="Learn basic information and follow instructions as a first-time user of reachGRC."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card title="Before you begin" description="Check prerequisites for using reachGRC and connecting to your organisation's account." />
        <Card title="Sign into reachGRC" description="Learn how to sign in using SSO, email/password, or API key authentication." />
        <Card title="Architecture and key concepts" description="Understand how controls, domains, and compliance are structured in reachGRC." />
        <Card title="Dashboard quick tour" description="Learn the key areas of the dashboard — scores, tasks, risks, and activity." />
        <Card title="Control lifecycle" description="Learn how controls are created, assigned, assessed, and remediated." />
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader
        title="Start learning with interactive tutorials"
        subtitle="Complete essential reachGRC tasks through step-by-step tutorials."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card badge="Tutorial" title="reachGRC in 20 minutes" description="Create domains, add controls, and run your first compliance assessment." />
        <Card badge="Tutorial" title="Import controls via REST API" description="Bulk-import controls from an external system using the reachGRC REST API." />
        <Card badge="Tutorial" title="Generate a compliance report" description="Configure and export a report for a selected framework and date range." />
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader
        title="Sample data sets"
        subtitle="Explore reachGRC using ready-made sample controls, risk registers, and reports."
        seeAll
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card badge="Sample" title="ISO 27001 sample controls" description="A read-only control library mapped to ISO/IEC 27001:2022 for evaluation and testing." />
        <Card badge="Sample" title="SOC 2 Type II sample" description="Sample trust service criteria controls covering security, availability, and confidentiality." />
        <Card badge="Sample" title="Risk register template" description="A pre-populated register with sample risks, scores, and linked controls." />
      </div>
    </section>

    <Feedback />
  </div>
);

export default Overview;