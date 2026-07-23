"use client";

import { useEffect, useState } from "react";
import CountdownItem from "./CountdownItem";

type CountdownProps = {
  targetDate: string | Date;

  className?: string;

  labels?: {
    months?: string;
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };

  onComplete?: () => void;

  finishedText?: string;
};

type TimeLeft = {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown({
  targetDate,
  className = "",
  labels = {},
  onComplete,
  finishedText = "Event Started!",
}: CountdownProps) {
  const calculateTimeLeft = (): TimeLeft | null => {
  const now = new Date();
  const target = new Date(targetDate);

  if (target <= now) {
    return null;
  }

  let current = new Date(now);

  // Calculate months
  let months =
    (target.getFullYear() - current.getFullYear()) * 12 +
    (target.getMonth() - current.getMonth());

  const monthDate = new Date(current);
  monthDate.setMonth(monthDate.getMonth() + months);

  if (monthDate > target) {
    months--;

    monthDate.setMonth(monthDate.getMonth() - 1);
  }

  current.setMonth(current.getMonth() + months);

  // Remaining difference
  const diff = target.getTime() - current.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diff / (1000 * 60 * 60)) % 24
  );
  const minutes = Math.floor(
    (diff / (1000 * 60)) % 60
  );
  const seconds = Math.floor(
    (diff / 1000) % 60
  );

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
  };
};

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = calculateTimeLeft();

      if (!updated) {
        clearInterval(interval);
        onComplete?.();
      }

      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <div className={className}>
        <p>{finishedText}</p>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap justify-center gap-4 ${className}`}
    >
      <CountdownItem
        value={timeLeft.months}
        label={labels.months ?? "Months"}
      />

      <CountdownItem
        value={timeLeft.days}
        label={labels.days ?? "Days"}
      />

      <CountdownItem
        value={timeLeft.hours}
        label={labels.hours ?? "Hours"}
      />

      <CountdownItem
        value={timeLeft.minutes}
        label={labels.minutes ?? "Minutes"}
      />

      <CountdownItem
        value={timeLeft.seconds}
        label={labels.seconds ?? "Seconds"}
      />
    </div>
  );
}
