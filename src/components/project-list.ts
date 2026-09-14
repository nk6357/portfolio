import projectsData from '../generated/projects.json';
import type { Project } from '../types/project';

const projects = projectsData satisfies Project[];

function createProject(project: Project, position: number): HTMLElement {
  const article = document.createElement('article');
  article.className = 'project-row reveal';
  article.style.setProperty('--reveal-delay', `${Math.min(position * 70, 420)}ms`);

  const number = document.createElement('span');
  number.className = 'project-number';
  number.setAttribute('aria-hidden', 'true');
  number.textContent = String(project.id).padStart(2, '0');

  const content = document.createElement('div');
  content.className = 'project-copy';
  const title = document.createElement('h3');
  title.className = 'project-title';
  title.textContent = project.title;
  content.append(title);

  if (project.description) {
    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.description;
    content.append(description);
  }

  const link = document.createElement('a');
  link.className = 'project-link';
  link.href = project.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `Посмотреть проект «${project.title}» (откроется в новой вкладке)`);
  const label = document.createElement('span');
  label.textContent = 'Посмотреть проект';
  const arrow = document.createElement('span');
  arrow.className = 'project-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  link.append(label, arrow);

  article.append(number, content, link);
  return article;
}

export function renderProjects(container: HTMLElement): void {
  if (projects.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'projects-empty';
    empty.textContent = 'Проекты скоро появятся здесь.';
    container.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  projects.forEach((project, index) => fragment.append(createProject(project, index)));
  container.append(fragment);
}
