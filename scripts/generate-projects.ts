import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

interface ProjectDraft {
  title?: string;
  url?: string;
  description?: string;
}

export interface Project {
  id: number;
  title: string;
  url: string;
  description?: string;
}

const root = resolve(import.meta.dirname, '..');
const projectsDirectory = resolve(root, 'projects');
const outputDirectory = resolve(root, 'src', 'generated');
const outputFile = resolve(outputDirectory, 'projects.json');
const filePattern = /^(nazv|link|opis)(\d+)\.txt$/;

function isSafeUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && Boolean(url.hostname);
  } catch {
    return false;
  }
}

async function generate(): Promise<void> {
  const entries = await readdir(projectsDirectory, { withFileTypes: true });
  const drafts = new Map<number, ProjectDraft>();

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const match = filePattern.exec(entry.name);
    if (!match) continue;

    const [, kind, rawId] = match;
    if (!kind || !rawId) continue;
    const id = Number(rawId);
    if (!Number.isSafeInteger(id) || id < 0) {
      console.warn(`[projects] Skipping ${entry.name}: ID must be a non-negative safe integer`);
      continue;
    }

    const value = (await readFile(resolve(projectsDirectory, entry.name), 'utf8')).trim();
    const draft = drafts.get(id) ?? {};
    if (kind === 'nazv') draft.title = value;
    if (kind === 'link') draft.url = value;
    if (kind === 'opis') draft.description = value;
    drafts.set(id, draft);
  }

  const projects: Project[] = [];
  for (const [id, draft] of [...drafts.entries()].sort(([a], [b]) => b - a)) {
    if (!draft.title) {
      console.warn(`[projects] Skipping project ${id}: nazv${id}.txt is missing or empty`);
      continue;
    }
    if (!draft.url) {
      console.warn(`[projects] Skipping project ${id}: link${id}.txt is missing or empty`);
      continue;
    }
    if (!isSafeUrl(draft.url)) {
      console.warn(`[projects] Skipping project ${id}: link${id}.txt must contain a valid HTTPS URL`);
      continue;
    }

    const project: Project = { id, title: draft.title, url: draft.url };
    if (draft.description) {
      project.description = draft.description;
    } else {
      console.info(`[projects] Project ${id} has no description — continuing`);
    }
    projects.push(project);
  }

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(projects, null, 2)}\n`, 'utf8');
  console.info(`[projects] Found ${projects.length} valid project${projects.length === 1 ? '' : 's'}`);
  console.info('[projects] Generated src/generated/projects.json');
}

generate().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[projects] Generation failed: ${message}`);
  process.exitCode = 1;
});
