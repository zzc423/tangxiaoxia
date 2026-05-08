'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { EXERCISE_TYPES, EXERCISE_INTENSITIES, createExerciseRecord, ExerciseRequest } from '@/lib/api/exercise';

/**
 * 运动记录页面
 *
 * @author 糖伴儿开发团队
 */
function ExerciseRecordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'AEROBIC';

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    exerciseType: initialType,
    exerciseName: '',
    duration: 30,
    intensity: 'MEDIUM',
    calories: 0,
    steps: 0,
    remark: '',
  });

  const currentType = EXERCISE_TYPES[formData.exerciseType as keyof typeof EXERCISE_TYPES];
  const exerciseOptions = currentType?.exercises || [];

  const handleExerciseSelect = (name: string, caloriesPerMinute: number) => {
    const calories = caloriesPerMinute * formData.duration;
    setFormData(prev => ({
      ...prev,
      exerciseName: name,
      calories,
    }));
  };

  const handleDurationChange = (duration: number) => {
    const caloriesPerMinute = exerciseOptions.find(e => e.name === formData.exerciseName)?.caloriesPerMinute || 5;
    setFormData(prev => ({
      ...prev,
      duration,
      calories: caloriesPerMinute * duration,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.exerciseName) {
      alert('请选择运动项目');
      return;
    }

    const token = localStorage.getItem('token') || '';
    if (!token) {
      alert('请先登录');
      return;
    }

    setLoading(true);
    try {
      const request: ExerciseRequest = {
        exerciseType: formData.exerciseType,
        exerciseName: formData.exerciseName,
        duration: formData.duration,
        intensity: formData.intensity,
        calories: formData.calories || undefined,
        steps: formData.steps || undefined,
        checkinTime: new Date().toISOString(),
        remark: formData.remark || undefined,
      };

      await createExerciseRecord(token, request);
      router.push('/patient/exercise');
    } catch (error) {
      console.error('运动记录失败:', error);
      alert('记录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航 */}
      <header className="bg-primary text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/patient/exercise" className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-heading font-semibold">记录运动</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 运动类型 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">运动类型</label>
          <div className="flex gap-2">
            {Object.entries(EXERCISE_TYPES).map(([key, type]) => (
              <button
                key={key}
                onClick={() => setFormData(prev => ({
                  ...prev,
                  exerciseType: key,
                  exerciseName: '',
                  calories: 0,
                }))}
                className={`flex-1 py-3 px-2 rounded-lg text-center transition-colors duration-150 ${
                  formData.exerciseType === key
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                <div className="text-xl mb-1">{type.icon}</div>
                <div className="text-xs">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 运动项目 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">选择运动</label>
          <div className="grid grid-cols-2 gap-2">
            {exerciseOptions.map((exercise) => (
              <button
                key={exercise.name}
                onClick={() => handleExerciseSelect(exercise.name, exercise.caloriesPerMinute)}
                className={`py-3 px-3 rounded-lg text-sm font-medium text-left transition-colors duration-150 ${
                  formData.exerciseName === exercise.name
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {exercise.name}
              </button>
            ))}
          </div>
        </div>

        {/* 时长 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">
            运动时长: <span className="text-primary">{formData.duration}</span> 分钟
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleDurationChange(Math.max(5, formData.duration - 5))}
              className="w-12 h-12 bg-gray-100 rounded-full text-text-secondary hover:bg-gray-200"
            >
              -5
            </button>
            <input
              type="range"
              min="5"
              max="180"
              step="5"
              value={formData.duration}
              onChange={(e) => handleDurationChange(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <button
              onClick={() => handleDurationChange(Math.min(180, formData.duration + 5))}
              className="w-12 h-12 bg-gray-100 rounded-full text-text-secondary hover:bg-gray-200"
            >
              +5
            </button>
          </div>
          <div className="flex justify-between text-xs text-text-secondary mt-2">
            <span>5分钟</span>
            <span>180分钟</span>
          </div>
        </div>

        {/* 强度 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">运动强度</label>
          <div className="flex gap-2">
            {EXERCISE_INTENSITIES.map((intensity) => (
              <button
                key={intensity.value}
                onClick={() => setFormData(prev => ({ ...prev, intensity: intensity.value }))}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  formData.intensity === intensity.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {intensity.label}
              </button>
            ))}
          </div>
        </div>

        {/* 估算卡路里 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">
            估算消耗: <span className="text-accent">{formData.calories}</span> 千卡
          </label>
          <div className="text-xs text-text-secondary">
            基于您选择的运动和时长估算，实际消耗因人而异
          </div>
        </div>

        {/* 步数（可选） */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">步数（可选）</label>
          <input
            type="number"
            value={formData.steps || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, steps: parseInt(e.target.value) || 0 }))}
            placeholder="今日总步数"
            className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
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

        {/* 提交按钮 */}
        <button
          onClick={handleSubmit}
          disabled={loading || !formData.exerciseName}
          className="w-full bg-primary text-white py-4 rounded-xl font-medium shadow-md hover:bg-primary-dark transition-colors duration-150 disabled:opacity-50"
        >
          {loading ? '提交中...' : '确认记录'}
        </button>
      </div>
    </div>
  );
}

export default function ExerciseRecordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><p>加载中...</p></div>}>
      <ExerciseRecordContent />
    </Suspense>
  );
}
