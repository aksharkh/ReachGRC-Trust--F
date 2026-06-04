import { BiCopy } from 'react-icons/bi';
import { useState } from 'react';
import type { DocBlock, DocPage } from '../../data/docs';
import { Button } from '../ui/button';

type DocsContentProps = {
  page: DocPage;
};

const CodeBlock = ({ block }: { block: Extract<DocBlock, { type: 'code' }> }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(block.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950">
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2">
        <span className="text-xs font-medium text-neutral-400">{block.language}</span>
        <Button variant="ghost" size="sm" className="h-8 text-neutral-300 hover:bg-neutral-800 hover:text-white" onClick={copy}>
          <BiCopy size={14} />
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-neutral-100">
        <code>{block.code}</code>
      </pre>
    </div>
  );
};

const TableBlock = ({ block }: { block: Extract<DocBlock, { type: 'table' }> }) => (
  <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
    <table className="w-full text-left text-sm">
      <thead className="bg-neutral-50 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
        <tr>
          {block.headers.map((header) => (
            <th key={header} className="px-4 py-3 font-medium">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {block.rows.map((row) => (
          <tr key={row.join('-')} className="bg-white dark:bg-neutral-950">
            {row.map((cell) => (
              <td key={cell} className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const renderBlock = (block: DocBlock, index: number) => {
  if (block.type === 'h2') return <h2 key={index} className="pt-8 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">{block.text}</h2>;
  if (block.type === 'h3') return <h3 key={index} className="pt-5 text-xl font-semibold text-neutral-950 dark:text-white">{block.text}</h3>;
  if (block.type === 'p') return <p key={index} className="text-base leading-7 text-neutral-600 dark:text-neutral-400">{block.text}</p>;
  if (block.type === 'code') return <CodeBlock key={index} block={block} />;
  return <TableBlock key={index} block={block} />;
};

export const DocsContent = ({ page }: DocsContentProps) => {
  const Icon = page.icon;

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 lg:px-8 lg:py-14">
      <div className="mb-10 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white">
          <Icon size={22} />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white">{page.title}</h1>
        <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-400">{page.description}</p>
      </div>
      <div className="space-y-5">{page.blocks.map(renderBlock)}</div>
    </article>
  );
};
