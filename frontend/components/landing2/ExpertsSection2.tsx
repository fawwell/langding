"use client";

import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";
import { cn } from "@/lib/utils";

const EXPERTS = [
  "강주안.png", "곽대성.png", "김동현.jpg", "김명회.jpg", "김민석.png",
  "김민석2.jpg", "김성범.png", "김성운.jpg", "김영광.jpg", "김영민.png",
  "김예현.jpg", "김용규.jpg", "김용오.png", "김재호.png", "김태형.png",
  "나희천.png", "류재진.jpg", "마혁빈.jpg", "박두원.png", "박두원2.png",
  "박민석.jpg", "박정우.png", "서유영.jpg", "신기문.png", "오정호.png",
  "유한제.png", "윤철홍.jpg", "이건행.png", "이대택.png", "이동현.jpg",
  "이세훈.png", "이운용.png", "이재훈.jpg", "이지희.jpg", "임동기.png",
  "장영일.png", "전선혜.png", "정구중.jpg", "정연성.png", "제갈성렬.jpg",
  "짐중협.jpg", "차정호.jpg", "최강희.png", "최영우.png", "최완호.png",
  "최재환.png", "최준호.png", "최홍택.png", "하용현.png",
] as const;

function getNameFromFile(filename: string): string {
  return filename.replace(/\d*\.\w+$/, "");
}

export default function ExpertsSection2() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="experts" className="py-24 sm:py-32 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Expert Team
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            검증된{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              전문가 {EXPERTS.length}명
            </span>
            이 함께합니다
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            체육학 전공, 물리치료사, 운동처방사 등 검증된 전문 인력으로 구성되어 있습니다.
          </p>
        </div>

        <div
          className={cn(
            "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 sm:gap-4 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {EXPERTS.map((filename, i) => {
            const name = getNameFromFile(filename);
            return (
              <div
                key={filename}
                className="group flex flex-col items-center"
                style={{
                  transitionDelay: isVisible ? `${200 + (i % 20) * 40}ms` : "0ms",
                }}
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-blue-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-100">
                  <Image
                    src={`/images/association-members/${encodeURIComponent(filename)}`}
                    alt={`${name} 코치`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="80px"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-600 font-medium text-center truncate w-full">
                  {name}
                </p>
              </div>
            );
          })}
        </div>

        <div
          className={cn(
            "mt-12 text-center transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-flex items-center gap-6 bg-slate-50 rounded-2xl px-8 py-4 border border-slate-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{EXPERTS.length}+</p>
              <p className="text-xs text-slate-500">전문 코치진</p>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">100%</p>
              <p className="text-xs text-slate-500">자격증 보유</p>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">5년+</p>
              <p className="text-xs text-slate-500">평균 경력</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
