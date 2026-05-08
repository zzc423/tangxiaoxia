/**
 * 运动记录API服务
 *
 * @author 糖伴儿开发团队
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// 运动类型选项
export const EXERCISE_TYPES = {
  AEROBIC: {
    label: '有氧运动',
    icon: '🏃',
    exercises: [
      { name: '快步走', caloriesPerMinute: 5 },
      { name: '慢跑', caloriesPerMinute: 8 },
      { name: '游泳', caloriesPerMinute: 10 },
      { name: '骑行', caloriesPerMinute: 7 },
      { name: '跳绳', caloriesPerMinute: 12 },
    ],
  },
  STRENGTH: {
    label: '力量训练',
    icon: '🏋️',
    exercises: [
      { name: '哑铃', caloriesPerMinute: 6 },
      { name: '杠铃', caloriesPerMinute: 7 },
      { name: '自重训练', caloriesPerMinute: 5 },
      { name: '阻力带', caloriesPerMinute: 4 },
    ],
  },
  FLEXIBILITY: {
    label: '柔韧训练',
    icon: '🧘',
    exercises: [
      { name: '瑜伽', caloriesPerMinute: 4 },
      { name: '太极', caloriesPerMinute: 5 },
      { name: '拉伸', caloriesPerMinute: 3 },
    ],
  },
};

// 运动强度选项
export const EXERCISE_INTENSITIES = [
  { value: 'LOW', label: '低强度' },
  { value: 'MEDIUM', label: '中强度' },
  { value: 'HIGH', label: '高强度' },
];

export interface ExerciseRecord {
  id: string;
  patientId: string;
  exerciseType: string;
  exerciseName: string;
  duration: number;
  intensity?: string;
  calories?: number;
  steps?: number;
  checkinTime: string;
  aiFeedback?: string;
  remark?: string;
  createdAt: string;
}

export interface ExerciseRequest {
  exerciseType: string;
  exerciseName: string;
  duration: number;
  intensity?: string;
  calories?: number;
  steps?: number;
  checkinTime: string;
  remark?: string;
}

/**
 * 记录运动
 */
export async function createExerciseRecord(token: string, request: ExerciseRequest): Promise<ExerciseRecord> {
  const response = await fetch(`${API_BASE_URL}/exercise`, {
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
 * 获取运动记录列表
 */
export async function getExerciseRecords(token: string): Promise<ExerciseRecord[]> {
  const response = await fetch(`${API_BASE_URL}/exercise`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data || [];
}

/**
 * 获取今日运动记录
 */
export async function getTodayExerciseRecords(token: string): Promise<ExerciseRecord[]> {
  const response = await fetch(`${API_BASE_URL}/exercise/today`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data || [];
}
