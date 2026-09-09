import { Inbox } from 'lucide-react';
import { useConsultations } from '@/context/ConsultationContext';
import AppointmentCard from '@/components/AppointmentCard';

export default function Dashboard() {
  const { consultations, loading, updateStatus } = useConsultations();

  const pending = consultations.filter((c) => c.status === 'pending');
  const resolved = consultations.filter((c) => c.status !== 'pending');

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Lecturer Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">
          Review and manage incoming consultation requests.
        </p>
      </div>

      {/* Stats bar */}
      <div className="mb-8 flex gap-4">
        <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 shadow-sm ring-1 ring-slate-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50">
            <Inbox className="h-5 w-5 text-sky-500" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-800">
              {consultations.length}
            </p>
            <p className="text-xs text-slate-400">Total Requests</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 shadow-sm ring-1 ring-slate-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-800">{pending.length}</p>
            <p className="text-xs text-slate-400">Pending</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-sky-500" />
          <p className="mt-4 text-sm">Loading appointments...</p>
        </div>
      ) : consultations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 shadow-sm ring-1 ring-slate-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
            <Inbox className="h-8 w-8 text-slate-300" />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500">
            No appointments yet
          </p>
          <p className="mt-1 text-xs text-slate-400">
            New bookings will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Pending section */}
          {pending.length > 0 && (
            <section>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Pending Requests
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pending.map((c) => (
                  <AppointmentCard
                    key={c.id}
                    consultation={c}
                    onApprove={(id) => updateStatus(id, 'approved')}
                    onDecline={(id) => updateStatus(id, 'declined')}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Resolved section */}
          {resolved.length > 0 && (
            <section>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Resolved
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {resolved.map((c) => (
                  <AppointmentCard
                    key={c.id}
                    consultation={c}
                    onApprove={(id) => updateStatus(id, 'approved')}
                    onDecline={(id) => updateStatus(id, 'declined')}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
