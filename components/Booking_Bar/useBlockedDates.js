'use client';
import { useState, useEffect } from 'react';

export function useBlockedDates() {
  const [blocked, setBlocked] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatLocalDate = (date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  };

  // ✅ Fetch blocked dates from API
  const reloadBlockedDates = async () => {
    try {
      setLoading(true);
      const from = formatLocalDate(new Date());
      const to = formatLocalDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * 365));

      const res = await fetch(`/api/availability?from=${from}&to=${to}`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        setBlocked(json.blockedDates || []);
      }
      return true;
    } catch (err) {
      console.error('❌ Availability fetch error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on mount (page load)
  useEffect(() => {
    reloadBlockedDates();
  }, []);

  // ✅ Automatically re-fetch when the user refocuses the tab/window
  useEffect(() => {
    const handleFocus = () => reloadBlockedDates();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return { blocked, reloadBlockedDates, loading };
}
