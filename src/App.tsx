import { useState } from 'react';
import Navbar from '@/components/Navbar';
import type { Role, View } from '@/components/Navbar';
import BookingForm from '@/components/BookingForm';
import Toast from '@/components/Toast';
import Dashboard from '@/components/Dashboard';
import MyBookings from '@/components/MyBookings';
import RoleSelect from '@/components/RoleSelect';
import { ConsultationProvider } from '@/context/ConsultationContext';

function StudentPortal({
  onSuccess,
  onConflict,
}: {
  onSuccess: () => void;
  onConflict: () => void;
}) {
  return (
    <main className="px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-lg space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 sm:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-800">
              Book a Consultation
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Schedule a one-on-one session with your lecturer. Fill in the
              details below.
            </p>
          </div>

          <BookingForm onSuccess={onSuccess} onConflict={onConflict} />
        </div>

        <MyBookings />

        <p className="text-center text-xs text-slate-400">
          You'll receive confirmation once the lecturer approves your request.
        </p>
      </div>
    </main>
  );
}

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [view, setView] = useState<View>('student');
  const [toast, setToast] = useState<{
    message: string;
    variant: 'success' | 'error';
  } | null>(null);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setView(selectedRole === 'lecturer' ? 'dashboard' : 'student');
  };

  const handleViewChange = (nextView: View) => {
    if (role === 'student' && nextView === 'dashboard') return;
    setView(nextView);
  };

  if (!role) {
    return <RoleSelect onSelect={handleRoleSelect} />;
  }

  return (
    <ConsultationProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100">
        <Navbar
          role={role}
          view={view}
          onChange={handleViewChange}
          onSignOut={() => {
            setRole(null);
            setView('student');
          }}
        />

        {view === 'student' ? (
          <StudentPortal
            onSuccess={() =>
              setToast({
                message: 'Appointment booked successfully!',
                variant: 'success',
              })
            }
            onConflict={() =>
              setToast({
                message: 'This time slot is already taken.',
                variant: 'error',
              })
            }
          />
        ) : role === 'lecturer' ? (
          <Dashboard />
        ) : (
          <StudentPortal
            onSuccess={() =>
              setToast({
                message: 'Appointment booked successfully!',
                variant: 'success',
              })
            }
            onConflict={() =>
              setToast({
                message: 'This time slot is already taken.',
                variant: 'error',
              })
            }
          />
        )}

        <Toast
          message={toast?.message ?? ''}
          variant={toast?.variant}
          visible={!!toast}
          onClose={() => setToast(null)}
        />
      </div>
    </ConsultationProvider>
  );
}
