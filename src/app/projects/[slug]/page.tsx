import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMarkdownContent } from '@/lib/markdown';
import { projects } from '@/lib/projects';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getMarkdownContent('projects', slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const name = (typeof project.data.name === 'string' ? project.data.name : null) || slug.replace(/-/g, ' ');
  const description = (typeof project.data.description === 'string' ? project.data.description : null) || `Project by Steven Khuu (thanhk): ${name}`;

  return {
    title: name,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

/** Approximate word count from the rendered HTML — good enough for a stamp. */
function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ');
  return text.split(/\s+/).filter(Boolean).length;
}

/** Writeups open with `## Project Overview`, so nothing to strip; a stray H1
 *  would otherwise repeat the title the page already prints. */
function stripLeadingHeading(html: string): string {
  return html.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/, '');
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getMarkdownContent('projects', slug);

  if (!project) {
    notFound();
  }

  // The card list is the source of truth for year, status and links; the
  // markdown only carries the writeup and its own frontmatter.
  const entry = projects.find((item) => item.detailSlug === slug);

  const name = entry?.name
    || (typeof project.data.name === 'string' ? project.data.name : null)
    || slug.replace(/-/g, ' ');
  const description = entry?.description
    || (typeof project.data.description === 'string' ? project.data.description : null);
  const tech = entry?.tech || (typeof project.data.tech === 'string' ? project.data.tech : null);
  const body = stripLeadingHeading(project.content);
  const words = countWords(body);

  // Neighbours, in the order the projects page lists them.
  const documented = projects.filter((item) => item.detailSlug);
  const index = documented.findIndex((item) => item.detailSlug === slug);
  const previous = index > 0 ? documented[index - 1] : null;
  const next = index >= 0 && index < documented.length - 1 ? documented[index + 1] : null;

  return (
    <div>
      <p className="breadcrumb">
        you are here:{' '}
        <Link href="/">home</Link>
        <span className="sep">&gt;</span>
        <Link href="/projects">projects</Link>
        <span className="sep">&gt;</span>
        {name}
      </p>

      <article className="retro-card">
        <div className="panel-head">
          project
          <span className="right">{slug}.md</span>
        </div>

        <div className="entry">
          <header className="entry-header">
            <h1 className="entry-title">{name}</h1>
            <p className="entry-meta">
              {entry?.year && <>[{entry.year}]<span className="sep">·</span></>}
              {entry?.status && <>{entry.status}<span className="sep">·</span></>}
              {words} words
            </p>
            {description && <p className="entry-lead">{description}</p>}
            {tech && (
              <div className="chips">
                {tech.split(',').map((item) => (
                  <span key={item} className="chip">{item.trim()}</span>
                ))}
              </div>
            )}
            {entry?.url && (
              <a
                className="text-link"
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                visit site
              </a>
            )}
          </header>

          <div className="entry-body" dangerouslySetInnerHTML={{ __html: body }} />

          <footer className="entry-footer">
            <p className="entry-end">— end of entry —</p>
            <div className="entry-nav">
              {previous ? (
                <Link href={`/projects/${previous.detailSlug}`} className="entry-nav-link">
                  &laquo; {previous.name}
                </Link>
              ) : (
                <span className="entry-nav-empty">&laquo; first project</span>
              )}
              <Link href="/projects" className="entry-nav-index">all projects</Link>
              {next ? (
                <Link href={`/projects/${next.detailSlug}`} className="entry-nav-link">
                  {next.name} &raquo;
                </Link>
              ) : (
                <span className="entry-nav-empty">last project &raquo;</span>
              )}
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
}
