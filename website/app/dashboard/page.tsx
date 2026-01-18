'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Calendar, type Appointment } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Calendar as CalendarIcon,
  FileText,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  Clock,
  Video,
  Pill,
  Search,
  Plus,
  ChevronRight,
  Stethoscope,
  Home,
  User,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Patients',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      title: "Today's Appointments",
      value: '18',
      change: '3 upcoming',
      changeType: 'neutral',
      icon: CalendarIcon,
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Pending Prescriptions',
      value: '7',
      change: 'Requires action',
      changeType: 'warning',
      icon: Pill,
      gradient: 'from-yellow-500 to-orange-600',
    },
    {
      title: 'Monthly Revenue',
      value: '$45,600',
      change: '+8%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600',
    },
  ];

  // Sample appointments data
  const appointments: Appointment[] = [
    { id: '1', patientName: 'Sarah Johnson', time: '9:00 AM', type: 'Consultation', date: new Date(), color: 'bg-indigo-100 text-indigo-700' },
    { id: '2', patientName: 'Michael Chen', time: '10:30 AM', type: 'Follow-up', date: new Date(), color: 'bg-blue-100 text-blue-700' },
    { id: '3', patientName: 'Emily Davis', time: '11:15 AM', type: 'Check-up', date: new Date(), color: 'bg-purple-100 text-purple-700' },
    { id: '4', patientName: 'Robert Wilson', time: '2:00 PM', type: 'Consultation', date: new Date(), color: 'bg-indigo-100 text-indigo-700' },
    { id: '5', patientName: 'Lisa Anderson', time: '3:30 PM', type: 'Video Call', date: new Date(), color: 'bg-green-100 text-green-700' },
    // Tomorrow's appointments
    { id: '6', patientName: 'James Brown', time: '9:30 AM', type: 'Consultation', date: new Date(Date.now() + 86400000), color: 'bg-indigo-100 text-indigo-700' },
    { id: '7', patientName: 'Patricia Garcia', time: '11:00 AM', type: 'Follow-up', date: new Date(Date.now() + 86400000), color: 'bg-blue-100 text-blue-700' },
    // Day after tomorrow
    { id: '8', patientName: 'David Martinez', time: '10:00 AM', type: 'Check-up', date: new Date(Date.now() + 172800000), color: 'bg-purple-100 text-purple-700' },
    { id: '9', patientName: 'Jennifer Lee', time: '2:30 PM', type: 'Video Call', date: new Date(Date.now() + 172800000), color: 'bg-green-100 text-green-700' },
    { id: '10', patientName: 'William Taylor', time: '4:00 PM', type: 'Consultation', date: new Date(Date.now() + 172800000), color: 'bg-indigo-100 text-indigo-700' },
  ];

  const appointmentData = [
    { name: 'Mon', appointments: 12 },
    { name: 'Tue', appointments: 19 },
    { name: 'Wed', appointments: 15 },
    { name: 'Thu', appointments: 22 },
    { name: 'Fri', appointments: 18 },
    { name: 'Sat', appointments: 8 },
    { name: 'Sun', appointments: 5 },
  ];

  const patientAgeData = [
    { name: '0-18', value: 15 },
    { name: '19-35', value: 35 },
    { name: '36-50', value: 28 },
    { name: '51-65', value: 18 },
    { name: '65+', value: 4 },
  ];

  const COLORS = ['#6366F1', '#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe'];

  const sidebarItems = [
    { icon: Home, label: 'Overview', id: 'overview' },
    { icon: CalendarIcon, label: 'Calendar', id: 'calendar' },
    { icon: Users, label: 'Patients', id: 'patients' },
    { icon: Video, label: 'Consultations', id: 'consultations' },
    { icon: Pill, label: 'Prescriptions', id: 'prescriptions' },
    { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  ];

  const upcomingAppointments = appointments.filter(apt => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const aptDate = new Date(apt.date);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate.getTime() === today.getTime();
  }).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-72 bg-white/70 backdrop-blur-xl border-r border-white/30 p-6 flex flex-col fixed h-full z-40"
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-neue-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Tele-Medicine
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 5 }}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-poppins transition-all duration-200",
                activeTab === item.id
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-indigo-50"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </motion.button>
          ))}
        </nav>

        <div className="pt-6 border-t border-gray-200 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-indigo-50 font-poppins transition-all">
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <Link href="/">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-poppins transition-all">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-neue-bold text-gray-900">
              Good Morning, Dr. Smith
            </h1>
            <p className="text-gray-600 font-poppins mt-1">
              Here's what's happening with your practice today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patients..."
                className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm font-poppins focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-64"
              />
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </Button>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-neue-bold shadow-lg">
              DS
            </div>
          </div>
        </motion.header>

        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-poppins text-sm">{stat.title}</h3>
                    <div className={cn("p-3 rounded-xl bg-gradient-to-br shadow-lg", stat.gradient)}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-neue-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className={cn(
                    "text-sm font-poppins",
                    stat.changeType === 'positive' && "text-green-600",
                    stat.changeType === 'warning' && "text-yellow-600",
                    stat.changeType === 'neutral' && "text-blue-600"
                  )}>
                    {stat.change}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Charts and Appointments */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Weekly Appointments Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-neue-bold text-gray-900">Weekly Appointments</h3>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-poppins">+15% this week</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={appointmentData}>
                    <defs>
                      <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="appointments"
                      stroke="#6366F1"
                      strokeWidth={3}
                      fill="url(#colorAppointments)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Upcoming Appointments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-neue-bold text-gray-900">Upcoming</h3>
                  <Button variant="ghost" size="sm" className="text-indigo-600">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {upcomingAppointments.map((apt, idx) => (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-indigo-50/50 transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-neue-bold text-sm">
                        {apt.patientName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-neue-bold text-gray-900 truncate">{apt.patientName}</p>
                        <p className="text-xs text-gray-500 font-poppins">{apt.type}</p>
                      </div>
                      <div className="flex items-center gap-1 text-indigo-600">
                        <Clock className="w-3 h-3" />
                        <span className="text-sm font-poppins">{apt.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Patient Age Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl"
              >
                <h3 className="text-xl font-neue-bold text-gray-900 mb-6">Patient Demographics</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={patientAgeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {patientAgeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {patientAgeData.map((entry, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                      <span className="text-sm text-gray-600 font-poppins">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl"
              >
                <h3 className="text-xl font-neue-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Plus, label: 'New Appointment', color: 'from-indigo-500 to-purple-600' },
                    { icon: User, label: 'Add Patient', color: 'from-blue-500 to-cyan-600' },
                    { icon: Video, label: 'Start Consultation', color: 'from-green-500 to-emerald-600' },
                    { icon: FileText, label: 'Write Prescription', color: 'from-purple-500 to-pink-600' },
                  ].map((action, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-purple-50 border border-gray-200 hover:border-indigo-200 transition-all"
                    >
                      <div className={cn("p-3 rounded-xl bg-gradient-to-br shadow-lg", action.color)}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-poppins text-gray-700 text-sm">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}

        {activeTab === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            <div className="xl:col-span-2">
              <Calendar
                appointments={appointments}
                onDateSelect={setSelectedDate}
                onAppointmentClick={(apt) => console.log('Clicked:', apt)}
              />
            </div>
            
            <div className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-xl border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-indigo-600" />
                    Quick Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-4">
                    <Plus className="w-4 h-4 mr-2" />
                    New Appointment
                  </Button>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                      <p className="font-poppins text-sm text-gray-600">Today's Schedule</p>
                      <p className="font-neue-bold text-2xl text-indigo-600">5 Appointments</p>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-50 border border-purple-100">
                      <p className="font-poppins text-sm text-gray-600">This Week</p>
                      <p className="font-neue-bold text-2xl text-purple-600">23 Appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-xl border-white/30">
                <CardHeader>
                  <CardTitle>Appointment Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { type: 'Consultation', count: 45, color: 'bg-indigo-100 text-indigo-700' },
                    { type: 'Follow-up', count: 32, color: 'bg-blue-100 text-blue-700' },
                    { type: 'Check-up', count: 28, color: 'bg-purple-100 text-purple-700' },
                    { type: 'Video Call', count: 18, color: 'bg-green-100 text-green-700' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <span className={cn("px-2 py-1 rounded-lg text-sm font-poppins", item.color)}>
                        {item.type}
                      </span>
                      <span className="font-neue-bold text-gray-900">{item.count}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
