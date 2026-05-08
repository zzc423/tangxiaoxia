import Link from 'next/link'
import { Heart, Sparkles, Target, Shield, ArrowRight, CheckCircle } from 'lucide-react'

const values = [
  { icon: Heart, title: '良善', desc: '像对待家人一样对待每一位用户，感同身受每一份忧虑' },
  { icon: Sparkles, title: '求实', desc: '用数据说话，用实证验证每一项服务' },
  { icon: Target, title: '专注', desc: '只做一件事：让糖尿病管理变得更简单' },
  { icon: Shield, title: '守护', desc: '守护每一位用户的健康数据安全' },
]

const stats = [
  { value: '10000+', label: '服务用户' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-heading">关于我们</h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            专注糖尿病患者全生命周期管理，让每一位糖友都能享受专业、温暖、持续的控糖服务
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-primary text-white" aria-label="服务数据">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex justify-center">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center px-8">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 font-heading">{stat.value}</div>
                <div className="text-base sm:text-lg text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20 bg-white" aria-labelledby="story-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 id="story-heading" className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 font-heading">
              我们的故事
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              我们深刻理解糖尿病患者在日常生活中面临的挑战。控糖不仅仅是记录数字，更是一种生活方式的改变。
            </p>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              唐小侠的诞生，源于一份最简单的初心：让每一位糖尿病患者都能获得专业、温暖、持续的关怀，不再孤独地面对疾病。
            </p>
            <blockquote className="text-xl text-primary font-medium italic border-l-4 border-primary pl-6 py-2 mt-8 text-left">
              "用爱填补每一份血糖波动的缝隙"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-background" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 id="values-heading" className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 font-heading">
              我们的理念
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <article
                key={value.title}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2 font-heading">{value.title}</h3>
                <p className="text-base text-text-secondary">{value.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 bg-white" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 font-heading">
              为什么选择唐小侠
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              '真人护理团队，24小时随时响应',
              '无需扎手指，CGM持续血糖监测',
              '个性化饮食和运动方案',
              '专业医疗团队定期评估',
              '数据实时同步，子女也能查看',
              '银行级加密，数据安全无忧',
            ].map((feature) => (
              <div key={feature} className="flex items-start gap-3 p-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-base text-text-secondary">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-primary-dark text-white" aria-labelledby="about-cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <h2 id="about-cta-heading" className="text-2xl sm:text-3xl font-bold mb-6 font-heading">
            了解我们的服务
          </h2>
          <p className="text-xl opacity-90 mb-10">期待与您相遇，开启控糖新生活</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg min-h-[52px] cursor-pointer"
          >
            联系我们
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
