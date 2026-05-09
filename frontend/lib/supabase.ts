import { createClient } from '@supabase/supabase-js'

// 💡 런타임에 환경 변수를 안전하게 가져오는 헬퍼 함수
const getSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
  
  if (!url || !key) return null;
  return createClient(url, key);
};

export const supabase = getSupabaseClient() as any;

// 어드민용 클라이언트 (서버사이드 전용 권장)
export const supabaseAdmin = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) return null;
  return createClient(url, key);
})() as any;