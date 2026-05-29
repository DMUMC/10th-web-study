export function formatPrice(price: string | number) {
  const num = typeof price === 'string' ? Number(price) : price
  return `${num.toLocaleString('ko-KR')}원`
}

export function calcTotal(items: { price: string; amount: number }[]) {
  return items.reduce((sum, item) => sum + Number(item.price) * item.amount, 0)
}
