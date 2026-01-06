#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Error: set SUPABASE_URL and SUPABASE_SERVICE_KEY (or SUPABASE_SERVICE_ROLE_KEY) in env');
  process.exit(1);
}

const dataPath = path.resolve(process.cwd(), 'scripts/seed-data.json');
const raw = fs.readFileSync(dataPath, 'utf8');
const accounts = JSON.parse(raw);

const isUUID = (v) => !!v && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);

const payload = accounts.map(a => ({
  id: a.id,
  name: a.name,
  industry: a.industry,
  size: a.size,
  churn_risk: a.churnRisk,
  health_score: a.healthScore,
  // Only set rep_id when it's a valid UUID; otherwise set null so DB won't reject
  rep_id: isUUID(a.repId) ? a.repId : null,
  aum: a.aum,
  risk_category: a.riskCategory,
  last_checkup: a.lastCheckup,
  needs_checkup: a.needsCheckup,
  onboarding_progress: a.onboardingProgress,
  // If your DB uses JSONB, store onboarding_steps as JSON. If not, remove this field.
  onboarding_steps: a.onboardingSteps
}));

console.log('Seeding accounts to', SUPABASE_URL, 'with', payload.length, 'records');

const res = await fetch(`${SUPABASE_URL}/rest/v1/accounts?on_conflict=id`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`
  },
  body: JSON.stringify(payload)
});

const text = await res.text();
if (!res.ok) {
  console.error('Seed failed:', res.status, text);
  process.exit(1);
}

console.log('Seed successful:', text);
