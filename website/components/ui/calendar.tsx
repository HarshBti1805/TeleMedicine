"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  date: Date;
  color?: string;
}

interface CalendarProps {
  appointments: Appointment[];
  onDateSelect?: (date: Date) => void;
  onAppointmentClick?: (appointment: Appointment) => void;
}

export function Calendar({ appointments, onDateSelect, onAppointmentClick }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((apt) => isSameDay(apt.date, date));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-neutral-900 p-6">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
          <h2 className="text-2xl font-neue-bold text-white">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 bg-neutral-100">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-sm font-neue-bold text-neutral-900"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {days.map((day, idx) => {
          const dayAppointments = getAppointmentsForDate(day);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isDayToday = isToday(day);

          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 0.98 }}
              onClick={() => handleDateClick(day)}
              className={cn(
                "min-h-[100px] border-b border-r border-neutral-100 p-2 cursor-pointer transition-all duration-200",
                !isCurrentMonth && "bg-neutral-50/50",
                isSelected && "bg-neutral-100",
                isDayToday && "bg-neutral-100"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={cn(
                    "text-sm font-poppins",
                    !isCurrentMonth && "text-neutral-400",
                    isDayToday && "font-bold text-neutral-900",
                    isSelected && "text-neutral-900"
                  )}
                >
                  {format(day, "d")}
                </span>
                {isDayToday && (
                  <span className="text-xs bg-neutral-900 text-white px-2 py-0.5 rounded-full font-poppins">
                    Today
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {dayAppointments.slice(0, 2).map((apt) => (
                  <motion.div
                    key={apt.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAppointmentClick?.(apt);
                    }}
                    className={cn(
                      "text-xs p-1.5 rounded-lg truncate cursor-pointer transition-all",
                      apt.color || "bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
                    )}
                  >
                    <span className="font-semibold">{apt.time}</span> - {apt.patientName}
                  </motion.div>
                ))}
                {dayAppointments.length > 2 && (
                  <div className="text-xs text-neutral-700 font-medium pl-1">
                    +{dayAppointments.length - 2} more
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Date Details */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-neutral-100 overflow-hidden"
          >
            <div className="p-6 bg-neutral-50">
              <h3 className="font-neue-bold text-lg text-neutral-900 mb-4">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </h3>
              <div className="space-y-3">
                {getAppointmentsForDate(selectedDate).length > 0 ? (
                  getAppointmentsForDate(selectedDate).map((apt) => (
                    <motion.div
                      key={apt.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-neutral-200"
                    >
                      <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-white font-neue-bold">
                        {apt.patientName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-neue-bold text-neutral-900">{apt.patientName}</p>
                        <p className="text-sm text-neutral-600 font-poppins">{apt.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-neutral-900 font-semibold">
                          <Clock className="w-4 h-4" />
                          {apt.time}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-neutral-500 font-poppins text-center py-4">
                    No appointments scheduled for this day
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
