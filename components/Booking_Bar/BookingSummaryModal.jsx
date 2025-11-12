'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle2, Loader2 } from 'lucide-react';

/* =================== BOOKING SUMMARY MODAL =================== */
export function BookingSummaryModal({ summary, onClose, reloadBlockedDates }) {
  const [loading, setLoading] = useState(false);

  if (!summary) return null;

  const { name, email, phone, checkIn, checkOut, adults, children, amount, nights, orderId } =
    summary;

  const handleClose = async () => {
    try {
      setLoading(true);
      await reloadBlockedDates(); // ✅ fetch new blocked dates
      // Wait a moment to ensure UI updates smoothly
      await new Promise((resolve) => setTimeout(resolve, 800));
      onClose(); // ✅ Close modal (reactive update only)
    } catch (err) {
      console.error('❌ Failed to reload blocked dates:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!summary} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-6 h-6" /> Booking Confirmed
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-gray-800">
          <p>
            Thank you, <strong>{name}</strong>! Your stay is confirmed.
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              📅 <strong>{nights}</strong> nights: {new Date(checkIn).toLocaleDateString()} →{' '}
              {new Date(checkOut).toLocaleDateString()}
            </li>
            <li>👨‍👩‍👧 {adults} adults, {children} children</li>
            <li>💰 ₹{(amount / 100).toFixed(2)}</li>
            <li>📧 {email}</li>
            <li>📞 {phone}</li>
            <li>🧾 Order ID: {orderId}</li>
          </ul>

          <Button
            onClick={handleClose}
            disabled={loading}
            className={`mt-4 w-full text-white font-semibold flex items-center justify-center gap-2 ${
              loading
                ? 'bg-green-400 cursor-wait'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Refreshing Availability...
              </>
            ) : (
              'Close & Refresh'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
