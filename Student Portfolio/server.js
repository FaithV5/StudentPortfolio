const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const app = express();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

const gwaTable = process.env.SUPABASE_GWA_TABLE || "education_gwa";
const timelineTable = process.env.SUPABASE_TIMELINE_TABLE || "education_timeline";
const aboutProfileTable = process.env.SUPABASE_ABOUT_PROFILE_TABLE || "about_profile";
const aboutSocialTable = process.env.SUPABASE_ABOUT_SOCIAL_TABLE || "about_social_links";
const aboutOrgTable = process.env.SUPABASE_ABOUT_ORG_TABLE || "about_organizations";
const skillsProgrammingTable = process.env.SUPABASE_SKILLS_PROGRAMMING_TABLE || "skills_programming";
const skillsToolsTable = process.env.SUPABASE_SKILLS_TOOLS_TABLE || "skills_tools";
const skillsSettingsTable = process.env.SUPABASE_SKILLS_SETTINGS_TABLE || "skills_settings";
const seminarsTable = process.env.SUPABASE_SEMINARS_TABLE || "seminars";
const projectsTable = process.env.SUPABASE_PROJECTS_TABLE || "projects";

app.use(express.static(__dirname));
app.use(express.json());

function requireSupabase(res) {
  if (!supabase) {
    res.status(500).json({
      error: "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your environment."
    });
    return false;
  }

  return true;
}

async function fetchRows({ res, table, select, orderBy = [] }) {
  let query = supabase.from(table).select(select);

  orderBy.forEach((item) => {
    query = query.order(item.column, { ascending: item.ascending !== false });
  });

  const { data, error } = await query;

  if (error) {
    res.status(500).json({
      error: `Failed to fetch records from ${table}.`,
      details: error.message,
      table
    });
    return null;
  }

  return data || [];
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    supabaseConfigured: Boolean(supabase)
  });
});

app.get("/api/education/gwa", async (req, res) => {
  if (!requireSupabase(res)) {
    return;
  }

  const { data, error } = await supabase
    .from(gwaTable)
    .select("id, label, gwa, rank, honor, level_order")
    .order("level_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    res.status(500).json({
      error: "Failed to fetch GWA records.",
      details: error.message,
      table: gwaTable
    });
    return;
  }

  res.json(data || []);
});

app.get("/api/education/timeline", async (req, res) => {
  if (!requireSupabase(res)) {
    return;
  }

  const { data, error } = await supabase
    .from(timelineTable)
    .select("id, title, date_range, institution, role, icon, level_order")
    .order("level_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    res.status(500).json({
      error: "Failed to fetch timeline records.",
      details: error.message,
      table: timelineTable
    });
    return;
  }

  res.json(data || []);
});

app.get("/api/about/profile", async (req, res) => {
  if (!requireSupabase(res)) {
    return;
  }

  const rows = await fetchRows({
    res,
    table: aboutProfileTable,
    select: "id, full_name, greeting_prefix, role_quote, intro_text, address, birthday, birth_place, contact_number, civil_status, profile_image, level_order",
    orderBy: [{ column: "level_order" }, { column: "id" }]
  });

  if (!rows) {
    return;
  }

  res.json(rows[0] || null);
});

app.get("/api/about/social-links", async (req, res) => {
  if (!requireSupabase(res)) {
    return;
  }

  const rows = await fetchRows({
    res,
    table: aboutSocialTable,
    select: "id, label, url, icon_class, level_order",
    orderBy: [{ column: "level_order" }, { column: "id" }]
  });

  if (!rows) {
    return;
  }

  res.json(rows);
});

app.get("/api/about/organizations", async (req, res) => {
  if (!requireSupabase(res)) {
    return;
  }

  const rows = await fetchRows({
    res,
    table: aboutOrgTable,
    select: "id, organization_name, year_text, position_text, level_order",
    orderBy: [{ column: "level_order" }, { column: "id" }]
  });

  if (!rows) {
    return;
  }

  res.json(rows);
});

app.get("/api/skills/programming", async (req, res) => {
  if (!requireSupabase(res)) {
    return;
  }

  const rows = await fetchRows({
    res,
    table: skillsProgrammingTable,
    select: "id, name, icon_class, level_order",
    orderBy: [{ column: "level_order" }, { column: "id" }]
  });

  if (!rows) {
    return;
  }

  res.json(rows);
});

app.get("/api/skills/tools", async (req, res) => {
  if (!requireSupabase(res)) {
    return;
  }

  const rows = await fetchRows({
    res,
    table: skillsToolsTable,
    select: "id, name, icon_class, level_order",
    orderBy: [{ column: "level_order" }, { column: "id" }]
  });

  if (!rows) {
    return;
  }

  res.json(rows);
});

app.get("/api/skills/settings", async (req, res) => {
  if (!requireSupabase(res)) {
    return;
  }

  const rows = await fetchRows({
    res,
    table: skillsSettingsTable,
    select: "id, github_username, level_order",
    orderBy: [{ column: "level_order" }, { column: "id" }]
  });

  if (!rows) {
    return;
  }

  res.json(rows[0] || null);
});

app.get("/api/seminars", async (req, res) => {
  if (!requireSupabase(res)) {
    return;
  }

  const rows = await fetchRows({
    res,
    table: seminarsTable,
    select: "id, title, date_text, institution, marker_class, icon_class, level_order",
    orderBy: [{ column: "level_order" }, { column: "id" }]
  });

  if (!rows) {
    return;
  }

  res.json(rows);
});

app.get("/api/projects/:section", async (req, res) => {
  if (!requireSupabase(res)) {
    return;
  }

  const section = req.params.section;
  const { data, error } = await supabase
    .from(projectsTable)
    .select("id, section, title, year_text, category, icon_class, source_url, demo_url, demo_label, level_order")
    .eq("section", section)
    .order("level_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    res.status(500).json({
      error: "Failed to fetch project records.",
      details: error.message,
      table: projectsTable
    });
    return;
  }

  res.json(data || []);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
