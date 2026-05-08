'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MEDICATION_METHODS, MEDICINE_LIBRARY, createMedicationRecord, MedicationRequest } from '@/lib/api/medication';

/**
 * 添加用药记录页面
 *
 * @author 糖伴儿开发团队
 */
export default function AddMedicationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    medicineType: 'ORAL',
    medicineName: '',
    dosage: '',
    dosageUnit: 'mg',
    medicationMethod: 'WITH_MEAL',
    hasSideEffect: false,
    sideEffectDesc: '',
    remark: '',
  });

  const medicineOptions = MEDICINE_LIBRARY[formData.medicineType as keyof typeof MEDICINE_LIBRARY] || [];

  const handleMedicineSelect = (name: string, unit: string) => {
    setFormData(prev => ({
      ...prev,
      medicineName: name,
      dosageUnit: unit,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.medicineName || !formData.dosage) {
      alert('请填写药物名称和剂量');
      return;
    }

    const token = localStorage.getItem('token') || '';
    if (!token) {
      alert('请先登录');
      return;
    }

    setLoading(true);
    try {
      const request: MedicationRequest = {
        medicineName: formData.medicineName,
        medicineType: formData.medicineType,
        dosage: parseFloat(formData.dosage),
        dosageUnit: formData.dosageUnit,
        medicationTime: new Date().toISOString(),
        medicationMethod: formData.medicationMethod,
        hasSideEffect: formData.hasSideEffect,
        sideEffectDesc: formData.sideEffectDesc || undefined,
        remark: formData.remark || undefined,
      };

      await createMedicationRecord(token, request);
      router.push('/patient/medication');
    } catch (error) {
      console.error('创建用药记录失败:', error);
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
          <Link href="/patient/medication" className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-heading font-semibold">记录用药</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 药物类型选择 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">药物类型</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'ORAL', label: '口服' },
              { value: 'INSULIN', label: '胰岛素' },
              { value: 'GLP1', label: 'GLP-1' },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setFormData(prev => ({ ...prev, medicineType: type.value, medicineName: '' }))}
                className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  formData.medicineType === type.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* 药物选择 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">选择药物</label>
          <div className="grid grid-cols-2 gap-2">
            {medicineOptions.map((medicine) => (
              <button
                key={medicine.name}
                onClick={() => handleMedicineSelect(medicine.name, medicine.unit)}
                className={`py-3 px-3 rounded-lg text-sm font-medium text-left transition-colors duration-150 ${
                  formData.medicineName === medicine.name
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {medicine.name}
              </button>
            ))}
          </div>
        </div>

        {/* 剂量输入 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">剂量</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={formData.dosage}
              onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
              placeholder="请输入剂量"
              className="flex-1 h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <span className="text-text-secondary w-12">{formData.dosageUnit}</span>
          </div>
        </div>

        {/* 用药时间 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">用药时间</label>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-text-primary">
              {new Date().toLocaleString('zh-CN', {
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* 用药方式 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-text-primary mb-3">用药方式</label>
          <div className="flex gap-2">
            {MEDICATION_METHODS.map((method) => (
              <button
                key={method.value}
                onClick={() => setFormData(prev => ({ ...prev, medicationMethod: method.value }))}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  formData.medicationMethod === method.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {/* 副作用 */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary">是否有副作用</span>
            <div
              onClick={() => setFormData(prev => ({ ...prev, hasSideEffect: !prev.hasSideEffect }))}
              className={`relative w-12 h-7 rounded-full transition-colors duration-150 ${
                formData.hasSideEffect ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-150 ${
                  formData.hasSideEffect ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </div>
          </label>
          {formData.hasSideEffect && (
            <textarea
              value={formData.sideEffectDesc}
              onChange={(e) => setFormData(prev => ({ ...prev, sideEffectDesc: e.target.value }))}
              placeholder="请描述副作用..."
              className="w-full mt-3 p-3 border border-gray-200 rounded-lg resize-none h-20"
            />
          )}
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
          disabled={loading}
          className="w-full bg-primary text-white py-4 rounded-xl font-medium shadow-md hover:bg-primary-dark transition-colors duration-150 disabled:opacity-50"
        >
          {loading ? '提交中...' : '确认记录'}
        </button>
      </div>
    </div>
  );
}
