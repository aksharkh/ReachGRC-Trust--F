import { BookOpen, Cloud, Code2, HelpCircle, KeyRound, Package } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type DocBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'table'; headers: string[]; rows: string[][] };

export type DocPage = {
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  blocks: DocBlock[];
};

export type DocSection = {
  title: string;
  pages: DocPage[];
};

export const docSections: DocSection[] = [
  {
    title: 'Get Started',
    pages: [
      {
        title: 'Introduction',
        slug: 'introduction',
        description: 'Learn how ReachGRC Trust helps teams publish security posture and compliance evidence.',
        icon: BookOpen,
        blocks: [
          { type: 'p', text: 'ReachGRC Trust provides hosted trust centers, embeddable security badges, and APIs for publishing live security posture to customers and prospects.' },
          { type: 'h2', text: 'What you can build' },
          { type: 'p', text: 'Use the hosted trust profile for a ready-made customer-facing page, embed a lightweight badge on your website, or call the API directly for custom integrations.' },
          { type: 'h2', text: 'Base URLs' },
          {
            type: 'table',
            headers: ['Environment', 'URL'],
            rows: [
              ['Local API', 'http://localhost:8081/api/trust'],
              ['Local frontend', 'http://localhost:5173'],
              ['Production API', 'https://api.reachgrc.com/v1'],
            ],
          },
        ],
      },
      {
        title: 'Installation',
        slug: 'installation',
        description: 'Install dependencies and start the local development server.',
        icon: Package,
        blocks: [
          { type: 'p', text: 'The frontend is a Vite React app using Tailwind CSS, React Router, and Lucide icons.' },
          { type: 'h2', text: 'Run locally' },
          { type: 'code', language: 'powershell', code: 'cd "Frontend/ReachGRC-Trust--F"\nnpm install\nnpm run dev' },
          { type: 'h2', text: 'Build for production' },
          { type: 'code', language: 'powershell', code: 'npm run build\nnpm run preview' },
        ],
      },
    ],
  },
  {
    title: 'Core Concepts',
    pages: [
      {
        title: 'API Docs',
        slug: 'api',
        description: 'Fetch company trust profiles, active companies, and health checks.',
        icon: Code2,
        blocks: [
          { type: 'h2', text: 'Get a company profile' },
          { type: 'code', language: 'http', code: 'GET /api/trust/{companyId}' },
          { type: 'p', text: 'Returns the company profile, security domains, controls, active state, and timestamps.' },
          {
            type: 'table',
            headers: ['Endpoint', 'Method', 'Description'],
            rows: [
              ['/api/trust/{companyId}', 'GET', 'Get company by ID'],
              ['/api/trust/allActive', 'GET', 'List active companies'],
              ['/api/trust/allCompanies', 'GET', 'List all companies'],
              ['/api/trust/health', 'GET', 'Health check'],
              ['/api/trust/{id}', 'PUT', 'Update company'],
            ],
          },
          { type: 'h2', text: 'Example request' },
          { type: 'code', language: 'ts', code: "const response = await fetch('http://localhost:8081/api/trust/14');\nconst company = await response.json();" },
        ],
      },
      {
        title: 'Authentication',
        slug: 'authentication',
        description: 'Use API keys or bearer tokens when calling protected endpoints.',
        icon: KeyRound,
        blocks: [
          { type: 'p', text: 'Public trust pages can be viewed without authentication. Administrative API calls should be protected with a server-side token.' },
          { type: 'h2', text: 'Bearer token' },
          { type: 'code', language: 'ts', code: "await fetch('/api/trust/14', {\n  headers: {\n    Authorization: `Bearer ${token}`,\n  },\n});" },
          { type: 'h2', text: 'Recommended practice' },
          { type: 'p', text: 'Keep API credentials on the server. Avoid exposing administrative tokens in browser code or static configuration files.' },
        ],
      },
    ],
  },
  {
    title: 'Operate',
    pages: [
      {
        title: 'Deployment',
        slug: 'deployment',
        description: 'Deploy the frontend and connect it to your backend API.',
        icon: Cloud,
        blocks: [
          { type: 'p', text: 'Deploy the Vite build output from the dist folder to any static hosting provider. Configure the API base URL for your environment.' },
          { type: 'h2', text: 'Production checklist' },
          {
            type: 'table',
            headers: ['Item', 'Purpose'],
            rows: [
              ['CORS origins', 'Allow your production frontend domain'],
              ['API URL', 'Point frontend requests to the deployed backend'],
              ['HTTPS', 'Protect customer trust center traffic'],
              ['Monitoring', 'Track API health and page errors'],
            ],
          },
          { type: 'h2', text: 'Build command' },
          { type: 'code', language: 'powershell', code: 'npm run build' },
        ],
      },
      {
        title: 'FAQ',
        slug: 'faq',
        description: 'Answers to common implementation and integration questions.',
        icon: HelpCircle,
        blocks: [
          { type: 'h2', text: 'How do I find a valid company ID?' },
          { type: 'p', text: 'Call /api/trust/allCompanies and use the id field from the returned company object.' },
          { type: 'h2', text: 'Why does a company page show not found?' },
          { type: 'p', text: 'The company ID may not exist, the backend may be unavailable, or the frontend may be pointing to the wrong API base URL.' },
          { type: 'h2', text: 'Can I embed the trust badge?' },
          { type: 'p', text: 'Yes. Use the widget build for public websites, or call the API directly if you need a custom user interface.' },
        ],
      },
    ],
  },
];

export const allDocPages = docSections.flatMap((section) => section.pages);

export const getDocPage = (slug?: string) =>
  allDocPages.find((page) => page.slug === slug) ?? allDocPages[0];
