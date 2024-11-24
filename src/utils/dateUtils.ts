export function getUTC3Date(): Date {
  const now = new Date();
  now.setHours(now.getHours()); // Ajusta para UTC-3
  return now;
}
