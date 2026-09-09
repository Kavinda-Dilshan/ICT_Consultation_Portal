import { CalendarCheck, LayoutDashboard, BookUser } from 'lucide-react';

export type View = 'student' | 'dashboard';

interface NavbarProps {
  view: View;
  onChange: (view: View) => void;
}

export default function Navbar({ view, onChange }: NavbarProps) {
  const tabs: { id: View; label: string; icon: typeof BookUser }[] = [
    { id: 'student', label: 'Student Portal', icon: BookUser },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3 py-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 shadow-lg shadow-sky-200">
            <CalendarCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-800">
              ICT Consultation Portal
            </h1>
            <p className="text-[11px] text-slate-500">University Booking System</p>
          </div>
        </div>

        {/* Tabs */}
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
      </div>
    </header>
  );
}
