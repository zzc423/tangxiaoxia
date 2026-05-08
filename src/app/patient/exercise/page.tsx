'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { EXERCISE_TYPES, getTodayExerciseRecords, ExerciseRecord } from '@/lib/api/exercise';

/**
 * 运动记录主页
 *
 * @author 糖伴儿开发团队
 */
export default function ExercisePage() {
  const [records, setRecords] = useState<ExerciseRecord[]>([]);
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
      const data = await getTodayExerciseRecords(authToken);
      setRecords(data);
    } catch (error) {
      console.error('加载运动记录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 计算今日统计数据
  const totalDuration = records.reduce((sum, r) => sum + r.duration, 0);
  const totalCalories = records.reduce((sum, r) => sum + (r.calories || 0), 0);
  const totalSteps = records.reduce((sum, r) => sum + (r.steps || 0), 0);

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
          <h1 className="text-lg font-heading font-semibold">运动记录</h1>
          <Link href="/patient/exercise/record" className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 今日统计 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">今日运动</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalDuration}</div>
              <div className="text-xs text-text-secondary">分钟</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{totalCalories}</div>
              <div className="text-xs text-text-secondary">千卡</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-light">{totalSteps}</div>
              <div className="text-xs text-text-secondary">步数</div>
            </div>
          </div>
        </div>

        {/* 快速打卡 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">快速打卡</h2>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(EXERCISE_TYPES).map(([key, type]) => (
              <Link
                key={key}
                href={`/patient/exercise/record?type=${key}`}
                className="py-4 px-3 rounded-xl text-center bg-gray-50 hover:bg-primary/10 transition-colors duration-150"
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <div className="text-sm font-medium text-text-primary">{type.label}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* 步数同步提示 */}
        <div className="bg-primary/10 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-lg">👟</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">步数同步</p>
              <p className="text-xs text-text-secondary">同步手机计步数据</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
            同步
          </button>
        </div>

        {/* AI反馈 */}
        {records.length > 0 && records[0].aiFeedback && (
          <div className="bg-accent/10 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg">🤖</span>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">运动建议</p>
                <p className="text-sm text-text-secondary mt-1">{records[0].aiFeedback}</p>
              </div>
            </div>
          </div>
        )}

        {/* 今日记录 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-heading font-semibold text-text-primary mb-3">今日记录</h2>

          {loading ? (
            <div className="text-center py-6 text-text-secondary">加载中...</div>
          ) : records.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-2">🏃</div>
              <p className="text-text-secondary">还没有运动记录</p>
              <p className="text-sm text-text-secondary/60">点击上方按钮开始记录</p>
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((record) => {
                const typeInfo = EXERCISE_TYPES[record.exerciseType as keyof typeof EXERCISE_TYPES];
                return (
                  <div key={record.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                    <div className="text-2xl">{typeInfo?.icon || '🏃'}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-text-primary">{record.exerciseName}</span>
                        <span className="text-sm text-text-secondary">
                          {new Date(record.checkinTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-secondary mt-1">
                        <span>{record.duration}分钟</span>
                        {record.calories && <span>{record.calories}千卡</span>}
                        {record.steps && <span>{record.steps}步</span>}
                      </div>
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
