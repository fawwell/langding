const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://enteglcxrtbglcnifdeg.supabase.co';
const supabaseKey = 'sb_publishable_7V0NKNdoGsMlwpR7vuM2BQ_yfH9HpLi';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log('Querying real Supabase database...');
  try {
    const { data, error } = await supabase.from('centers').select('*');
    if (error) {
      console.error('ERROR FETCHING CENTERS:', error);
    } else {
      console.log('SUCCESS! Number of centers found:', data.length);
      console.log('Data returned:', JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.error('CRITICAL ERROR:', e.message);
  }
}

check();
