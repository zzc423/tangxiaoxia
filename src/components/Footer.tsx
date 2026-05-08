import Link from 'next/link'
import { Heart, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-primary" aria-hidden="true" />
              <span className="text-xl font-bold text-primary font-heading">唐小侠</span>
            </div>
            <p className="text-text-secondary leading-relaxed">
              像家人一样关怀的临床护理。致力于为每一位糖友提供有温度的医疗照护。
            </p>
          </div>
          <nav aria-label="页脚导航-快速链接">
            <h4 className="font-bold text-text-primary mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-text-secondary hover:text-primary transition-colors">首页</Link></li>
              <li><Link href="/about" className="text-text-secondary hover:text-primary transition-colors">关于我们</Link></li>
              <li><Link href="/services" className="text-text-secondary hover:text-primary transition-colors">服务介绍</Link></li>
              <li><Link href="/stories" className="text-text-secondary hover:text-primary transition-colors">用户故事</Link></li>
            </ul>
          </nav>
          <div>
            <h4 className="font-bold text-text-primary mb-4">联系我们</h4>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>电话：400-888-6666</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>care@tangxiaoxia.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>北京市朝阳区建国路88号</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-sm">© 2024 唐小侠. 保留所有权利。</p>
          <nav className="flex gap-6" aria-label="法律链接">
            <Link href="#" className="text-text-secondary hover:text-primary text-sm transition-colors">隐私政策</Link>
            <Link href="#" className="text-text-secondary hover:text-primary text-sm transition-colors">服务条款</Link>
            <Link href="#" className="text-text-secondary hover:text-primary text-sm transition-colors">无障碍声明</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
