'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

const partners = ['삼성 계열사', '현대 계열사', '네이버/카카오', '주요 금융권', '전국 주요 초중고', '공공기관']

export default function PartnerSwiper() {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={2}
      spaceBetween={15}
      loop
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 5, spaceBetween: 30 },
      }}
      style={{ marginTop: 40, paddingBottom: 10 }}
    >
      {partners.map((partner, i) => (
        <SwiperSlide key={i}>
          <div className="partner-logo">{partner}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
