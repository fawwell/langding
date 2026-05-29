const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

let supabaseUrl = 'https://placeholder.supabase.co';
let supabaseAnonKey = 'placeholder';

// Manually parse .env.local if it exists
if (fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    const matchUrl = line.match(/^\s*NEXT_PUBLIC_SUPABASE_URL\s*=\s*(.*)\s*$/);
    const matchKey = line.match(/^\s*NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY\s*=\s*(.*)\s*$/);
    if (matchUrl) supabaseUrl = matchUrl[1].replace(/['"\r]/g, '').trim();
    if (matchKey) supabaseAnonKey = matchKey[1].replace(/['"\r]/g, '').trim();
  }
}

console.log('Supabase URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function dump() {
  const results = {};
  
  // Dump client_reviews
  try {
    const { data, error } = await supabase.from('client_reviews').select('*');
    if (!error) results.client_reviews = data;
    else results.client_reviews_error = error;
  } catch (e) {
    results.client_reviews_error = e.message;
  }

  // Dump media_reports
  try {
    const { data, error } = await supabase.from('media_reports').select('*');
    if (!error) results.media_reports = data;
    else results.media_reports_error = error;
  } catch (e) {
    results.media_reports_error = e.message;
  }

  // Dump centers
  try {
    const { data, error } = await supabase.from('centers').select('*');
    if (!error) results.centers = data;
    else results.centers_error = error;
  } catch (e) {
    results.centers_error = e.message;
  }

  // Dump coaches
  try {
    const { data, error } = await supabase.from('coaches').select('*');
    if (!error) results.coaches = data;
    else results.coaches_error = error;
  } catch (e) {
    results.coaches_error = e.message;
  }

  fs.writeFileSync('scratch/db_dump.json', JSON.stringify(results, null, 2));
  console.log('Database dumped to scratch/db_dump.json');
}

dump();
