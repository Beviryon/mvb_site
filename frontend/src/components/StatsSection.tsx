'use client';

import { useState, useEffect } from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  TrophyIcon,
  CurrencyEuroIcon,
} from '@heroicons/react/24/outline';

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: 'home' | 'users' | 'trophy' | 'euro';
}

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const iconMap = {
  home: HomeIcon,
  users: UserGroupIcon,
  trophy: TrophyIcon,
  euro: CurrencyEuroIcon,
};

export default function StatsSection({
  stats,
  title = 'Nos chiffres clés',
  subtitle = 'Découvrez notre expertise en chiffres',
  className = '',
}: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedValues, setDisplayedValues] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const timers = stats.map((stat) => {
      const increment = stat.value / steps;
      let currentValue = 0;

      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= stat.value) {
          currentValue = stat.value;
        }
        setDisplayedValues((prev) => ({
          ...prev,
          [stat.id]: Math.round(currentValue),
        }));
      }, interval);
    });

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [isVisible, stats]);

  return (
    <section id="stats-section" className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon];
            return (
              <div
                key={stat.id}
                className="relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#800000] text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {displayedValues[stat.id] || 0}
                      {stat.suffix}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 