export function isNumber(anything) {
  if (isNaN(anything)) return false;
  if (anything === Infinity) return false;
  if (anything === - Infinity) return false;
  return typeof anything === 'number';
}