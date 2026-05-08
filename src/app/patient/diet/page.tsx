'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MEAL_TYPES, getTodayDietRecords, DietRecord } from '@/lib/api/diet';

/**
 * 饮食记录主页
 *
 * @author 糖伴儿开发团队
 */
export default function DietPage() {
  const [records, setRecords] = useState<DietRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token') || '';
    setToken(savedToken);
    loadRecords(savedToken);
  }, []);

  const loadRecords = async (authToken: string) => {
    if (!authToken) {
      setLoading(false);
      return;
    }
    try {
      const data = await getTodayDietRecords(authToken);
      setRecords(data);
    } catch (error) {
      console.error('加载饮食记录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMealInfo = (type: string) => {
    return MEAL_TYPES.find(m => m.value === type) || MEAL_TYPES[0];
  };

  const isMealCompleted = (type: string) => {
    return records.some(r => r.mealType === type);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航 */}
      <header className="bg-primary text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/patient" className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-heading font-semibold">饮食打卡</h1>
          <Link href="/patient/diet/record" className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </header>

      <div className="p-4">
        {/* 快速打卡区域 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm mb-4">
          <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">今日打卡</h2>
          <div className="grid grid-cols-2 gap-3">
            {MEAL_TYPES.slice(0, 4).map((meal) => {
              const completed = isMealCompleted(meal.value);
              return (
                <Link
                  key={meal.value}
                  href={`/patient/diet/record?type=${meal.value}`}
                  className={`relative py-6 px-4 rounded-xl text-center transition-all duration-150 ${
                    completed
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-gray-50 border-2 border-transparent hover:border-primary/30'
                  }`}
                >
                  <div className="text-3xl mb-2">{meal.icon}</div>
                  <div className={`font-medium ${completed ? 'text-primary' : 'text-text-primary'}`}>
                    {meal.label}
                  </div>
                  {completed && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* AI反馈展示 */}
        {records.length > 0 && records[0].aiFeedback && (
          <div className="bg-accent/10 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">AI饮食建议</p>
                <p className="text-sm text-text-secondary mt-1">{records[0].aiFeedback}</p>
              </div>
            </div>
          </div>
        )}

        {/* 打卡记录 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-heading font-semibold text-text-primary mb-3">今日记录</h2>

          {loading ? (
            <div className="text-center py-6 text-text-secondary">加载中...</div>
          ) : records.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-2">🍽️</div>
              <p className="text-text-secondary">还没有饮食记录</p>
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((record) => {
                const mealInfo = getMealInfo(record.mealType);
                return (
                  <div key={record.id} className="flex items-center gap-3 py-2">
                    <div className="text-2xl">{mealInfo.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-text-primary">{mealInfo.label}</span>
                        <span className="text-sm text-text-secondary">
                          {new Date(record.checkinTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {record.description && (
                        <p className="text-sm text-text-secondary">{record.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
