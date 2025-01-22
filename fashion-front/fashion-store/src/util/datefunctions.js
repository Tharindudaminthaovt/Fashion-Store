import { format } from "date-fns";

export const formatYearMonth = (dateString) => {
  const date = new Date(dateString);
  return format(date, "MMMM yyyy"); // "January 2025"
};
