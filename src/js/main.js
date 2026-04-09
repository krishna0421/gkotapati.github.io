import '../styles/main.scss';

const projects = [
    {
        title: 'Portfolio',
        description: 'Static site built with Webpack, SCSS, and vanilla JS for smooth UX.',
        stack: ['Webpack', 'SCSS', 'Vanilla JS'],
        links: { demo: '#', repo: 'https://github.com/krishna0421' },
    },
    {
        title: 'API Integration Demo',
        description: 'Lightweight dashboard consuming REST APIs with caching and error states.',
        stack: ['HTML', 'Fetch', 'LocalStorage'],
        links: { demo: '#', repo: '#' },
    },
    {
        title: 'Component Playground',
        description: 'Reusable UI components with accessibility-first patterns.',
        stack: ['ARIA', 'CSS Grid', 'JS Modules'],
        links: { demo: '#', repo: '#' },
    },
];

const skills = [
    'JavaScript',
    'TypeScript',
    'HTML/CSS',
    'SCSS',
    'Webpack',
    'Git/GitHub',
    'Responsive UI',
    'Accessibility',
];

const experience = [
    {
        role: 'Software Developer',
        org: 'Freelance / Personal',
        period: '2023 — Present',
        detail: 'Design and build web experiences focused on performance and usability.',
    },
    {
        role: 'Open Source Contributor',
        org: 'Community',
        period: '2022 — Present',
        detail: 'Fix issues, improve docs, and ship small features in OSS projects.',
    },
];

const byId = (id) => document.getElementById(id);

const renderProjects = () => {
    const grid = byId('projects-grid');
    if (!grid) return;

    grid.innerHTML = projects
        .map(
            (project) => `
            <article class="card">
                <div>
                    <p class="eyebrow">${project.stack.slice(0, 1).join(' • ')}</p>
                    <h3 class="card__title">${project.title}</h3>
                    <p>${project.description}</p>
                </div>
                <div class="card__tags">
                    ${project.stack.map((tag) => `<span>${tag}</span>`).join('')}
                </div>
                <div class="card__links">
                    ${project.links.demo ? `<a href="${project.links.demo}" target="_blank" rel="noreferrer">Demo</a>` : ''}
                    ${project.links.repo ? `<a href="${project.links.repo}" target="_blank" rel="noreferrer">Code</a>` : ''}
                </div>
            </article>
        `
        )
        .join('');
};

const renderSkills = () => {
    const container = byId('skills');
    if (!container) return;
    container.innerHTML = skills.map((skill) => `<span class="pill">${skill}</span>`).join('');
};

const renderExperience = () => {
    const container = byId('experience-list');
    if (!container) return;
    container.innerHTML = experience
        .map(
            (item) => `
            <article class="timeline-item">
                <div class="section__header">
                    <h3 class="card__title">${item.role}</h3>
                    <span class="pill">${item.period}</span>
                </div>
                <p><strong>${item.org}</strong></p>
                <p>${item.detail}</p>
            </article>
        `
        )
        .join('');
};

const setupNav = () => {
    const links = Array.from(document.querySelectorAll('.nav__link'));
    if (!links.length) return;

    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const file = link.getAttribute('data-file');
            if (file) {
                loadSection(link.getAttribute('href').substring(1), file);
            } else {
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const id = entry.target.getAttribute('id');
                links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`));
            });
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: [0, 1] }
    );

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
};

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderSkills();
    renderExperience();
    setupNav();
    loadSection('about', 'about.html');
});