
import { createClient } from '@supabase/supabase-client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkReviews() {
  const { data, error } = await supabase
    .from('client_reviews')
    .select('*');

  if (error) {
    console.error('Error:', error);
    return;
  }

  fs.writeFileSync('db_reviews_check.json', JSON.stringify(data, null, 2));
  console.log('Reviews saved to db_reviews_check.json');
}

checkReviews();
