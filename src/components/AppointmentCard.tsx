import {
  User,
  Hash,
  Calendar,
  Clock,
  MessageSquare,
  Check,
  X,
  Loader2,
} from 'lucide-react';
import { useState } from 'react';
import type { Consultation } from '@/context/ConsultationContext';
import type { ConsultationStatus } from '@/context/ConsultationContext';

interface AppointmentCardProps {
  consultation: Consultation;
  onApprove: (id: string) => void;
  onDecline: (id: string) => void;
}

const STATUS_STYLES: Record<ConsultationStatus, { label: string; class: string }> = {
  pending: { label: 'Pending', class: 'bg-amber-50 text-amber-600 ring-amber-200' },
  approved: { label: 'Approved', class: 'bg-emerald-50 text-emerald-600 ring-emerald-200' },
  declined: { label: 'Declined', class: 'bg-red-50 text-red-500 ring-red-200' },
};

export default function AppointmentCard({
  consultation,
  onApprove,
  onDecline,
}: AppointmentCardProps) {
  const [updating, setUpdating] = useState(false);
  const status = STATUS_STYLES[consultation.status];

  const handleAction = (action: 'approve' | 'decline') => {
    setUpdating(true);
    if (action === 'approve') onApprove(consultation.id);
    else onDecline(consultation.id);
    setTimeout(() => setUpdating(false), 400);
  };

  const dateObj = new Date(consultation.appointment_at);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const resolved = consultation.status !== 'pending';

  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/40 ring-1 ring-slate-100 transition-all duration-200 hover:shadow-xl hover:shadow-slate-200/50">
      {/* Header: student + status */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm font-bold text-sky-600 ring-1 ring-sky-100">
            {consultation.student_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              {consultation.student_name}
            </h3>
            <p className="text-xs text-slate-400">{consultation.lecturer}</p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${status.class}`}
        >
          {status.label}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2.5 text-sm">
        <div className="flex items-center gap-2.5 text-slate-600">
          <Hash className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="font-medium">{consultation.student_index}</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-600">
          <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-600">
          <Clock className="h-4 w-4 shrink-0 text-slate-400" />
          <span>{formattedTime}</span>
        </div>
        <div className="flex items-start gap-2.5 pt-1 text-slate-600">
          <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <p className="leading-relaxed">{consultation.reason}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
        {resolved ? (
          <div className="flex w-full items-center justify-center gap-2 py-1.5 text-sm font-medium text-slate-400">
            {consultation.status === 'approved' ? (
              <>
                <Check className="h-4 w-4 text-emerald-500" />
                Approved
              </>
            ) : (
              <>
                <X className="h-4 w-4 text-red-400" />
                Declined
              </>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => handleAction('approve')}
              disabled={updating}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-300 py-2.5 text-sm font-semibold text-emerald-600 transition-all duration-200 hover:bg-emerald-50 active:scale-[0.98] disabled:opacity-50"
            >
              {updating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              Approve
            </button>
            <button
              onClick={() => handleAction('decline')}
              disabled={updating}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-300 py-2.5 text-sm font-semibold text-red-500 transition-all duration-200 hover:bg-red-50 active:scale-[0.98] disabled:opacity-50"
            >
              {updating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )}
              Decline
            </button>
          </>
        )}
      </div>
    </div>
  );
}
