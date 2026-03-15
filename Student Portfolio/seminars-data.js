document.addEventListener('DOMContentLoaded', async function () {
  const timelineRoot = document.getElementById('seminars-timeline');
  const db = window.portfolioDb;

  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  if (!timelineRoot) {
    return;
  }

  try {
    const seminars = await db.selectRows({
      table: db.tables.seminars,
      columns: 'id, title, date_text, institution, marker_class, icon_class, level_order',
      orderBy: [{ column: 'level_order' }, { column: 'id' }]
    });

    if (!Array.isArray(seminars) || seminars.length === 0) {
      timelineRoot.innerHTML = '<p>No seminars found.</p>';
      return;
    }

    timelineRoot.innerHTML = seminars.map((item) => `
      <div class="timeline-item">
        <div class="timeline-marker">
          <div class="marker-icon ${escapeHtml(item.marker_class || '')}"><i class="${escapeHtml(item.icon_class || 'fas fa-chalkboard-teacher')}"></i></div>
          <div class="timeline-line"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h3>${escapeHtml(item.title)}</h3>
            <span class="timeline-date">${escapeHtml(item.date_text)}</span>
          </div>
          <div class="timeline-institution">${escapeHtml(item.institution)}</div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    timelineRoot.innerHTML = `<p>Unable to load seminars: ${escapeHtml(error.message)}</p>`;
  }
});
