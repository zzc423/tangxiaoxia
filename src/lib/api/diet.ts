/**
 * 饮食记录API服务
 *
 * @author 糖伴儿开发团队
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// 餐饮类型选项
export const MEAL_TYPES = [
  { value: 'BREAKFAST', label: '早餐', icon: '🌅' },
  { value: 'LUNCH', label: '午餐', icon: '☀️' },
  { value: 'DINNER', label: '晚餐', icon: '🌙' },
  { value: 'SNACK', label: '加餐', icon: '🍎' },
];

// 份量选项
export const PORTION_SIZES = [
  { value: 'SMALL', label: '小份' },
  { value: 'MEDIUM', label: '中份' },
  { value: 'LARGE', label: '大份' },
];

export interface DietRecord {
  id: string;
  patientId: string;
  mealType: string;
  photoUrl?: string;
  description?: string;
  portionSize?: string;
  checkinTime: string;
  aiFeedback?: string;
  remark?: string;
  createdAt: string;
}

export interface DietRequest {
  mealType: string;
  photoUrl?: string;
  description?: string;
  portionSize?: string;
  checkinTime: string;
  remark?: string;
}

/**
 * 饮食打卡
 */
export async function createDietRecord(token: string, request: DietRequest): Promise<DietRecord> {
  const response = await fetch(`${API_BASE_URL}/diet/checkin`, {
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

/**
 * 获取饮食记录列表
 */
export async function getDietRecords(token: string): Promise<DietRecord[]> {
  const response = await fetch(`${API_BASE_URL}/diet`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data || [];
}

/**
 * 获取今日饮食记录
 */
export async function getTodayDietRecords(token: string): Promise<DietRecord[]> {
  const response = await fetch(`${API_BASE_URL}/diet/today`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data || [];
}
