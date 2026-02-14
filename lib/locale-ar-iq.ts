import { arSA } from "date-fns/locale";
import type { Locale } from "date-fns";

/**
 * Iraqi Arabic locale for date-fns / react-day-picker.
 * Based on arSA but with Levantine/Iraqi month names and Latin numerals.
 */

const months = [
  "كانون الثاني",
  "شباط",
  "آذار",
  "نيسان",
  "أيار",
  "حزيران",
  "تموز",
  "آب",
  "أيلول",
  "تشرين الأول",
  "تشرين الثاني",
  "كانون الأول",
];

export const arIQ: Locale = {
  ...arSA,
  code: "ar-IQ",
  localize: {
    ...arSA.localize,
    month: (n: number) => months[n],
  },
};
