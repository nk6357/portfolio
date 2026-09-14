import './shared';
import { renderProjects } from './components/project-list';

const projectList = document.querySelector<HTMLElement>('[data-project-list]');
if (projectList) renderProjects(projectList);
