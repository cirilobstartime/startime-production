"use client";
import React, { useState, useEffect, useRef } from "react";

function AnimatedNumber({ target }: { target: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const match = target.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplay(target);
      return;
    }
    const num = parseInt(match[1]);
    const suffix = match[2] || "";

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const stepTime = duration / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += num / steps;
            if (current >= num) {
              setDisplay(`${num}${suffix}`);
              clearInterval(timer);
            } else {
              setDisplay(`${Math.floor(current)}${suffix}`);
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{display}</span>;
}

export default function SolutionsStats({
  description,
  items,
}: {
  description: string;
  items: any[];
}) {
  return (
    <section className="relative w-full py-24 bg-black">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto mb-20">
          <p
            className="text-white text-xl md:text-2xl lg:text-3xl font-medium"
            style={{
              lineHeight: "1.5",
              whiteSpace: "pre-line",
            }}
          >
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
          {items.map((stat, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <span className="text-7xl md:text-8xl font-bold text-white tracking-tighter">
                <AnimatedNumber target={stat.num} />
              </span>
              <span className="text-white text-lg md:text-xl font-sans uppercase tracking-wide">
                {stat.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
