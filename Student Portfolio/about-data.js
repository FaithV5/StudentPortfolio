document.addEventListener('DOMContentLoaded', async function () {
  const aboutRoot = document.getElementById('about-content-dynamic');
  const orgRoot = document.getElementById('org-grid-dynamic');
  const profileImg = document.querySelector('.profile-img');
  const db = window.portfolioDb;

  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  function renderProfile(profile, links) {
    if (!aboutRoot || !profile) {
      return;
    }

    const socialLinks = (Array.isArray(links) ? links : []).map((link) => `
      <a href="${escapeHtml(link.url)}" title="${escapeHtml(link.label)}" class="social-link" target="_blank" rel="noopener noreferrer">
        <i class="${escapeHtml(link.icon_class || 'fa-solid fa-link')}"></i>
        <span class="social-label">${escapeHtml(link.label)}</span>
      </a>
    `).join('');

    aboutRoot.innerHTML = `
      <h1 class="greeting">${escapeHtml(profile.greeting_prefix || "Hi, I'm")} <span class="highlight">${escapeHtml(profile.full_name)}</span></h1>
      <p class="quote">"${escapeHtml(profile.role_quote || '')}"</p>
      <div class="about-text">
        <p>${escapeHtml(profile.intro_text || '')}</p>
      </div>

      <div class="contact-info">
        <div class="contact-grid">
          <div class="contact-item">
            <i class="fa-solid fa-house"></i>
            <div>
              <strong>Address:</strong>
              <span>${escapeHtml(profile.address || '')}</span>
            </div>
          </div>
          <div class="contact-item">
            <i class="fa-solid fa-calendar"></i>
            <div>
              <strong>Birthday:</strong>
              <span>${escapeHtml(profile.birthday || '')}</span>
            </div>
          </div>
          <div class="contact-item">
            <i class="fa-solid fa-location-dot"></i>
            <div>
              <strong>Birth Place:</strong>
              <span>${escapeHtml(profile.birth_place || '')}</span>
            </div>
          </div>
          <div class="contact-item">
            <i class="fa-solid fa-phone"></i>
            <div>
              <strong>Contact Number:</strong>
              <span>${escapeHtml(profile.contact_number || '')}</span>
            </div>
          </div>
          <div class="contact-item">
            <i class="fa-solid fa-circle"></i>
            <div>
              <strong>Civil Status:</strong>
              <span>${escapeHtml(profile.civil_status || '')}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="social-section">
        <p class="social-title">Check me on:</p>
        <div class="social-icons">${socialLinks}</div>
      </div>
    `;

    if (profileImg && profile.profile_image) {
      profileImg.src = profile.profile_image;
    }
  }

  function renderOrganizations(organizations) {
    if (!orgRoot) {
      return;
    }

    if (!Array.isArray(organizations) || organizations.length === 0) {
      orgRoot.innerHTML = '<p>No organizations found.</p>';
      return;
    }

    orgRoot.innerHTML = organizations.map((org) => `
      <div class="org-card">
        <h3>${escapeHtml(org.organization_name)}</h3>
        <p><strong>Year:</strong> ${escapeHtml(org.year_text || '')}</p>
        <p><strong>Position:</strong> ${escapeHtml(org.position_text || '')}</p>
      </div>
    `).join('');
  }

  try {
    const [profile, links, organizations] = await Promise.all([
      db.selectSingle({
        table: db.tables.aboutProfile,
        columns: 'id, full_name, greeting_prefix, role_quote, intro_text, address, birthday, birth_place, contact_number, civil_status, profile_image, level_order',
        orderBy: [{ column: 'level_order' }, { column: 'id' }]
      }),
      db.selectRows({
        table: db.tables.aboutSocial,
        columns: 'id, label, url, icon_class, level_order',
        orderBy: [{ column: 'level_order' }, { column: 'id' }]
      }),
      db.selectRows({
        table: db.tables.aboutOrganizations,
        columns: 'id, organization_name, year_text, position_text, level_order',
        orderBy: [{ column: 'level_order' }, { column: 'id' }]
      })
    ]);

    renderProfile(profile, links);
    renderOrganizations(organizations);
  } catch (error) {
    if (aboutRoot) {
      aboutRoot.innerHTML = `<p>Unable to load profile details: ${escapeHtml(error.message)}</p>`;
    }
    if (orgRoot) {
      orgRoot.innerHTML = `<p>Unable to load organizations: ${escapeHtml(error.message)}</p>`;
    }
  }
});
