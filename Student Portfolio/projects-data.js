document.addEventListener('DOMContentLoaded', async function () {
  const featuredRoot = document.getElementById('featured-projects-grid');
  const analyticsRoot = document.getElementById('analytics-projects-grid');
  const db = window.portfolioDb;

  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  function renderCard(item) {
    const sourceLink = item.source_url ? `
      <a href="${escapeHtml(item.source_url)}" class="project-link" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-github"></i>
        Source Code
      </a>
    ` : '';

    const demoLink = item.demo_url ? `
      <a href="${escapeHtml(item.demo_url)}" class="project-link live-demo" target="_blank" rel="noopener noreferrer">
        <i class="fas fa-external-link-alt"></i>
        ${escapeHtml(item.demo_label || 'Open Link')}
      </a>
    ` : '';

    return `
      <div class="project-card" data-category="${escapeHtml(item.category || 'general')}">
        <div class="project-image">
          <div class="image-placeholder">
            <i class="${escapeHtml(item.icon_class || 'fas fa-folder-open')}"></i>
          </div>
        </div>
        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title">${escapeHtml(item.title)}</h3>
          </div>
          <div class="project-meta">
            <span class="project-year">${escapeHtml(item.year_text || '')}</span>
          </div>
          <div class="project-links">
            ${sourceLink}
            ${demoLink}
          </div>
        </div>
      </div>
    `;
  }

  try {
    const [featured, analytics] = await Promise.all([
      db.selectRows({
        table: db.tables.projects,
        columns: 'id, section, title, year_text, category, icon_class, source_url, demo_url, demo_label, level_order',
        filters: [{ column: 'section', operator: 'eq', value: 'featured' }],
        orderBy: [{ column: 'level_order' }, { column: 'id' }]
      }),
      db.selectRows({
        table: db.tables.projects,
        columns: 'id, section, title, year_text, category, icon_class, source_url, demo_url, demo_label, level_order',
        filters: [{ column: 'section', operator: 'eq', value: 'analytics' }],
        orderBy: [{ column: 'level_order' }, { column: 'id' }]
      })
    ]);

    if (featuredRoot) {
      featuredRoot.innerHTML = Array.isArray(featured) && featured.length
        ? featured.map(renderCard).join('')
        : '<p>No featured projects found.</p>';
    }

    if (analyticsRoot) {
      analyticsRoot.innerHTML = Array.isArray(analytics) && analytics.length
        ? analytics.map(renderCard).join('')
        : '<p>No analytics activities found.</p>';
    }
  } catch (error) {
    if (featuredRoot) {
      featuredRoot.innerHTML = `<p>Unable to load featured projects: ${escapeHtml(error.message)}</p>`;
    }
    if (analyticsRoot) {
      analyticsRoot.innerHTML = `<p>Unable to load analytics activities: ${escapeHtml(error.message)}</p>`;
    }
  }
});
