'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = 'default' }) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((s) => [...s, { id, title, description, variant }]);

    setTimeout(() => {
      setToasts((s) => s.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const ToastView = () => (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22 }}
            className={`px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${
              t.variant === 'destructive' ? 'bg-red-600' : 'bg-green-600'
            }`}
          >
            <div>{t.title}</div>
            {t.description && <div className="opacity-90 text-xs">{t.description}</div>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  return { toast, ToastView };
}
