document.addEventListener('DOMContentLoaded', async function () {
  const gwaGrid = document.getElementById('gwa-grid');
  const timelineRoot = document.getElementById('education-timeline');
  const db = window.portfolioDb;

  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  const iconMap = {
    college: 'graduation-cap',
    school: 'school',
    junior: 'book',
    elementary: 'pencil-alt'
  };

  function buildGwaCard(record) {
    const label = escapeHtml(record.label);
    const gwa = Number(record.gwa);
    const hasRank = Number.isFinite(Number(record.rank));
    const honor = record.honor ? `<div class="gwa-honor">${escapeHtml(record.honor)}</div>` : '';
    const rank = hasRank ? `<div class="gwa-rank">Rank: ${Number(record.rank)}</div>` : '';
    const gwaDisplay = Number.isFinite(gwa) ? gwa : '';

    return `
      <div class="gwa-card" data-label="${label}" data-gwa="${gwaDisplay}" ${hasRank ? `data-rank="${Number(record.rank)}"` : ''}>
        <div class="gwa-label">${label}</div>
        <div class="gwa-value">${gwaDisplay}</div>
        ${rank}
        ${honor}
      </div>
    `;
  }

  function buildTimelineItem(record) {
    const iconKey = String(record.icon || '').toLowerCase();
    const iconName = iconMap[iconKey] || 'graduation-cap';
    const roleBlock = record.role ? `<div class="timeline-role">${escapeHtml(record.role)}</div>` : '';

    return `
      <div class="timeline-item">
        <div class="timeline-marker">
          <div class="marker-icon">
            <i class="fas fa-${iconName}"></i>
          </div>
          <div class="timeline-line"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h3>${escapeHtml(record.title)}</h3>
            <span class="timeline-date">${escapeHtml(record.date_range)}</span>
          </div>
          <div class="timeline-institution">${escapeHtml(record.institution)}</div>
          ${roleBlock}
        </div>
      </div>
    `;
  }

  try {
    const [gwaRecords, timelineRecords] = await Promise.all([
      db.selectRows({
        table: db.tables.educationGwa,
        columns: 'id, label, gwa, rank, honor, level_order',
        orderBy: [{ column: 'level_order' }, { column: 'id' }]
      }),
      db.selectRows({
        table: db.tables.educationTimeline,
        columns: 'id, title, date_range, institution, role, icon, level_order',
        orderBy: [{ column: 'level_order' }, { column: 'id' }]
      })
    ]);

    if (gwaGrid) {
      if (Array.isArray(gwaRecords) && gwaRecords.length > 0) {
        gwaGrid.innerHTML = gwaRecords.map(buildGwaCard).join('');
      } else {
        gwaGrid.innerHTML = '<p>No academic records found in Supabase.</p>';
      }
    }

    if (timelineRoot) {
      if (Array.isArray(timelineRecords) && timelineRecords.length > 0) {
        timelineRoot.innerHTML = timelineRecords.map(buildTimelineItem).join('');
      } else {
        timelineRoot.innerHTML = '<p>No education timeline records found in Supabase.</p>';
      }
    }
  } catch (error) {
    if (gwaGrid) {
      gwaGrid.innerHTML = `<p>Unable to load academic records: ${escapeHtml(error.message)}</p>`;
    }
    if (timelineRoot) {
      timelineRoot.innerHTML = `<p>Unable to load education timeline: ${escapeHtml(error.message)}</p>`;
    }
  }

  const gwaCards = Array.from(document.querySelectorAll('.gwa-card'));
  const labels = [];
  const gwaData = [];
  const rankingData = [];
  const chartLabels = [];
  const chartGwaData = [];
  const chartRankingData = [];

  gwaCards.forEach((card) => {
    const label = card.getAttribute('data-label') || (card.querySelector('.gwa-value') && card.querySelector('.gwa-value').textContent) || 'GWA';
    const gwa = parseFloat(card.getAttribute('data-gwa'));
    const rankAttr = card.getAttribute('data-rank');
    labels.push(label);
    gwaData.push(Number.isFinite(gwa) ? gwa : NaN);

    if (rankAttr !== null) {
      const r = parseInt(rankAttr, 10);
      if (Number.isFinite(r)) {
        rankingData.push(r);
      }
    }

    const isSchoolLevel = /SHS|JHS/i.test(label);
    const isLargeValue = Number.isFinite(gwa) && gwa > 10;
    if (!isSchoolLevel && !isLargeValue) {
      chartLabels.push(label);
      chartGwaData.push(Number.isFinite(gwa) ? gwa : NaN);
      if (rankAttr !== null) {
        const r = parseInt(rankAttr, 10);
        if (Number.isFinite(r)) {
          chartRankingData.push(r);
        }
      }
    }
  });

  const gwaCtx = document.getElementById('gwaChart');
  if (gwaCtx && chartLabels.length > 0) {
    new Chart(gwaCtx.getContext('2d'), {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'GWA',
          data: chartGwaData,
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14,165,233,0.12)',
          tension: 0.3,
          fill: true,
          pointRadius: 4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false, reverse: true } } }
    });
  }

  const rankCtx = document.getElementById('rankingChart');
  if (rankCtx && chartLabels.length > 0) {
    const rankDataset = chartRankingData.length ? chartRankingData : Array(chartLabels.length).fill(null);
    new Chart(rankCtx.getContext('2d'), {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Ranking',
          data: rankDataset,
          borderColor: '#a78bfa',
          backgroundColor: 'rgba(167,139,250,0.12)',
          tension: 0.25,
          fill: true,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, reverse: true, ticks: { stepSize: 1 } } }
      }
    });
  }
});