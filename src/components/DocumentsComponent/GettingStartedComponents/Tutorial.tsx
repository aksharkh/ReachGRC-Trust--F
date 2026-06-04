import { Card, SectionHeader, Feedback } from "../DocShared";

const GettingStartedTutorials = () => (
  <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
      Tutorials
    </h1>
    <p className="text-sm md:text-base text-gray-500 dark:text-zinc-400 leading-relaxed mb-10">
      Step-by-step tutorials to help you complete key tasks in reachGRC. Each tutorial walks you through a real workflow from start to finish.
    </p>

    <section className="mb-12">
      <SectionHeader title="Quickstart tutorials" subtitle="Get productive with reachGRC as fast as possible." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card badge="Tutorial" title="reachGRC in 20 minutes" description="Create domains, add your first controls, and run a compliance assessment end to end." />
        <Card badge="Tutorial" title="Your first risk entry" description="Log a risk, assign likelihood and impact scores, and link it to an existing control." />
        <Card badge="Tutorial" title="Invite a team member" description="Add a user to your organisation, assign a role, and send an invitation email." />
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader title="Controls and compliance" subtitle="Learn how to build and manage your control library." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card badge="Tutorial" title="Create a control from scratch" description="Build a custom control, assign it to a domain, and set its review frequency." />
        <Card badge="Tutorial" title="Import controls via REST API" description="Bulk-import controls from an external system using the reachGRC REST API." />
        <Card badge="Tutorial" title="Map controls to a framework" description="Link existing controls to the relevant clauses of ISO 27001 or SOC 2." />
        <Card badge="Tutorial" title="Upload evidence for a control" description="Attach files, links, or screenshots to satisfy a control's evidence requirements." />
        <Card badge="Tutorial" title="Generate a compliance report" description="Configure and export a compliance report for a selected framework and date range." />
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader title="Risk management" subtitle="Work through common risk management workflows." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card badge="Tutorial" title="Build a risk register" description="Set up your risk register, define a scoring matrix, and log your first set of risks." />
        <Card badge="Tutorial" title="Assign a risk owner" description="Delegate a risk to a team member and track their remediation progress." />
        <Card badge="Tutorial" title="Create a risk treatment plan" description="Document how a risk will be accepted, mitigated, transferred, or avoided." />
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader title="API and integrations" subtitle="Connect reachGRC to your existing tools and workflows." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card badge="Tutorial" title="Authenticate with the REST API" description="Generate an API key and make your first authenticated request to the reachGRC API." />
        <Card badge="Tutorial" title="Sync controls from Jira" description="Connect reachGRC to Jira and auto-create issues when a control fails assessment." />
        <Card badge="Tutorial" title="Export data to CSV" description="Export your control library, risk register, or audit log to a CSV file." />
      </div>
    </section>

    <Feedback />
  </div>
);

export default GettingStartedTutorials;