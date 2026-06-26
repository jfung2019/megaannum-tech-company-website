export function damp(current: number, target: number, smoothing: number): number {
  return current + (target - current) * smoothing;
}

export function normalizePointer(
  clientX: number,
  clientY: number,
  width: number,
  height: number,
): { normalizedX: number; normalizedY: number } {
  const normalizedX = (clientX / width) * 2 - 1;
  const normalizedY = (clientY / height) * 2 - 1;
  return { normalizedX, normalizedY };
}
