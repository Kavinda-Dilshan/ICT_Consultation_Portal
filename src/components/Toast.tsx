import { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  visible: boolean;
  variant?: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({
  message,
  visible,
  variant = 'success',
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  const isError = variant === 'error';
  const Icon = isError ? XCircle : CheckCircle2;
  const iconColor = isError ? 'text-red-500' : 'text-emerald-500';
  const ringColor = isError ? 'ring-red-200' : 'ring-emerald-200';

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-2xl ring-1 ${ringColor} transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Icon className={`h-6 w-6 shrink-0 ${iconColor}`} />
      <p className="text-sm font-medium text-slate-800">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
