"use client";
import { useCallback } from "react";

/**
 * useDateConflict — allows same-day turnaround (12 PM → 11 AM)
 */
export function useDateConflict(blockedDates = [], toast) {
  const CHECK_IN_HOUR = 12;
  const CHECK_OUT_HOUR = 11;

  const checkDateConflict = useCallback(
    (checkIn, checkOut) => {
      if (!checkIn || !checkOut) {
        toast?.({
          variant: "destructive",
          title: "Select Dates First",
          description: "Please select both check-in and check-out dates before booking.",
        });
        return true;
      }

      const normalizedCheckIn = new Date(
        `${checkIn.toISOString().slice(0, 10)}T${CHECK_IN_HOUR}:00:00+05:30`
      );
      const normalizedCheckOut = new Date(
        `${checkOut.toISOString().slice(0, 10)}T${CHECK_OUT_HOUR}:00:00+05:30`
      );

      const selectedRange = [];
      const cur = new Date(normalizedCheckIn);

      // ✅ Exclude checkout day for same-day turnaround
      while (cur < normalizedCheckOut) {
        const local = new Date(cur.getTime() - cur.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 10);
        selectedRange.push(local);
        cur.setDate(cur.getDate() + 1);
      }

      const conflict = selectedRange.some((d) => blockedDates.includes(d));

      if (conflict) {
        toast?.({
          variant: "destructive",
          title: "Selected Dates Unavailable",
          description:
            "Some of your selected dates are already booked. Please choose another range.",
        });
        return true;
      }

      return false;
    },
    [blockedDates, toast]
  );

  return checkDateConflict;
}
