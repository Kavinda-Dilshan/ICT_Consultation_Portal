import { useState } from 'react';
import {
  User,
  Hash,
  GraduationCap,
  Calendar,
  Clock,
  MessageSquare,
  Send,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useConsultations } from '@/context/ConsultationContext';

const LECTURERS = [
  'Dr. Samantha Perera',
  'Prof. Rohan Wijesekara',
  'Dr. Nuwan Silva',
];

interface BookingFormProps {
  onSuccess: () => void;
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const { addConsultation } = useConsultations();
  const [studentName, setStudentName] = useState('');
  const [studentIndex, setStudentIndex] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [indexTouched, setIndexTouched] = useState(false);

  const indexError = indexTouched && !studentIndex.trim();

  const resetForm = () => {
    setStudentName('');
    setStudentIndex('');
    setLecturer('');
    setDate('');
    setTime('');
    setReason('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentIndex.trim()) {
      setIndexTouched(true);
      return;
    }

    setSubmitting(true);
    const appointmentAt = new Date(`${date}T${time}`).toISOString();

    const { data, error: insertError } = await supabase
      .from('consultations')
      .insert({
        student_name: studentName,
        student_index: studentIndex,
        lecturer,
        appointment_at: appointmentAt,
        reason,
      })
      .select()
      .single();

    setSubmitting(false);

    if (insertError || !data) {
      setError('Something went wrong while booking. Please try again.');
      return;
    }

    addConsultation(data as never);
    resetForm();
    onSuccess();
  };

  const inputBase =
    'w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Student Name */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Student Name
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Name"
            required
            className={inputBase}
          />
        </div>
      </div>

      {/* Student Index Number */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Student Index Number
        </label>
        <div className="relative">
          <Hash className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={studentIndex}
            onChange={(e) => {
              setStudentIndex(e.target.value);
              if (e.target.value.trim()) setIndexTouched(false);
            }}
            onBlur={() => setIndexTouched(true)}
            placeholder="ICT/XX/XXX"
            required
            className={`${inputBase} ${
              indexError
                ? 'border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-red-100'
                : ''
            }`}
          />
        </div>
        {indexError && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            Student Index Number is required.
          </p>
        )}
      </div>

      {/* Lecturer Select */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Lecturer
        </label>
        <div className="relative">
          <GraduationCap className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <select
            value={lecturer}
            onChange={(e) => setLecturer(e.target.value)}
            required
            className={`${inputBase} appearance-none pr-10 ${
              lecturer ? 'text-slate-800' : 'text-slate-400'
            }`}
          >
            <option value="" disabled>
              Select a lecturer
            </option>
            {LECTURERS.map((name) => (
              <option key={name} value={name} className="text-slate-800">
                {name}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Date
          </label>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className={inputBase}
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Time
          </label>
          <div className="relative">
            <Clock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className={inputBase}
            />
          </div>
        </div>
      </div>

      {/* Reason */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Reason for Consultation
        </label>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute left-3.5 top-4 h-5 w-5 text-slate-400" />
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Briefly describe what you'd like to discuss..."
            required
            rows={4}
            className={`${inputBase} resize-none pt-3`}
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition-all duration-200 hover:bg-sky-700 hover:shadow-sky-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Booking...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Book Appointment
          </>
        )}
      </button>
    </form>
  );
}
