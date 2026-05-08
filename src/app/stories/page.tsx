import Link from 'next/link'
import { Heart, ArrowRight, CheckCircle } from 'lucide-react'

const stories = [
  {
    name: '张先生，62岁',
    duration: '使用服务 14 个月',
    content: '以前血糖控制得很差，总觉得这是种负担。每天扎手指记录数据，麻烦不说，数值不稳定心里更慌。自从有了唐小侠的健康顾问每天跟进，我觉得心里踏实多了。',
    result: '血糖达标率 92%',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: '王阿姨，68岁',
    duration: '使用服务 8 个月',
    content: '我今年68了，之前总觉得这些高科技产品是年轻人用的，跟我没关系。护理师特别耐心，一点一点教我。现在我每天看手机上的数据图表，觉得很有意思。',
    result: '已减药 1 种',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: '李大爷，71岁',
    duration: '使用服务 2 年',
    content: '最让我感动的是顾问们的关心，他们真的像家人一样。前段时间我身体不舒服，顾问主动打来电话安慰我，陪我聊了很久。这种关心，是以前去医院从来没有体验过的。',
    result: '糖化血红蛋白 6.8%',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: '陈奶奶，76岁',
    duration: '使用服务 18 个月',
    content: '我糖尿病十几年了，之前一直担心并发症。加入唐小侠后，有专门的团队帮我监测各项指标，还会定期提醒我做检查。现在我对自己的身体状况前所未有的了解。',
    result: '并发症风险显著降低',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
  },
]

export default function StoriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-heading">用户故事</h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            真实的故事，来自真实用户的反馈
          </p>
        </div>
      </section>

      {/* Stories */}
      <section className="py-16 sm:py-20 bg-background" aria-labelledby="stories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <h2 id="stories-heading" className="sr-only">用户故事列表</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stories.map((story) => (
              <article key={story.name} className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <img
                    src={story.image}
                    alt={`${story.name}的照片`}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-primary/20"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <div className="flex gap-1 mb-3" aria-label="5星评分" role="img">
                      {[...Array(5)].map((_, i) => (
                        <Heart key={i} className="w-5 h-5 text-amber-400 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <blockquote className="text-base text-text-secondary mb-4 leading-relaxed">
                      "{story.content}"
                    </blockquote>
                    <div className="bg-primary/5 rounded-lg px-4 py-3 mb-4">
                      <p className="text-primary font-semibold text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" aria-hidden="true" />
                        {story.result}
                      </p>
                    </div>
                    <p className="font-bold text-text-primary">{story.name}</p>
                    <p className="text-sm text-text-secondary mt-1">{story.duration}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-t border-gray-100" aria-label="服务数据">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2 font-heading">10000+</div>
            <div className="text-base lg:text-lg text-text-secondary">服务用户</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-primary-dark text-white" aria-labelledby="stories-cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <h2 id="stories-cta-heading" className="text-2xl sm:text-3xl font-bold mb-6 font-heading">
            您也可以成为下一个故事
          </h2>
          <p className="text-xl opacity-90 mb-10">加入唐小侠，开始您的控糖之旅</p>
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
