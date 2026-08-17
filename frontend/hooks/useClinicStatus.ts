"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to determine if the clinic is currently open or closed based on IST time.
 * Clinic hours: Monday - Sunday, 10:00 AM to 6:00 PM (10:00 - 18:00 IST).
 */
export function useClinicStatus(): boolean {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const checkStatus = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        });
        const timeStr = formatter.format(now);
        const [hStr, mStr] = timeStr.split(":");
        let hour = parseInt(hStr, 10);
        if (hour === 24) hour = 0;
        const minute = parseInt(mStr, 10) || 0;
        const totalMinutes = hour * 60 + minute;

        // Open between 10:00 AM (600 mins) and 6:00 PM (1080 mins)
        const currentlyOpen = totalMinutes >= 600 && totalMinutes < 1080;
        setIsOpen(currentlyOpen);
      } catch {
        const now = new Date();
        const hour = now.getHours();
        setIsOpen(hour >= 10 && hour < 18);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return isOpen;
}
