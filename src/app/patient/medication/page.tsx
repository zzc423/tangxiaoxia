'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MEDICATION_METHODS, MEDICINE_LIBRARY, getTodayMedicationRecords, MedicationRecord } from '@/lib/api/medication';

/**
 * 用药记录主页
 *
 * @author 糖伴儿开发团队
 */
export default function MedicationPage() {
  const router = useRouter();
  const [records, setRecords] = useState<MedicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    // 模拟获取token，实际应从登录状态获取
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
      const data = await getTodayMedicationRecords(authToken);
      setRecords(data);
    } catch (error) {
      console.error('加载用药记录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  const getMethodLabel = (method: string) => {
    return MEDICATION_METHODS.find(m => m.value === method)?.label || method;
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
          <h1 className="text-lg font-heading font-semibold">用药记录</h1>
          <div className="w-6"></div>
        </div>
      </header>

      {/* 今日用药统计 */}
      <div className="p-4">
        <div className="bg-surface rounded-xl p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">今日用药</p>
              <p className="text-3xl font-heading font-bold text-primary">{records.length}</p>
            </div>
            <div className="bg-primary-light/10 rounded-full p-3">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 快速添加按钮 */}
        <Link
          href="/patient/medication/add"
          className="block w-full bg-primary text-white text-center py-4 rounded-xl font-medium shadow-md hover:bg-primary-dark transition-colors duration-150"
        >
          + 记录用药
        </Link>
      </div>

      {/* 用药记录列表 */}
      <div className="px-4 pb-8">
        <h2 className="text-lg font-heading font-semibold text-text-primary mb-3">用药记录</h2>

        {loading ? (
          <div className="text-center py-8 text-text-secondary">加载中...</div>
        ) : records.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-surface rounded-xl p-6 shadow-sm">
              <svg className="w-16 h-16 mx-auto text-text-secondary/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-text-secondary">暂无今日用药记录</p>
              <p className="text-text-secondary/60 text-sm mt-1">点击上方按钮记录用药</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map((record) => (
              <div key={record.id} className="bg-surface rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-medium text-text-primary">{record.medicineName}</span>
                      <span className="text-sm text-text-secondary">
                        {record.dosage}{record.dosageUnit}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                      <span>{formatTime(record.medicationTime)}</span>
                      <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-full">
                        {getMethodLabel(record.medicationMethod)}
                      </span>
                    </div>
                    {record.hasSideEffect && (
                      <p className="text-sm text-red-500 mt-1">
                        副作用: {record.sideEffectDesc}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
