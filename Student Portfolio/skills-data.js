document.addEventListener('DOMContentLoaded', async function () {
  const programmingRoot = document.getElementById('skills-programming-grid');
  const toolsRoot = document.getElementById('skills-tools-grid');
  const db = window.portfolioDb;

  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  function renderProgramming(items) {
    if (!programmingRoot) {
      return;
    }

    if (!Array.isArray(items) || items.length === 0) {
      programmingRoot.innerHTML = '<p>No programming skills found.</p>';
      return;
    }

    programmingRoot.innerHTML = items.map((item) => `
      <div class="skill-item">
        <div class="skill-header">
          <div class="skill-icon">
            <i class="${escapeHtml(item.icon_class || 'fa-solid fa-code')}"></i>
          </div>
          <div class="skill-info">
            <h3>${escapeHtml(item.name)}</h3>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderTools(items) {
    if (!toolsRoot) {
      return;
    }

    if (!Array.isArray(items) || items.length === 0) {
      toolsRoot.innerHTML = '<p>No tools found.</p>';
      return;
    }

    toolsRoot.innerHTML = items.map((item) => `
      <div class="tool-item">
        <div class="tool-icon">
          <i class="${escapeHtml(item.icon_class || 'fa-solid fa-screwdriver-wrench')}"></i>
        </div>
        <div class="tool-info">
          <h4>${escapeHtml(item.name)}</h4>
        </div>
      </div>
    `).join('');
  }

  try {
    const [programming, tools, settings] = await Promise.all([
      db.selectRows({
        table: db.tables.skillsProgramming,
        columns: 'id, name, icon_class, level_order',
        orderBy: [{ column: 'level_order' }, { column: 'id' }]
      }),
      db.selectRows({
        table: db.tables.skillsTools,
        columns: 'id, name, icon_class, level_order',
        orderBy: [{ column: 'level_order' }, { column: 'id' }]
      }),
      db.selectSingle({
        table: db.tables.skillsSettings,
        columns: 'id, github_username, level_order',
        orderBy: [{ column: 'level_order' }, { column: 'id' }]
      })
    ]);

    renderProgramming(programming);
    renderTools(tools);

    window.SKILLS_GITHUB_USERNAME = settings && settings.github_username ? settings.github_username : null;
  } catch (error) {
    if (programmingRoot) {
      programmingRoot.innerHTML = `<p>Unable to load programming skills: ${escapeHtml(error.message)}</p>`;
    }
    if (toolsRoot) {
      toolsRoot.innerHTML = `<p>Unable to load tools: ${escapeHtml(error.message)}</p>`;
    }
    window.SKILLS_GITHUB_USERNAME = null;
  }
});
