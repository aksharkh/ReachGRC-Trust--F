import { Card, SectionHeader, Feedback } from "../DocShared";

const GetStartedForUsers = () => (
  <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
      Get started for users
    </h1>
    <p className="text-sm md:text-base text-gray-500 dark:text-zinc-400 leading-relaxed mb-10">
      Everything a new reachGRC user needs to get up and running — from signing in to completing your first compliance assessment.
    </p>

    <section className="mb-12">
      <SectionHeader title="Set up your account" subtitle="Complete these steps before you start working in reachGRC." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card title="Before you begin" description="Check prerequisites including browser support, network requirements, and account access." />
        <Card title="Sign in for the first time" description="Learn how to sign in using your organisation's SSO provider or email and password." />
        <Card title="Enable two-factor authentication" description="Secure your account by enabling 2FA via an authenticator app or SMS." />
        <Card title="Update your profile" description="Add your name, role, and notification preferences to personalise your experience." />
        <Card title="Understand your role" description="Learn what access level you have been assigned and what actions you can perform." />
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader title="Navigate the platform" subtitle="Learn the key areas of the reachGRC interface." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card title="Dashboard overview" description="Understand what the dashboard shows — compliance scores, open tasks, and recent activity." />
        <Card title="Controls library" description="Browse and filter the full list of controls assigned to your organisation." />
        <Card title="Risk register" description="View logged risks, their severity ratings, and their linked controls." />
        <Card title="My tasks" description="Find and complete the controls and assessments that have been assigned to you." />
        <Card title="Notifications" description="Understand how reachGRC notifies you of deadlines, status changes, and comments." />
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader title="Complete your first assessment" subtitle="Step through your first compliance assessment from start to finish." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card badge="Guide" title="Review an assigned control" description="Open a control assigned to you, review its requirements, and submit your response." />
        <Card badge="Guide" title="Upload evidence" description="Attach documents or links to a control to satisfy its evidence requirements." />
        <Card badge="Guide" title="Add a comment" description="Collaborate with your team by leaving comments on controls, risks, and assessments." />
        <Card badge="Guide" title="Mark a control as complete" description="Learn control statuses and how to mark one as compliant or remediated." />
      </div>
    </section>

    <Feedback />
  </div>
);

export default GetStartedForUsers;