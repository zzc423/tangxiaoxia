import Link from 'next/link'
import { Heart, MapPin, Clock, Users, ArrowRight, Activity, Phone, Shield, Award, CheckCircle } from 'lucide-react'

const stats = [
  { value: '10000+', label: '服务用户', icon: Users },
]

const services = [
  {
    icon: Activity,
    title: 'CGM智能监测',
    desc: '持续监测血糖，无需扎手指，数据实时同步',
    features: ['无需扎手指', '持续监测', '数据同步'],
  },
  {
    icon: Heart,
    title: '专属健康顾问',
    desc: '专业团队全程陪伴，适时解答您的疑问',
    features: ['真人服务', '随时响应', '个性化关怀'],
  },
  {
    icon: MapPin,
    title: '属地化服务',
    desc: '您身边的控糖管家，提供贴心的本地化支持',
    features: ['本地团队', '上门服务', '贴心关怀'],
  },
  {
    icon: Shield,
    title: '数据安全',
    desc: '加密存储保护，您的健康数据绝对私密',
    features: ['加密存储', '隐私保护', '安全可靠'],
  },
]

const testimonials = [
  {
    name: '张先生，62岁',
    content: '以前血糖控制得很差，自从有了专属顾问每天跟进，我现在心里踏实多了，数值也稳定了。',
    result: '血糖达标率 92%',
  },
  {
    name: '王阿姨，68岁',
    content: '设备特别简单，我这把年纪也学得会。营养师给我设计的食谱既好吃又不升糖，非常实用。',
    result: '已持续使用 14 个月',
  },
  {
    name: '李大爷，71岁',
    content: '最让我感动的是顾问们的关心，他们真的像家人一样，不只是谈血糖，而是关心我的整体状态。',
    result: '糖化血红蛋白 6.8%',
  },
]

const steps = [
  { num: '01', title: '提交申请', desc: '填写基本信息' },
  { num: '02', title: '健康评估', desc: '专业团队了解情况' },
  { num: '03', title: '定制方案', desc: '量身定制管理计划' },
  { num: '04', title: '开始服务', desc: '佩戴设备，享受关怀' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero - Accessible with clear hierarchy */}
      <section className="relative min-h-[600px] sm:min-h-[650px] flex items-center bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 font-heading">
              真护理 · 属地化 · 终身信任
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10 max-w-2xl">
              专注糖尿病患者全生命周期管理，让每一位糖友都能享受专业、温暖、持续的控糖服务。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg min-h-[52px] cursor-pointer"
              >
                立即申请服务
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-white/10 transition-all duration-200 min-h-[52px] cursor-pointer"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Simplified, high contrast */}
      <section className="py-12 bg-white border-b border-gray-200" aria-label="服务数据">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex justify-center">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center px-8">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2 font-heading">
                  {stat.value}
                </div>
                <div className="text-base sm:text-lg text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Card layout with clear feature lists */}
      <section className="py-16 sm:py-20 bg-background" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 id="services-heading" className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 font-heading">
              我们能为您提供什么
            </h2>
            <p className="text-lg text-text-secondary">专业的服务 + 温暖的关怀 + 持续的陪伴</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <article
                key={service.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                  <service.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2 font-heading">{service.title}</h3>
                <p className="text-base text-text-secondary mb-4">{service.desc}</p>
                <ul className="space-y-2" aria-label={`${service.title}特点`}>
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Clear numbered steps */}
      <section className="py-16 sm:py-20 bg-white" aria-labelledby="steps-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 id="steps-heading" className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 font-heading">
              服务流程
            </h2>
            <p className="text-lg text-text-secondary">简单四步，开启您的控糖之旅</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.num} className="relative text-center">
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

      {/* Testimonials - Accessible cards */}
      <section className="py-16 sm:py-20 bg-background" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 id="testimonials-heading" className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 font-heading">
              用户真实反馈
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <article key={item.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4" aria-label="5星评分" role="img">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-base text-text-secondary mb-5 leading-relaxed">
                  "{item.content}"
                </blockquote>
                <div className="bg-primary/5 rounded-lg p-3 mb-4">
                  <p className="text-primary font-semibold text-sm">{item.result}</p>
                </div>
                <p className="font-bold text-text-primary">{item.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Clear action */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-primary-dark text-white" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold mb-6 font-heading">
            准备好开始您的控糖之旅了吗？
          </h2>
          <p className="text-xl opacity-90 mb-10">现在申请，即可获得一次免费的专家健康评估</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg min-h-[52px] cursor-pointer"
          >
            立即免费申请
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
