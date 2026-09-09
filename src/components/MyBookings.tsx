import { CalendarClock, Hash, GraduationCap, Inbox } from 'lucide-react';
import { useConsultations } from '@/context/ConsultationContext';
import type { ConsultationStatus } from '@/context/ConsultationContext';

const STATUS_STYLES: Record<ConsultationStatus, { label: string; class: string; dot: string }> = {
  pending: {
    label: 'Pending',
    class: 'bg-amber-50 text-amber-600 ring-amber-200',
    dot: 'bg-amber-400',
  },
  approved: {
    label: 'Approved',
    class: 'bg-emerald-50 text-emerald-600 ring-emerald-200',
    dot: 'bg-emerald-500',
  },
  declined: {
    label: 'Declined',
    class: 'bg-red-50 text-red-500 ring-red-200',
    dot: 'bg-red-400',
  },
};

export default function MyBookings() {
  const { consultations, loading } = useConsultations();

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 sm:p-8">
      <div className="mb-5 flex items-center gap-2.5">
        <CalendarClock className="h-5 w-5 text-sky-500" />
        <h3 className="text-base font-bold text-slate-800">My Bookings</h3>
        {consultations.length > 0 && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
            {consultations.length}
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-sky-500" />
        </div>
      ) : consultations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-50">
            <Inbox className="h-7 w-7 text-slate-300" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-500">
            No bookings yet
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Your submitted appointments will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {consultations.map((c) => {
            const status = STATUS_STYLES[c.status];
            const dateObj = new Date(c.appointment_at);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
            const formattedTime = dateObj.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            });

            return (
              <div
                key={c.id}
                className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50"
              >
                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm font-bold text-sky-600 ring-1 ring-sky-100">
                  {c.student_name.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="truncate text-sm font-semibold text-slate-800">
                      {c.student_name}
                    </h4>
                    <span
                      className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${status.class}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Hash className="h-3.5 w-3.5 text-slate-400" />
                      {c.student_index}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                      {c.lecturer}
                    </span>
                  </div>

                  <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <CalendarClock className="h-3.5 w-3.5 text-slate-400" />
                    {formattedDate} at {formattedTime}
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {c.reason}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
