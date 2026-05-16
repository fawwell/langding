import { createClient } from '@supabase/supabase-js'

// 💡 익명 접근용 (클라이언트 사용 가능)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

// 🔒 관리자용 (절대 클라이언트 측에서 호출하지 말 것)
// NEXT_PUBLIC_ 접두사가 없는 환경 변수는 서버 측에서만 접근 가능합니다.
// supabaseAdmin은 API routes나 Server Components에서만 별도로 생성하여 사용하십시오.