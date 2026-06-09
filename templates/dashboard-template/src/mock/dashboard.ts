/**
 * Mock data for the dashboard command center verification.
 * In a real project, this would be split per domain (asset.mock.ts, etc.)
 */
export interface AssetCategory {
  key: string
  label: string
  value: number
  unit: string
  tone: 'blue' | 'cyan' | 'green' | 'violet'
  trend: number
}

export const assetCategories: AssetCategory[] = [
  { key: 'partial',  label: '非全款', value: 12846, unit: '户', tone: 'blue',   trend: 2.4 },
  { key: 'full',     label: '全款',   value: 9412,  unit: '户', tone: 'cyan',   trend: 1.8 },
  { key: 'other',    label: '其他',   value: 684,   unit: '户', tone: 'green',  trend: 0.3 },
  { key: 'self',     label: '自持',   value: 3250,  unit: '户', tone: 'violet', trend: -0.6 },
  { key: 'nonself',  label: '非自持', value: 19692, unit: '户', tone: 'blue',   trend: 3.1 },
]

export const assetRows = [
  { label: '发电户号', value: 46298, change: 412, tone: 'green' as const },
  { label: '变更中',   value: 1284,  change: -86,  tone: 'amber' as const },
  { label: '主体',     value: 348,   change: 12,   tone: 'cyan'  as const },
  { label: '合同',     value: 12846, change: 256,  tone: 'blue'  as const },
]

export interface MapPoint {
  code: string
  name: string
  cx: number
  cy: number
  value: number
  status: 'normal' | 'warning' | 'critical'
}

export const mapPoints: MapPoint[] = [
  { code: 'BJ', name: '北京', cx: 720, cy: 220, value: 384, status: 'normal' },
  { code: 'SH', name: '上海', cx: 820, cy: 410, value: 412, status: 'normal' },
  { code: 'GD', name: '广东', cx: 660, cy: 580, value: 528, status: 'critical' },
  { code: 'SD', name: '山东', cx: 730, cy: 300, value: 396, status: 'warning' },
  { code: 'ZJ', name: '浙江', cx: 790, cy: 430, value: 348, status: 'normal' },
  { code: 'JS', name: '江苏', cx: 770, cy: 380, value: 410, status: 'normal' },
  { code: 'SC', name: '四川', cx: 480, cy: 480, value: 268, status: 'warning' },
  { code: 'HB', name: '湖北', cx: 640, cy: 440, value: 232, status: 'normal' },
  { code: 'HN', name: '河南', cx: 680, cy: 360, value: 312, status: 'normal' },
  { code: 'LN', name: '辽宁', cx: 800, cy: 180, value: 198, status: 'normal' },
  { code: 'FJ', name: '福建', cx: 760, cy: 510, value: 178, status: 'normal' },
  { code: 'XJ', name: '新疆', cx: 280, cy: 280, value: 156, status: 'warning' },
]

// Approximate Albers-projected China outline (placeholder)
export const chinaMapPath = 'M 250 200 Q 300 100 500 80 T 850 200 Q 900 350 880 480 T 750 680 Q 600 720 450 680 T 200 480 Q 180 350 250 200 Z'

export const generation24h = [12, 8, 5, 4, 6, 24, 86, 184, 320, 480, 612, 728, 800, 832, 814, 740, 612, 420, 220, 96, 38, 22, 16, 14]

export const closureRates = [
  { label: '工单闭环率', value: 92.6 },
  { label: '维修闭环率', value: 88.4 },
  { label: '漏雨闭环率', value: 76.2 },
  { label: '修缮闭环率', value: 81.5 },
  { label: '业务闭环率', value: 64.8 },
  { label: '巡检闭环率', value: 96.1 },
]

export interface WeatherAlert {
  id: string
  level: 'orange' | 'yellow' | 'red'
  type: string
  date: string
  region: string
  confidence: number
}

export const weatherAlerts: WeatherAlert[] = [
  { id: 'w1', level: 'orange', type: '雷暴大风', date: '06-06', region: '广东省·深圳市·宝安区', confidence: 86 },
  { id: 'w2', level: 'yellow', type: '高温预警', date: '06-06', region: '山东省·济南市·历城区', confidence: 64 },
  { id: 'w3', level: 'orange', type: '沙尘暴',   date: '06-06', region: '新疆·哈密市·伊州区',   confidence: 72 },
  { id: 'w4', level: 'yellow', type: '暴雨',     date: '06-05', region: '四川省·凉山·西昌市',   confidence: 58 },
]
