'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MEAL_TYPES, PORTION_SIZES, createDietRecord, DietRequest } from '@/lib/api/diet';

/**
 * 饮食记录页面
 *
 * @author 糖伴儿开发团队
 */
function DietRecordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'BREAKFAST';

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mealType: initialType,
    description: '',
    portionSize: 'MEDIUM',
    remark: '',
  });

  const currentMeal = MEAL_TYPES.find(m => m.value === formData.mealType) || MEAL_TYPES[0];

  const handleSubmit = async () => {
    const token = localStorage.getItem('token') || '';
    if (!token) {
      alert('请先登录');
      return;
    }

    setLoading(true);
    try {
      const request: DietRequest = {
        mealType: formData.mealType,
        description: formData.description || undefined,
        portionSize: formData.portionSize,
        checkinTime: new Date().toISOString(),
        remark: formData.remark || undefined,
      };

      await createDietRecord(token, request);
      router.push('/patient/diet');
    } catch (error) {
      console.error('饮食打卡失败:', error);
      alert('打卡失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航 */}
      <header className="bg-primary text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/patient/diet" className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-heading font-semibold">饮食打卡</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 餐饮类型 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">餐饮类型</label>
          <div className="grid grid-cols-4 gap-2">
            {MEAL_TYPES.map((meal) => (
              <button
                key={meal.value}
                onClick={() => setFormData(prev => ({ ...prev, mealType: meal.value }))}
                className={`py-3 px-2 rounded-lg text-center transition-colors duration-150 ${
                  formData.mealType === meal.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                <div className="text-xl mb-1">{meal.icon}</div>
                <div className="text-xs">{meal.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 份量选择 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">份量</label>
          <div className="flex gap-2">
            {PORTION_SIZES.map((size) => (
              <button
                key={size.value}
                onClick={() => setFormData(prev => ({ ...prev, portionSize: size.value }))}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  formData.portionSize === size.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* 文字描述 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">描述（可选）</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="今天吃了些什么？"
            className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24"
          />
        </div>

        {/* 备注 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">备注（可选）</label>
          <textarea
            value={formData.remark}
            onChange={(e) => setFormData(prev => ({ ...prev, remark: e.target.value }))}
            placeholder="添加备注..."
            className="w-full p-3 border border-gray-200 rounded-lg resize-none h-20"
          />
        </div>

        {/* AI反馈预览 */}
        <div className="bg-accent/10 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">🤖</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">AI将为您分析</p>
              <p className="text-sm text-text-secondary mt-1">
                {currentMeal.icon} {currentMeal.label}打卡成功！AI将根据您的饮食记录提供个性化建议。
              </p>
            </div>
          </div>
        </div>

        {/* 提交按钮 */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary text-white py-4 rounded-xl font-medium shadow-md hover:bg-primary-dark transition-colors duration-150 disabled:opacity-50"
        >
          {loading ? '提交中...' : `${currentMeal.icon} 确认${currentMeal.label}打卡`}
        </button>
      </div>
    </div>
  );
}

export default function DietRecordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><p>加载中...</p></div>}>
      <DietRecordContent />
    </Suspense>
  );
}
