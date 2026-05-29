'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

const reviews = [
  { stars: '★★★★★', text: '"수업 끝나고 사무실로 복귀할 때 벌써 변화를 체감합니다. 발바닥, 종아리, 허벅지 움직임부터가 다르네요. 최고입니다!"', reviewer: 'S사 운영팀' },
  { stars: '★★★★★', text: '"늘어나는 산재 발생이 큰 고민이었는데 업무 시작 전 사고를 예방하는 프로그램을 진행하면서 눈에 띄게 줄었어요."', reviewer: 'H사 안전환경팀' },
  { stars: '★★★★☆', text: '"모든 학생이 형평성 있게 검진을 이용할 수 있다는 점이 좋았어요. 체계적인 데이터 리포트 덕분에 학부모님들 만족도도 높습니다."', reviewer: 'OO고등학교 보건교사' },
  { stars: '★★★★★', text: '"직원들의 거북목이 확실히 좋아지는게 보입니다. 정기적으로 계속 도입할 예정입니다."', reviewer: 'N사 복지담당자' },
]

interface ReviewSwiperProps {
  cardStyle?: React.CSSProperties
}

export default function ReviewSwiper({ cardStyle }: ReviewSwiperProps) {
  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={1}
      spaceBetween={20}
      pagination={{ clickable: true }}
      breakpoints={{
        768: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      }}
      style={{ marginTop: 40, paddingBottom: 50 }}
    >
      {reviews.map((review, i) => (
        <SwiperSlide key={i}>
          <div className="testimonial-card" style={cardStyle}>
            <div className="stars">{review.stars}</div>
            <p className="review-text">{review.text}</p>
            <div className="reviewer-info">
              <div className="reviewer-avatar" />
              <span>{review.reviewer}</span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
