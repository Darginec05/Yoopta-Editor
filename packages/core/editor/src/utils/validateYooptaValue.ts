export function validateYooptaValue(value: any): boolean {
  if (!value) return false;
  if (typeof value !== 'object') return false;
  if (Array.isArray(value)) return false;

  return true;
}
