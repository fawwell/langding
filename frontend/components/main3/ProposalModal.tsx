'use client'

import { useState } from 'react'
import { useModal } from './ModalContext'

const BLOCKS = [
  {
    key: 'PART 1',
    label: 'BLOCK 1. 진단 모듈',
    modules: [
      { value: '1-1', text: '1-1. 3D AI 스캐닝' },
      { value: '1-2', text: '1-2. 리포트 & 약식 상담' },
      { value: '1-3', text: '1-3. 조직 통계 분석 리포트', wide: true },
    ],
  },
  {
    key: 'PART 2',
    label: 'BLOCK 2. 메인 케어 모듈',
    modules: [{ value: '2-1', text: '시그니처 1:1 피지컬 케어', wide: true }],
  },
  {
    key: 'PART 3',
    label: 'BLOCK 3. 단체 운동 모듈',
    modules: [
      { value: '3-1', text: '3-1. 그룹/단체 스트레칭' },
      { value: '3-2', text: '3-2. 기능성 운동 처방 실습' },
    ],
  },
  {
    key: 'PART 4',
    label: 'BLOCK 4. 강의 모듈',
    modules: [
      { value: '4-1', text: '4-1. 질환 예방 특강' },
      { value: '4-2', text: '4-2. 생활습관 개선 솔루션' },
      { value: '4-3', text: '4-3. 고질병 예방/교정 특강' },
    ],
  },
]

interface FormData {
  company: string
  manager: string
  phone: string
  email: string
  scale: string
  inquiry: string
  parts: Record<string, { selected: boolean; sub_modules: string[] }>
}

export default function ProposalModal() {
  const { activeModal, closeModal } = useModal()
  const [openBlocks, setOpenBlocks] = useState<Record<number, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    company: '',
    manager: '',
    phone: '',
    email: '',
    scale: '',
    inquiry: '',
    parts: Object.fromEntries(BLOCKS.map((b) => [b.key, { selected: false, sub_modules: [] }])),
  })

  const toggleBlock = (i: number) => {
    setOpenBlocks((prev) => ({ ...prev, [i]: !prev[i] }))
  }

  const handleModuleChange = (partKey: string, moduleValue: string, checked: boolean) => {
    setFormData((prev) => {
      const part = prev.parts[partKey]
      const newSubModules = checked
        ? [...part.sub_modules, moduleValue]
        : part.sub_modules.filter((m) => m !== moduleValue)
      return {
        ...prev,
        parts: {
          ...prev.parts,
          [partKey]: { selected: newSubModules.length > 0, sub_modules: newSubModules },
        },
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/v1/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('제안서 요청에 실패했습니다.')
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          company: '',
          manager: '',
          phone: '',
          email: '',
          scale: '',
          inquiry: '',
          parts: Object.fromEntries(BLOCKS.map((b) => [b.key, { selected: false, sub_modules: [] }])),
        })
        closeModal()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (activeModal !== 'proposal') return null

  return (
    <div className="main3-modal active" onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
      <div className="modal-content modal-form-content">
        <button className="modal-close" onClick={closeModal}>&times;</button>
        <div className="modal-header">
          <h2>기업/학교 맞춤형 제안서 요청</h2>
          <p>조직 환경에 알맞은 솔루션 제안서를 보내드립니다.</p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0', fontSize: 18, color: '#1a56db', fontWeight: 800 }}>
            ✅ 제안서 요청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ color: '#dc2626', padding: '12px', marginBottom: '16px', background: '#fef2f2', borderRadius: '8px', fontSize: 14 }}>
                {error}
              </div>
            )}
            <div className="form-group">
              <label className="field-label">소속 (기업명 또는 학교명) <span>*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="예: (주)파우 또는 OO고등학교"
                required
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
              />
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="field-label">담당자 / 직급 <span>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.manager}
                  onChange={(e) => handleChange('manager', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="field-label">연락처 <span>*</span></label>
                <input
                  type="tel"
                  className="form-control"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="field-label">업무용 이메일 <span>*</span></label>
              <input
                type="email"
                className="form-control"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="field-label">임직원(또는 학생) 규모 <span>*</span></label>
              <select
                className="form-control"
                required
                value={formData.scale}
                onChange={(e) => handleChange('scale', e.target.value)}
              >
                <option value="">선택해주세요</option>
                <option>50인 미만</option>
                <option>50인 ~ 100인</option>
                <option>100인 ~ 300인</option>
                <option>300인 이상</option>
              </select>
            </div>
            <div className="form-group">
              <label className="field-label">희망 서비스 모듈 선택 (다중 선택 가능)</label>
              {BLOCKS.map((block, i) => (
                <div key={i} className="proposal-block">
                  <div
                    className={`proposal-block-header ${openBlocks[i] ? 'active' : ''}`}
                    onClick={() => toggleBlock(i)}
                  >
                    <span>{block.label}</span>
                    <span>{openBlocks[i] ? '▲' : '▼'}</span>
                  </div>
                  {openBlocks[i] && (
                    <div className="proposal-block-content">
                      <div className="module-checkbox-grid">
                        {block.modules.map((mod) => (
                          <label
                            key={mod.value}
                            className="module-checkbox"
                            style={mod.wide ? { gridColumn: 'span 2' } : {}}
                          >
                            <input
                              type="checkbox"
                              name="module"
                              value={mod.value}
                              checked={formData.parts[block.key]?.sub_modules.includes(mod.value) ?? false}
                              onChange={(e) => handleModuleChange(block.key, mod.value, e.target.checked)}
                            />
                            <div>
                              <span className="chk-badge">{block.label.split('.')[0]}</span>
                              <br />
                              <span className="chk-text">{mod.text}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="form-group">
              <label className="field-label">주요 문의사항</label>
              <textarea
                className="form-control"
                placeholder="도입 목적이나 불편사항을 남겨주시면 더욱 정확한 제안이 가능합니다."
                value={formData.inquiry}
                onChange={(e) => handleChange('inquiry', e.target.value)}
              />
            </div>
            <button type="submit" className="form-submit-btn" disabled={loading}>
              {loading ? '제출 중...' : '선택한 모듈로 제안서 요청하기'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
