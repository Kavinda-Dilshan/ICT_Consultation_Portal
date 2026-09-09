import { CalendarCheck, GraduationCap, BookUser, ArrowRight } from 'lucide-react';

export type Role = 'student' | 'lecturer';

interface RoleSelectProps {
  onSelect: (role: Role) => void;
}

export default function RoleSelect({ onSelect }: RoleSelectProps) {
  const roles: {
    id: Role;
    label: string;
    description: string;
    icon: typeof BookUser;
    accent: string;
    ring: string;
    iconBg: string;
  }[] = [
    {
      id: 'student',
      label: 'Student',
      description: 'Book consultations and track your appointments.',
      icon: BookUser,
      accent: 'group-hover:border-sky-400 group-hover:bg-sky-50/50',
      ring: 'group-hover:ring-sky-100',
      iconBg: 'bg-sky-50 text-sky-600 group-hover:bg-sky-100',
    },
    {
      id: 'lecturer',
      label: 'Lecturer',
      description: 'Review and manage incoming consultation requests.',
      icon: GraduationCap,
      accent: 'group-hover:border-emerald-400 group-hover:bg-emerald-50/50',
      ring: 'group-hover:ring-emerald-100',
      iconBg: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100',
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 shadow-lg shadow-sky-200">
            <CalendarCheck className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">
            ICT Consultation Portal
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            University Booking System
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 sm:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-slate-800">
              Select Your Role
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              Choose how you'd like to continue.
            </p>
          </div>

          <div className="space-y-3">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => onSelect(role.id)}
                  className={`group flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left ring-1 ring-transparent transition-all duration-200 hover:shadow-md active:scale-[0.99] ${role.accent} ${role.ring}`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${role.iconBg}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-800">
                      {role.label}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {role.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          You can switch roles by signing out from the navigation bar.
        </p>
      </div>
    </div>
  );
}
