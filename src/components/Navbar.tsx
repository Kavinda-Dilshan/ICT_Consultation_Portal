import { CalendarCheck, LayoutDashboard, BookUser, LogOut } from 'lucide-react';

export type Role = 'student' | 'lecturer';
export type View = 'student' | 'dashboard';

interface NavbarProps {
  role: Role;
  view: View;
  onChange: (view: View) => void;
  onSignOut: () => void;
}

export default function Navbar({ role, view, onChange, onSignOut }: NavbarProps) {
  const tabs: { id: View; label: string; icon: typeof BookUser }[] = [
    { id: 'student', label: 'Student Portal', icon: BookUser },
    ...(role === 'lecturer'
      ? [{ id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 py-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-600 shadow-lg shadow-sky-200">
            <CalendarCheck className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold text-slate-800">
              ICT Consultation Portal
            </h1>
            <p className="text-[11px] text-slate-500">University Booking System</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = view === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onChange(tab.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 sm:px-4 sm:text-sm ${
                    active
                      ? 'bg-white text-sky-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            onClick={onSignOut}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
