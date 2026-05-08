'use client'

import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import Image from 'next/image'

const contactInfo = [
  { icon: Phone, title: '联系电话', content: '19050199720', sub: '周一至周日 8:00-22:00' },
  { icon: Mail, title: '电子邮箱', content: 'txx0121@163.com', sub: '随时回复' },
  { icon: MapPin, title: '公司地址', content: '山东省济南市高新区孙村街道港西路', sub: '山东高科技创新园9号楼6层C区634' },
]

export default function ContactPage() {
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
            {/* WeChat QR Code */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="w-64 h-64 relative mb-6">
                <Image
                  src="/wechat-qr.jpg"
                  alt="微信扫码联系我们"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 256px, 256px"
                />
              </div>
              <div className="flex items-center gap-2 text-primary">
                <MessageCircle className="w-6 h-6" aria-hidden="true" />
                <span className="text-xl font-semibold">扫码添加微信</span>
              </div>
              <p className="text-text-secondary text-center mt-2">长按识别二维码，关注"唐小侠控糖"服务号</p>
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
