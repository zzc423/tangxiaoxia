import Link from 'next/link'
import Image from 'next/image'
import { Heart, ArrowRight, CheckCircle } from 'lucide-react'

const story = {
  name: '大可',
  age: '50岁确诊，控糖6年',
  content: '2020年确诊2型糖尿病伴酮症酸中毒，空腹血糖24mmol/L，糖化血红蛋白14%。通过改变生活方式，三个月后成功停用胰岛素，一年后糖化血红蛋白降到5.4%。',
  quote: '别怕。真的，别怕。这条路我走过，一开始很黑，但走着走着，天就亮了。找到你的战友——家人、糖友、负责任的护理，一个人走很累，一群人走就不孤单。',
  result: '糖化血红蛋白 5.4%',
  image: '/user-photo.jpg',
}

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

      {/* Single Story */}
      <section className="py-16 sm:py-20 bg-background" aria-labelledby="story-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-16">
          <article className="bg-white rounded-xl p-6 sm:p-10 shadow-sm border border-gray-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 relative mb-6 rounded-full overflow-hidden border-4 border-primary/20">
                <Image
                  src={story.image}
                  alt={`${story.name}的照片`}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <h2 id="story-heading" className="text-2xl font-bold text-text-primary mb-2 font-heading">{story.name}</h2>
              <p className="text-text-secondary mb-6">{story.age}</p>

              <div className="flex gap-1 mb-6" aria-label="5星评分" role="img">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-5 h-5 text-amber-400 fill-current" aria-hidden="true" />
                ))}
              </div>

              <p className="text-base text-text-secondary mb-6 leading-relaxed">
                {story.content}
              </p>

              <blockquote className="text-lg text-primary italic mb-6 border-l-4 border-primary pl-4 text-left w-full">
                "{story.quote}"
              </blockquote>

              <div className="bg-primary/5 rounded-lg px-6 py-4 mb-6">
                <p className="text-primary font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" aria-hidden="true" />
                  {story.result}
                </p>
              </div>
            </div>
          </article>
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
