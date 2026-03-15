(function () {
  const defaultConfig = {
    url: 'https://srcberontfbysvqxwnmv.supabase.co',
    anonKey: '',
    tables: {
      educationGwa: 'education_gwa',
      educationTimeline: 'education_timeline',
      aboutProfile: 'about_profile',
      aboutSocial: 'about_social_links',
      aboutOrganizations: 'about_organizations',
      skillsProgramming: 'skills_programming',
      skillsTools: 'skills_tools',
      skillsSettings: 'skills_settings',
      seminars: 'seminars',
      projects: 'projects'
    }
  };

  const customConfig = window.SUPABASE_CONFIG || {};
  const config = {
    ...defaultConfig,
    ...customConfig,
    tables: {
      ...defaultConfig.tables,
      ...(customConfig.tables || {})
    }
  };

  let clientInstance = null;

  function getClient() {
    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      throw new Error('Supabase library failed to load.');
    }

    if (!config.url || !config.anonKey || config.anonKey === 'YOUR_SUPABASE_ANON_KEY') {
      throw new Error('Supabase is not configured for Live Server. Open supabase-config.js and add your public anon key.');
    }

    if (!clientInstance) {
      clientInstance = window.supabase.createClient(config.url, config.anonKey);
    }

    return clientInstance;
  }

  async function selectRows({ table, columns = '*', orderBy = [], filters = [] }) {
    let query = getClient().from(table).select(columns);

    filters.forEach((filter) => {
      if (filter.operator === 'eq') {
        query = query.eq(filter.column, filter.value);
      }
    });

    orderBy.forEach((order) => {
      query = query.order(order.column, { ascending: order.ascending !== false });
    });

    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  }

  async function selectSingle(options) {
    const rows = await selectRows(options);
    return rows[0] || null;
  }

  window.portfolioDb = {
    config,
    tables: config.tables,
    getClient,
    selectRows,
    selectSingle
  };
})();
