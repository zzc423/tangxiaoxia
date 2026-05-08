import Link from 'next/link'
import { Activity, Heart, Users, BookOpen, TrendingUp, Phone, ArrowRight, CheckCircle } from 'lucide-react'

const services = [
  {
    icon: Activity,
    title: 'CGM智能监测',
    desc: '先进的持续血糖监测技术，持续自动记录，无需频繁扎手指，数据实时同步到手机。',
  },
  {
    icon: Heart,
    title: '专属健康顾问',
    desc: '配备专属健康顾问，全程陪伴您的控糖之路。专业解答您的每一个疑问。',
  },
  {
    icon: Users,
    title: '属地化服务',
    desc: '您身边的控糖管家，提供贴心的本地化支持，让关怀更近一步。',
  },
  {
    icon: BookOpen,
    title: '个性化健康教育',
    desc: '通俗易懂的糖尿病知识，帮助您真正理解身体状况，做出明智的健康选择。',
  },
  {
    icon: TrendingUp,
    title: '血糖数据分析',
    desc: '智能分析血糖数据，识别问题模式，预测风险趋势，让管理有据可依。',
  },
  {
    icon: Phone,
    title: '全天候咨询',
    desc: '适时在线，随时联系您的健康顾问，有问题不再慌。',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-heading">我们的服务</h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            专业服务 + 温暖关怀 + 持续陪伴，让控糖不再是孤军奋战
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 bg-background" aria-labelledby="services-list-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <h2 id="services-list-heading" className="sr-only">服务列表</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <article
                key={service.title}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                  <service.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-3 font-heading">{service.title}</h3>
                <p className="text-base text-text-secondary leading-relaxed">{service.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 bg-white" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 id="process-heading" className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 font-heading">
              服务流程
            </h2>
            <p className="text-lg text-text-secondary">简单四步，开始您的控糖之旅</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', title: '提交申请', desc: '填写基本信息' },
              { num: '02', title: '健康评估', desc: '专业团队了解情况' },
              { num: '03', title: '定制方案', desc: '量身定制管理计划' },
              { num: '04', title: '开始服务', desc: '佩戴设备，享受关怀' },
            ].map((step, index) => (
              <div key={step.num} className="text-center">
                <div
                  className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg"
                  aria-hidden="true"
                >
                  {step.num}
                </div>
                <span className="sr-only">步骤 {index + 1}:</span>
                <h3 className="text-lg font-bold text-text-primary mb-2 font-heading">{step.title}</h3>
                <p className="text-base text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 sm:py-20 bg-background" aria-labelledby="why-us-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 id="why-us-heading" className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 font-heading">
              为什么选择唐小侠？
            </h2>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <ul className="space-y-4" aria-label="选择唐小侠的理由">
              {[
                '无需频繁扎手指，持续监测血糖',
                '专属健康顾问，全程陪伴',
                '属地化服务，关怀更近',
                '数据驱动，管理更科学',
                '用户数据绝对私密安全',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-base text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-primary-dark text-white" aria-labelledby="services-cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <h2 id="services-cta-heading" className="text-2xl sm:text-3xl font-bold mb-6 font-heading">
            开始您的控糖之旅
          </h2>
          <p className="text-xl opacity-90 mb-10">现在申请，享受专业温暖的控糖服务</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg min-h-[52px] cursor-pointer"
          >
            立即申请
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
