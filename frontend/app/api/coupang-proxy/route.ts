import { NextRequest, NextResponse } from 'next/server';

// 쿠팡 페이지를 서버 사이드로 프록시하여:
// 1. X-Frame-Options 헤더 제거 (iframe 차단 해제)
// 2. alert/confirm/prompt 원천 차단 스크립트 주입
// 3. 상대 경로 URL → 절대 경로(coupang.com) 보정

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
        return new NextResponse('Missing url parameter', { status: 400 });
    }

    // 쿠팡 도메인 외 요청 차단 (보안)
    if (!targetUrl.startsWith('https://www.coupang.com') && !targetUrl.startsWith('https://m.coupang.com')) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.coupang.com/',
                'Cache-Control': 'no-cache',
            },
            redirect: 'follow',
        });

        let html = await response.text();

        // 상대 경로를 절대 경로로 변환 (이미지, CSS, JS 등이 깨지지 않도록)
        const baseOrigin = 'https://www.coupang.com';
        html = html
            .replace(/href="\//g, `href="${baseOrigin}/`)
            .replace(/src="\//g, `src="${baseOrigin}/`)
            .replace(/action="\//g, `action="${baseOrigin}/`)
            .replace(/url\('\//g, `url('${baseOrigin}/`);

        // alert/confirm/prompt 원천 차단 스크립트 삽입 (가장 앞에)
        const blockModalScript = `
<script>
(function() {
    // Suppress all modal dialogs (alert, confirm, prompt) from iframe
    window.alert   = function() { return undefined; };
    window.confirm = function() { return true; };
    window.prompt  = function() { return ''; };
    // Override after any script tries to redefine
    Object.defineProperty(window, 'alert',   { value: function(){}, writable: false, configurable: false });
    Object.defineProperty(window, 'confirm', { value: function(){ return true; }, writable: false, configurable: false });
    Object.defineProperty(window, 'prompt',  { value: function(){ return ''; }, writable: false, configurable: false });
})();
</script>`;

        // <head> 바로 뒤에 스크립트 삽입
        if (html.includes('<head>')) {
            html = html.replace('<head>', `<head>${blockModalScript}`);
        } else if (html.includes('<HEAD>')) {
            html = html.replace('<HEAD>', `<HEAD>${blockModalScript}`);
        } else {
            html = blockModalScript + html;
        }

        // X-Frame-Options, CSP frame-ancestors 제거하고 응답
        return new NextResponse(html, {
            status: 200,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'no-store',
                // X-Frame-Options 의도적으로 누락 → iframe 허용
                // CSP 의도적으로 누락
            },
        });
    } catch (error) {
        console.error('[coupang-proxy] Fetch error:', error);
        return new NextResponse('Failed to fetch Coupang page', { status: 502 });
    }
}
