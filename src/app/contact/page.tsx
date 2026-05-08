'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react'

const contactInfo = [
  { icon: Phone, title: '联系电话', content: '400-888-6666', sub: '周一至周日 8:00-22:00' },
  { icon: Mail, title: '电子邮箱', content: 'care@tangxiaoxia.com', sub: '24小时内回复' },
  { icon: MapPin, title: '公司地址', content: '北京市朝阳区', sub: '远洋国际中心' },
  { icon: Clock, title: '服务时间', content: '健康咨询：24/7 全天候', sub: '设备配送：周一至周六 9:00-18:00' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', condition: '' })
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {}
    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '请输入您的手机号'
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入正确的手机号'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <>
        <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-heading">联系我们</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              无论您是想了解服务，还是有任何疑问，我们都期待与您交流
            </p>
          </div>
        </section>
        <section className="py-20 bg-background flex items-center justify-center min-h-[400px]">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4 font-heading">申请已提交！</h2>
            <p className="text-lg text-text-secondary mb-8">
              我们的工作人员将在24小时内与您联系，请保持手机畅通。
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setFormData({ name: '', phone: '', condition: '' })
              }}
              className="text-primary font-medium hover:underline cursor-pointer bg-transparent border-none"
            >
              返回继续填写
            </button>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-heading">联系我们</h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            无论您是想了解服务，还是有任何疑问，我们都期待与您交流
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-text-primary mb-2 font-heading">免费申请服务</h2>
              <p className="text-base text-text-secondary mb-8">填写以下信息，我们的工作人员将在24小时内与您联系</p>
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-text-primary mb-2">
                    姓名 <span className="text-red-500" aria-hidden="true">*</span>
                    <span className="sr-only">（必填）</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="请输入您的姓名"
                    className={`w-full px-4 py-4 border-2 rounded-xl text-base transition-colors min-h-[52px] ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                    } focus:outline-none`}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm text-red-500" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-base font-medium text-text-primary mb-2">
                    手机号 <span className="text-red-500" aria-hidden="true">*</span>
                    <span className="sr-only">（必填）</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="请输入您的手机号"
                    className={`w-full px-4 py-4 border-2 rounded-xl text-base transition-colors min-h-[52px] ${
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                    } focus:outline-none`}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-2 text-sm text-red-500" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="condition" className="block text-base font-medium text-text-primary mb-2">
                    病情简述
                  </label>
                  <textarea
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    rows={4}
                    placeholder="可选：糖尿病类型、病程、当前困扰等"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-base focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent text-white py-4 px-8 rounded-xl text-lg font-semibold hover:bg-accent-light transition-all duration-200 shadow-sm flex items-center justify-center gap-2 min-h-[52px] cursor-pointer"
                >
                  <span>提交申请</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-8 font-heading">联系方式</h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <article key={item.title} className="bg-white rounded-xl p-6 flex items-start gap-4 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary mb-1">{item.title}</h3>
                      <p className="text-lg text-text-secondary">{item.content}</p>
                      <p className="text-sm text-text-secondary mt-1">{item.sub}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
