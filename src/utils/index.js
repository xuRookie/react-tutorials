// 金额格式化
export const formatCurrency = (val, n = 0) => {
  if (val) {
    const num = parseInt(val, 10)
    return (num.toFixed(n).toString()).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
  }
  return '0.00'
}