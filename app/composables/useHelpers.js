import { CalendarDate } from "@internationalized/date";
export const useHelpers = () => {
  const formatDateForDb = (date) => {
    if (!date) return null;
    return `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
  };

  const formatTimeForDb = (time) => {
    if (!time) return null;
    return `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}:00`;
  };

  const isValidNip = (nip) => {
    if (!nip) return false;

    const normalized = nip.replace(/[\s-]/g, "");

    if (!/^\d{10}$/.test(normalized)) return false;

    const digits = normalized.split("").map(Number);
    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];

    const checksum =
      weights.reduce((sum, weight, index) => sum + weight * digits[index], 0) %
      11;

    if (checksum === 10) return false;

    return checksum === digits[9];
  };

  const todayCalendarDate = () => {
    const d = new Date();
    return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
  };

  return {
    formatDateForDb,
    formatTimeForDb,
    isValidNip,
    todayCalendarDate,
  };
};
