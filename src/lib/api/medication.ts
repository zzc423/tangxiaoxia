/**
 * 用药记录API服务
 *
 * @author 糖伴儿开发团队
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// 药物标准库
export const MEDICINE_LIBRARY = {
  ORAL: [
    { name: '二甲双胍', unit: 'mg' },
    { name: '格列齐特', unit: 'mg' },
    { name: '阿卡波糖', unit: 'mg' },
    { name: '西格列汀', unit: 'mg' },
    { name: '恩格列净', unit: 'mg' },
    { name: '达格列净', unit: 'mg' },
    { name: '吡格列酮', unit: 'mg' },
    { name: '伏格列波糖', unit: 'mg' },
  ],
  INSULIN: [
    { name: '门冬胰岛素', unit: 'IU' },
    { name: '赖脯胰岛素', unit: 'IU' },
    { name: '甘精胰岛素', unit: 'IU' },
    { name: '地特胰岛素', unit: 'IU' },
    { name: '预混门冬胰岛素', unit: 'IU' },
    { name: '预混赖脯胰岛素', unit: 'IU' },
  ],
  GLP1: [
    { name: '利拉鲁肽', unit: 'mg' },
    { name: '司美格鲁肽', unit: 'mg' },
    { name: '度拉糖肽', unit: 'mg' },
    { name: '艾塞那肽', unit: 'mcg' },
  ],
};

// 用药方式选项
export const MEDICATION_METHODS = [
  { value: 'BEFORE_MEAL', label: '餐前' },
  { value: 'WITH_MEAL', label: '餐中' },
  { value: 'AFTER_MEAL', label: '餐后' },
];

export interface MedicationRecord {
  id: string;
  patientId: string;
  medicineName: string;
  medicineType: string;
  dosage: number;
  dosageUnit: string;
  medicationTime: string;
  medicationMethod: string;
  hasSideEffect: boolean;
  sideEffectDesc?: string;
  remark?: string;
  createdAt: string;
}

export interface MedicationRequest {
  medicineName: string;
  medicineType: string;
  dosage: number;
  dosageUnit: string;
  medicationTime: string;
  medicationMethod: string;
  hasSideEffect: boolean;
  sideEffectDesc?: string;
  remark?: string;
}

/**
 * 获取用药记录列表
 */
export async function getMedicationRecords(token: string): Promise<MedicationRecord[]> {
  const response = await fetch(`${API_BASE_URL}/medication`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data || [];
}

/**
 * 获取今日用药记录
 */
export async function getTodayMedicationRecords(token: string): Promise<MedicationRecord[]> {
  const response = await fetch(`${API_BASE_URL}/medication/today`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data || [];
}

/**
 * 创建用药记录
 */
export async function createMedicationRecord(token: string, request: MedicationRequest): Promise<MedicationRecord> {
  const response = await fetch(`${API_BASE_URL}/medication`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const data = await response.json();
  return data.data;
}
