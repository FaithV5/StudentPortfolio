// =========================================================
// STUDENT PORTFOLIO APP
// Static data version - No Supabase / No Database
// =========================================================


// =========================================================
// BASIC HELPERS
// =========================================================

const body = document.body;
const themeToggle = document.getElementById('theme-toggle');


// Safely escape text before putting it into HTML
const escapeHtml = (value) => {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
};


// =========================================================
// THEME
// =========================================================

const savedTheme =
    localStorage.getItem('theme') ||
    (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
    );


if (savedTheme === 'dark') {

    body.classList.add('dark-mode');

    if (themeToggle) {
        themeToggle.checked = true;
    }
}


// =========================================================
// SKY BACKGROUND
// =========================================================

const refreshSkyElements = () => {

    const sky = document.querySelector('.sky');

    if (!sky) return;

    sky.innerHTML = '';


    // LIGHT MODE - CLOUDS
    if (!body.classList.contains('dark-mode')) {

        for (let i = 0; i < 5; i++) {

            const cloud = document.createElement('div');

            cloud.classList.add('cloud');

            cloud.style.top =
                `${Math.random() * 50}%`;

            cloud.style.left =
                `${Math.random() * 100}%`;

            cloud.style.width =
                `${100 + Math.random() * 150}px`;

            cloud.style.height =
                `${60 + Math.random() * 40}px`;

            cloud.style.animationDuration =
                `${30 + Math.random() * 30}s`;

            cloud.style.animationDelay =
                `-${Math.random() * 30}s`;

            sky.appendChild(cloud);
        }

    }

    // DARK MODE - STARS
    else {

        for (let i = 0; i < 100; i++) {

            const star = document.createElement('div');

            star.classList.add('star');

            star.style.top =
                `${Math.random() * 100}%`;

            star.style.left =
                `${Math.random() * 100}%`;

            star.style.animationDelay =
                `${Math.random() * 5}s`;

            star.style.animationDuration =
                `${2 + Math.random() * 3}s`;

            sky.appendChild(star);
        }
    }
};


refreshSkyElements();


// =========================================================
// THEME TOGGLE
// =========================================================

if (themeToggle) {

    themeToggle.addEventListener('change', function () {

        if (this.checked) {

            body.classList.add('dark-mode');

            localStorage.setItem('theme', 'dark');

        } else {

            body.classList.remove('dark-mode');

            localStorage.setItem('theme', 'light');
        }

        refreshSkyElements();
    });
}


// =========================================================
// MOBILE NAVIGATION
// =========================================================

const hamburger =
    document.getElementById('hamburger');

const navMenu =
    document.getElementById('nav-menu');


if (hamburger && navMenu) {

    hamburger.addEventListener('click', function () {

        hamburger.classList.toggle('active');

        navMenu.classList.toggle('active');

    });


    document.querySelectorAll('.nav-link').forEach(link => {

        link.addEventListener('click', () => {

            hamburger.classList.remove('active');

            navMenu.classList.remove('active');

        });

    });


    document.addEventListener('click', (event) => {

        const isClickInsideNav =
            navMenu.contains(event.target) ||
            hamburger.contains(event.target);

        if (
            !isClickInsideNav &&
            navMenu.classList.contains('active')
        ) {

            hamburger.classList.remove('active');

            navMenu.classList.remove('active');
        }

    });
}


// =========================================================
// ABOUT PAGE
// =========================================================

const renderAbout = () => {

    const profile = portfolioData.profile;

    if (!profile) return;


    const aboutRoot =
        document.getElementById('about-content-dynamic');


    if (aboutRoot) {

        aboutRoot.innerHTML = `

            <div class="greeting">
                ${escapeHtml(profile.greeting_prefix)}
                <span class="highlight">
                    ${escapeHtml(profile.full_name)}
                </span>
            </div>

            <div class="quote">
                ${escapeHtml(profile.role_quote)}
            </div>

            <div class="about-text">
                <p>
                    ${escapeHtml(profile.intro_text)}
                </p>
            </div>

            <div class="contact-grid">

                <div class="contact-item">

                    <i class="fa-solid fa-location-dot"></i>

                    <div>
                        <strong>Location</strong>
                        <span>
                            ${escapeHtml(profile.address)}
                        </span>
                    </div>

                </div>


                <div class="contact-item">

                    <i class="fa-solid fa-cake-candles"></i>

                    <div>
                        <strong>Birthday</strong>
                        <span>
                            ${escapeHtml(profile.birthday)}
                        </span>
                    </div>

                </div>


                <div class="contact-item">

                    <i class="fa-solid fa-hospital"></i>

                    <div>
                        <strong>Birth Place</strong>
                        <span>
                            ${escapeHtml(profile.birth_place)}
                        </span>
                    </div>

                </div>


                <div class="contact-item">

                    <i class="fa-solid fa-phone"></i>

                    <div>
                        <strong>Contact</strong>
                        <span>
                            0${escapeHtml(profile.contact_number)}
                        </span>
                    </div>

                </div>


                <div class="contact-item">

                    <i class="fa-solid fa-heart"></i>

                    <div>
                        <strong>Civil Status</strong>
                        <span>
                            ${escapeHtml(profile.civil_status)}
                        </span>
                    </div>

                </div>

            </div>


            <div class="social-section">

                <div class="social-title">
                    Connect with me
                </div>

                <div class="social-icons">

                    ${portfolioData.socialLinks
                        .map(link => `

                            <a
                                href="${escapeHtml(link.url)}"
                                class="social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="${escapeHtml(link.label)}"
                            >

                                <i class="${escapeHtml(link.icon_class)}"></i>

                                <span class="social-label">
                                    ${escapeHtml(link.label)}
                                </span>

                            </a>

                        `)
                        .join('')}

                </div>

            </div>
        `;
    }


    // ORGANIZATIONS

    const organizationRoot =
        document.getElementById('org-grid-dynamic');


    if (organizationRoot) {

        const organizations =
            portfolioData.organizations || [];


        if (organizations.length === 0) {

            organizationRoot.innerHTML =
                '<p>No organizations found.</p>';

            return;
        }


        organizationRoot.innerHTML =
            organizations
                .sort((a, b) =>
                    a.level_order - b.level_order
                )
                .map(org => `

                    <div class="org-card">

                        <h3>
                            ${escapeHtml(
                                org.organization_name
                            )}
                        </h3>

                        <p>
                            <strong>
                                ${escapeHtml(
                                    org.year_text
                                )}
                            </strong>
                        </p>

                        <p>
                            ${escapeHtml(
                                org.position_text
                            ).replaceAll(
                                '|',
                                '<br>'
                            )}
                        </p>

                    </div>

                `)
                .join('');
    }
};


// =========================================================
// EDUCATION
// =========================================================

const renderEducation = () => {

    const education =
        portfolioData.education;


    if (!education) return;


    // -----------------------------
    // GWA
    // -----------------------------

    const gwaRoot =
        document.getElementById('gwa-grid');


    if (gwaRoot) {

        const gwa =
            education.gwa || [];


        if (gwa.length === 0) {

            gwaRoot.innerHTML =
                '<p>No academic records found.</p>';

        } else {

            gwaRoot.innerHTML =
                gwa
                    .sort((a, b) =>
                        a.level_order - b.level_order
                    )
                    .map(item => {

                        const isSchool =
                            item.label === 'JHS' ||
                            item.label === 'SHS';


                        const rankText =
                            item.rank !== null &&
                            item.rank !== undefined
                                ? `Rank #${item.rank}`
                                : '';


                        const honorText =
                            item.honor
                                ? item.honor
                                : '';


                        return `

                            <div class="gwa-card">

                                <span class="gwa-semester">
                                    ${escapeHtml(
                                        item.label
                                    )}
                                </span>

                                <h3>
                                    ${escapeHtml(
                                        item.gwa
                                    )}
                                </h3>

                                <p>
                                    ${
                                        isSchool
                                            ? 'General Average'
                                            : 'GWA'
                                    }
                                </p>

                                ${
                                    honorText
                                        ? `
                                            <span class="gwa-rank">
                                                ${escapeHtml(
                                                    honorText
                                                )}
                                            </span>
                                        `
                                        : ''
                                }

                                ${
                                    rankText
                                        ? `
                                            <span class="gwa-rank">
                                                ${escapeHtml(
                                                    rankText
                                                )}
                                            </span>
                                        `
                                        : ''
                                }

                            </div>

                        `;
                    })
                    .join('');
        }
    }


    // -----------------------------
    // EDUCATION ANALYTICS
    // -----------------------------

    const gwaChartCanvas =
        document.getElementById('gwa-chart');

    const rankingChartCanvas =
        document.getElementById('ranking-chart');

    const collegeRecords =
        (education.gwa || [])
            .filter(item =>
                item.label !== 'JHS' &&
                item.label !== 'SHS'
            )
            .sort((a, b) =>
                a.level_order - b.level_order
            );


    if (
        window.Chart &&
        gwaChartCanvas &&
        rankingChartCanvas &&
        collegeRecords.length > 0
    ) {

        const labels = collegeRecords.map(item => item.label);
        const gwaValues = collegeRecords.map(item => item.gwa);
        const rankingValues = collegeRecords.map(item => item.rank);

        new Chart(gwaChartCanvas, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'GWA',
                    data: gwaValues,
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.14)',
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#0ea5e9',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    borderWidth: 3,
                    tension: 0.35,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        reverse: true,
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'GWA'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 35,
                            minRotation: 35
                        }
                    }
                }
            }
        });

        new Chart(rankingChartCanvas, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Rank',
                    data: rankingValues,
                    borderColor: '#a78bfa',
                    backgroundColor: 'rgba(167, 139, 250, 0.14)',
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#a78bfa',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    borderWidth: 3,
                    tension: 0.35,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        reverse: true,
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: 'Rank'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 35,
                            minRotation: 35
                        }
                    }
                }
            }
        });
    }


    // -----------------------------
    // EDUCATION TIMELINE
    // -----------------------------

    const timelineRoot =
        document.getElementById(
            'education-timeline'
        );


    if (timelineRoot) {

        const timeline =
            education.timeline || [];


        if (timeline.length === 0) {

            timelineRoot.innerHTML =
                '<p>No education records found.</p>';

        } else {

            timelineRoot.innerHTML =
                timeline
                    .sort((a, b) =>
                        a.level_order - b.level_order
                    )
                    .map(item => `

                        <div class="timeline-item">

                            <div class="timeline-dot"></div>

                            <div class="timeline-content">

                                <span class="timeline-date">
                                    ${escapeHtml(
                                        item.date_range
                                    )}
                                </span>

                                <h3>
                                    ${escapeHtml(
                                        item.title
                                    )}
                                </h3>

                                <h4>
                                    ${escapeHtml(
                                        item.institution
                                    )}
                                </h4>

                                <p>
                                    ${escapeHtml(
                                        item.role
                                    )}
                                </p>

                            </div>

                        </div>

                    `)
                    .join('');
        }
    }
};


// =========================================================
// SKILLS
// =========================================================

const renderSkills = () => {

    const skills =
        portfolioData.skills;


    if (!skills) return;


    // -----------------------------
    // PROGRAMMING LANGUAGES
    // -----------------------------

    const programmingRoot =
        document.getElementById(
            'skills-programming-grid'
        );


    if (programmingRoot) {

        const programming =
            skills.programming || [];


        programmingRoot.innerHTML =
            programming
                .sort((a, b) =>
                    a.level_order - b.level_order
                )
                .map(skill => `

                    <div class="skill-item">

                        <div class="skill-header">

                            <div class="skill-icon">

                                <i class="${escapeHtml(
                                    skill.icon_class
                                )}"></i>

                            </div>

                            <div class="skill-info">

                                <h3>
                                    ${escapeHtml(
                                        skill.name
                                    )}
                                </h3>

                            </div>

                        </div>

                    </div>

                `)
                .join('');
    }


    // -----------------------------
    // REPOSITORY LANGUAGE ANALYTICS
    // -----------------------------

    const languageChartCanvas =
        document.getElementById(
            'repository-language-chart'
        );

    const repositoryLanguages =
        (skills.repositoryLanguages || [])
            .slice()
            .sort((a, b) =>
                b.repository_count - a.repository_count
            )
            .slice(0, 5);


    if (
        window.Chart &&
        languageChartCanvas &&
        repositoryLanguages.length > 0
    ) {

        new Chart(languageChartCanvas, {
            type: 'pie',
            data: {
                labels: repositoryLanguages.map(
                    language => language.name
                ),
                datasets: [{
                    data: repositoryLanguages.map(
                        language => language.repository_count
                    ),
                    backgroundColor: [
                        '#2563eb',
                        '#06b6d4',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position:
                            window.innerWidth <= 600
                                ? 'bottom'
                                : 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 18
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: context =>
                                `${context.label}: ${context.raw} repositories`
                        }
                    }
                }
            }
        });
    }


    // -----------------------------
    // TOOLS
    // -----------------------------

    const toolsRoot =
        document.getElementById(
            'skills-tools-grid'
        );


    if (toolsRoot) {

        const tools =
            skills.tools || [];


        toolsRoot.innerHTML =
            tools
                .sort((a, b) =>
                    a.level_order - b.level_order
                )
                .map(tool => `

                    <div class="tool-item">

                        <div class="tool-icon">

                            <i class="${escapeHtml(
                                tool.icon_class
                            )}"></i>

                        </div>

                        <div class="tool-info">

                            <h4>
                                ${escapeHtml(
                                    tool.name
                                )}
                            </h4>

                        </div>

                    </div>

                `)
                .join('');
    }
};


// =========================================================
// SEMINARS
// =========================================================

const renderSeminars = () => {

    const timelineRoot =
        document.getElementById(
            'seminars-timeline'
        );


    if (!timelineRoot) return;


    const seminars =
        portfolioData.seminars || [];


    if (seminars.length === 0) {

        timelineRoot.innerHTML =
            '<p>No seminars found.</p>';

        return;
    }


    timelineRoot.innerHTML =
        seminars
            .sort((a, b) =>
                a.level_order - b.level_order
            )
            .map(item => `

                <div class="timeline-item">

                    <div class="timeline-dot"></div>

                    <div class="timeline-content">

                        <span class="timeline-date">
                            ${escapeHtml(
                                item.date_text
                            )}
                        </span>

                        <h3>
                            ${escapeHtml(
                                item.title
                            )}
                        </h3>

                        <p>
                            ${escapeHtml(
                                item.institution
                            )}
                        </p>

                    </div>

                </div>

            `)
            .join('');
};


// =========================================================
// PROJECTS
// =========================================================

const renderProjects = () => {

    const featuredRoot =
        document.getElementById(
            'featured-projects'
        );


    const analyticsRoot =
        document.getElementById(
            'analytics-projects'
        );


    const projects =
        portfolioData.projects || [];


    // -----------------------------
    // PROJECT ROW
    // -----------------------------

    const createProjectRow = (project) => {

        let actions = '';


        // GitHub button

        if (project.source_url) {

            actions += `

                <a
                    href="${escapeHtml(
                        project.source_url
                    )}"
                    class="project-action github-action"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Source Code"
                >

                    <i class="fa-brands fa-github"></i>

                    <span class="action-label">
                        GitHub
                    </span>

                </a>

            `;
        }


        // Demo / APK / Folder button

        if (project.demo_url) {

            actions += `

                <a
                    href="${escapeHtml(
                        project.demo_url
                    )}"
                    class="project-action demo-action"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="${escapeHtml(
                        project.demo_label ||
                        'Open Project'
                    )}"
                >

                    <i class="fas fa-external-link-alt"></i>

                    <span class="action-label">
                        ${escapeHtml(
                            project.demo_label ||
                            'Open'
                        )}
                    </span>

                </a>

            `;
        }


        if (!actions) {

            actions = `
                <span class="project-no-link">
                    No link available
                </span>
            `;
        }


        return `

            <div class="project-row">

                <div class="project-name-container">

                    <h3 class="project-name">
                        ${escapeHtml(
                            project.title
                        )}
                    </h3>

                </div>


                <div class="project-year">

                    ${escapeHtml(
                        project.year_text
                    )}

                </div>


                <div class="project-actions">

                    ${actions}

                </div>

            </div>

        `;
    };


    // -----------------------------
    // FEATURED
    // -----------------------------

    if (featuredRoot) {

        const featured =
            projects
                .filter(project =>
                    project.section === 'featured'
                )
                .sort((a, b) =>
                    a.level_order - b.level_order
                );


        if (featured.length === 0) {

            featuredRoot.innerHTML =
                '<p>No featured projects found.</p>';

        } else {

            featuredRoot.innerHTML =
                featured
                    .map(createProjectRow)
                    .join('');
        }
    }


    // -----------------------------
    // ANALYTICS
    // -----------------------------

    if (analyticsRoot) {

        const analytics =
            projects
                .filter(project =>
                    project.section === 'analytics'
                )
                .sort((a, b) =>
                    a.level_order - b.level_order
                );


        if (analytics.length === 0) {

            analyticsRoot.innerHTML =
                '<p>No analytics activities found.</p>';

        } else {

            analyticsRoot.innerHTML =
                analytics
                    .map(createProjectRow)
                    .join('');
        }
    }
};


// =========================================================
// SKILL BAR ANIMATION
// =========================================================

const animateSkillBars = () => {

    const skillBars =
        document.querySelectorAll('.skill-fill');


    if (skillBars.length === 0) return;


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const percent =
                            entry.target.getAttribute(
                                'data-percent'
                            );


                        if (percent) {

                            entry.target.style.width =
                                `${percent}%`;
                        }


                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    skillBars.forEach(bar => {

        observer.observe(bar);

    });
};


// =========================================================
// ACTIVE NAVIGATION
// =========================================================

const setActiveNavigation = () => {

    let currentPage =
        window.location.pathname
            .split('/')
            .pop();


    if (!currentPage) {

        currentPage = 'index.html';
    }


    document.querySelectorAll('.nav-link')
        .forEach(link => {

            link.classList.remove('active');


            const href =
                link.getAttribute('href');


            if (href === currentPage) {

                link.classList.add('active');
            }

        });
};


// =========================================================
// FOOTER YEAR
// =========================================================

const updateFooterYear = () => {

    const yearElements =
        document.querySelectorAll(
            '#footer-year'
        );


    const currentYear =
        new Date().getFullYear();


    yearElements.forEach(element => {

        element.textContent =
            currentYear;

    });
};


// =========================================================
// INITIALIZE ALL PAGES
// =========================================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        // Render page data

        renderAbout();

        renderEducation();

        renderSkills();

        renderSeminars();

        renderProjects();


        // Other website functions

        animateSkillBars();

        setActiveNavigation();

        updateFooterYear();

    }
);