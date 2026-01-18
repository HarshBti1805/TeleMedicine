'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
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
  LineChart,
  Line,
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
  MessageCircle,
  Phone,
  VideoIcon,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  ChevronLeft,
  Mail,
  Heart,
  Activity,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Monitor,
  Filter,
  Download,
  Eye,
  Edit,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Patient interface
interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  address: string;
  lastVisit: string;
  condition: string;
  status: 'Active' | 'Inactive' | 'Critical';
  avatar?: string;
}

// Chat message interface
interface ChatMessage {
  id: string;
  sender: 'doctor' | 'patient';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
}

// Prescription interface
interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  date: string;
  status: 'Active' | 'Completed' | 'Cancelled';
  notes?: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [consultationMode, setConsultationMode] = useState<'chat' | 'video' | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [patientFilter, setPatientFilter] = useState<'all' | 'active' | 'inactive' | 'critical'>('all');
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // Sample patients data
  const patients: Patient[] = useMemo(() => [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 234 567 8901', age: 32, gender: 'Female', bloodType: 'A+', address: '123 Main St, New York', lastVisit: '2024-01-15', condition: 'Diabetes Type 2', status: 'Active' },
    { id: '2', name: 'Michael Chen', email: 'michael.c@email.com', phone: '+1 234 567 8902', age: 45, gender: 'Male', bloodType: 'B+', address: '456 Oak Ave, Los Angeles', lastVisit: '2024-01-14', condition: 'Hypertension', status: 'Active' },
    { id: '3', name: 'Emily Davis', email: 'emily.d@email.com', phone: '+1 234 567 8903', age: 28, gender: 'Female', bloodType: 'O-', address: '789 Pine Rd, Chicago', lastVisit: '2024-01-13', condition: 'Anxiety Disorder', status: 'Active' },
    { id: '4', name: 'Robert Wilson', email: 'robert.w@email.com', phone: '+1 234 567 8904', age: 55, gender: 'Male', bloodType: 'AB+', address: '321 Elm St, Houston', lastVisit: '2024-01-12', condition: 'Heart Disease', status: 'Critical' },
    { id: '5', name: 'Lisa Anderson', email: 'lisa.a@email.com', phone: '+1 234 567 8905', age: 38, gender: 'Female', bloodType: 'A-', address: '654 Maple Dr, Phoenix', lastVisit: '2024-01-10', condition: 'Asthma', status: 'Active' },
    { id: '6', name: 'James Brown', email: 'james.b@email.com', phone: '+1 234 567 8906', age: 62, gender: 'Male', bloodType: 'O+', address: '987 Cedar Ln, Philadelphia', lastVisit: '2024-01-08', condition: 'Arthritis', status: 'Inactive' },
    { id: '7', name: 'Patricia Garcia', email: 'patricia.g@email.com', phone: '+1 234 567 8907', age: 41, gender: 'Female', bloodType: 'B-', address: '147 Birch Blvd, San Antonio', lastVisit: '2024-01-05', condition: 'Migraine', status: 'Active' },
    { id: '8', name: 'David Martinez', email: 'david.m@email.com', phone: '+1 234 567 8908', age: 35, gender: 'Male', bloodType: 'A+', address: '258 Walnut Way, San Diego', lastVisit: '2024-01-03', condition: 'Back Pain', status: 'Active' },
    { id: '9', name: 'Jennifer Lee', email: 'jennifer.l@email.com', phone: '+1 234 567 8909', age: 29, gender: 'Female', bloodType: 'AB-', address: '369 Spruce St, Dallas', lastVisit: '2024-01-01', condition: 'Allergies', status: 'Inactive' },
    { id: '10', name: 'William Taylor', email: 'william.t@email.com', phone: '+1 234 567 8910', age: 48, gender: 'Male', bloodType: 'O+', address: '741 Oak Dr, San Jose', lastVisit: '2023-12-28', condition: 'COPD', status: 'Critical' },
  ], []);

  // Sample chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'patient', content: 'Hello Dr. Smith, I have been experiencing some headaches lately.', timestamp: '10:30 AM', type: 'text' },
    { id: '2', sender: 'doctor', content: 'Hello! I am sorry to hear that. How long have you been experiencing these headaches?', timestamp: '10:32 AM', type: 'text' },
    { id: '3', sender: 'patient', content: 'It started about a week ago. They usually occur in the afternoon.', timestamp: '10:33 AM', type: 'text' },
    { id: '4', sender: 'doctor', content: 'I see. Are you staying hydrated? Sometimes dehydration can cause afternoon headaches.', timestamp: '10:35 AM', type: 'text' },
    { id: '5', sender: 'patient', content: 'I try to drink water but maybe not enough. I will try to increase my intake.', timestamp: '10:36 AM', type: 'text' },
  ]);

  // Sample prescriptions data
  const prescriptions: Prescription[] = useMemo(() => [
    { id: '1', patientName: 'Sarah Johnson', patientId: '1', medication: 'Metformin 500mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '30 days', date: '2024-01-15', status: 'Active', notes: 'Take with meals' },
    { id: '2', patientName: 'Michael Chen', patientId: '2', medication: 'Lisinopril 10mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days', date: '2024-01-14', status: 'Active', notes: 'Take in the morning' },
    { id: '3', patientName: 'Emily Davis', patientId: '3', medication: 'Sertraline 50mg', dosage: '1 tablet', frequency: 'Once daily', duration: '60 days', date: '2024-01-13', status: 'Active', notes: 'Take with or without food' },
    { id: '4', patientName: 'Robert Wilson', patientId: '4', medication: 'Aspirin 81mg', dosage: '1 tablet', frequency: 'Once daily', duration: '90 days', date: '2024-01-12', status: 'Active', notes: 'Take with food' },
    { id: '5', patientName: 'Lisa Anderson', patientId: '5', medication: 'Albuterol Inhaler', dosage: '2 puffs', frequency: 'As needed', duration: '30 days', date: '2024-01-10', status: 'Active', notes: 'Use for shortness of breath' },
    { id: '6', patientName: 'James Brown', patientId: '6', medication: 'Ibuprofen 400mg', dosage: '1 tablet', frequency: 'Three times daily', duration: '14 days', date: '2024-01-08', status: 'Completed' },
    { id: '7', patientName: 'Patricia Garcia', patientId: '7', medication: 'Sumatriptan 50mg', dosage: '1 tablet', frequency: 'As needed', duration: '30 days', date: '2024-01-05', status: 'Active', notes: 'Take at onset of migraine' },
  ], []);

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
      title: 'Today&apos;s Appointments',
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

  // Use useMemo to avoid impure function calls during render
  const appointments: Appointment[] = useMemo(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    return [
      { id: '1', patientName: 'Sarah Johnson', time: '9:00 AM', type: 'Consultation', date: today, color: 'bg-indigo-100 text-indigo-700' },
      { id: '2', patientName: 'Michael Chen', time: '10:30 AM', type: 'Follow-up', date: today, color: 'bg-blue-100 text-blue-700' },
      { id: '3', patientName: 'Emily Davis', time: '11:15 AM', type: 'Check-up', date: today, color: 'bg-purple-100 text-purple-700' },
      { id: '4', patientName: 'Robert Wilson', time: '2:00 PM', type: 'Consultation', date: today, color: 'bg-indigo-100 text-indigo-700' },
      { id: '5', patientName: 'Lisa Anderson', time: '3:30 PM', type: 'Video Call', date: today, color: 'bg-green-100 text-green-700' },
      { id: '6', patientName: 'James Brown', time: '9:30 AM', type: 'Consultation', date: tomorrow, color: 'bg-indigo-100 text-indigo-700' },
      { id: '7', patientName: 'Patricia Garcia', time: '11:00 AM', type: 'Follow-up', date: tomorrow, color: 'bg-blue-100 text-blue-700' },
      { id: '8', patientName: 'David Martinez', time: '10:00 AM', type: 'Check-up', date: dayAfter, color: 'bg-purple-100 text-purple-700' },
      { id: '9', patientName: 'Jennifer Lee', time: '2:30 PM', type: 'Video Call', date: dayAfter, color: 'bg-green-100 text-green-700' },
      { id: '10', patientName: 'William Taylor', time: '4:00 PM', type: 'Consultation', date: dayAfter, color: 'bg-indigo-100 text-indigo-700' },
    ];
  }, []);

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

  const revenueData = [
    { name: 'Jan', revenue: 42000, patients: 180 },
    { name: 'Feb', revenue: 38000, patients: 165 },
    { name: 'Mar', revenue: 45000, patients: 195 },
    { name: 'Apr', revenue: 41000, patients: 175 },
    { name: 'May', revenue: 48000, patients: 210 },
    { name: 'Jun', revenue: 45600, patients: 200 },
  ];

  const consultationTypeData = [
    { name: 'In-Person', value: 45 },
    { name: 'Video Call', value: 35 },
    { name: 'Phone', value: 20 },
  ];

  const COLORS = ['#6366F1', '#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe'];
  const CONSULTATION_COLORS = ['#6366F1', '#10b981', '#f59e0b'];

  const sidebarItems = [
    { icon: Home, label: 'Overview', id: 'overview' },
    { icon: CalendarIcon, label: 'Calendar', id: 'calendar' },
    { icon: Users, label: 'Patients', id: 'patients' },
    { icon: Video, label: 'Consultations', id: 'consultations' },
    { icon: Pill, label: 'Prescriptions', id: 'prescriptions' },
    { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  ];

  const upcomingAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);
      return aptDate.getTime() === today.getTime();
    }).slice(0, 4);
  }, [appointments]);

  // Filter patients based on search and filter
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = patientFilter === 'all' || patient.status.toLowerCase() === patientFilter;
      return matchesSearch && matchesFilter;
    });
  }, [patients, searchQuery, patientFilter]);

  // Handle sending chat message
  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: String(chatMessages.length + 1),
        sender: 'doctor',
        content: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
    }
  };

  // Handle patient selection for consultation
  const handleStartConsultation = (patient: Patient, mode: 'chat' | 'video') => {
    setSelectedPatient(patient);
    setConsultationMode(mode);
    if (mode === 'video') {
      setIsVideoCallActive(true);
    }
  };

  // Handle ending video call
  const handleEndCall = () => {
    setIsVideoCallActive(false);
    setConsultationMode(null);
    setIsMuted(false);
    setIsVideoOff(false);
  };

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
            Synapse-TeleMedicine
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
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
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
                  Here&apos;s what&apos;s happening with your practice today.
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
                    <h3 className="text-gray-600 font-poppins text-sm" dangerouslySetInnerHTML={{ __html: stat.title }} />
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
                    { icon: Plus, label: 'New Appointment', color: 'from-indigo-500 to-purple-600', action: () => setActiveTab('calendar') },
                    { icon: User, label: 'Add Patient', color: 'from-blue-500 to-cyan-600', action: () => setActiveTab('patients') },
                    { icon: Video, label: 'Start Consultation', color: 'from-green-500 to-emerald-600', action: () => setActiveTab('consultations') },
                    { icon: FileText, label: 'Write Prescription', color: 'from-purple-500 to-pink-600', action: () => setActiveTab('prescriptions') },
                  ].map((action, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={action.action}
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

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <>
            {/* Header */}
            <motion.header
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex justify-between items-center mb-8"
            >
              <div>
                <h1 className="text-4xl font-neue-bold text-gray-900 flex items-center gap-3">
                  <CalendarIcon className="w-10 h-10 text-indigo-600" />
                  Calendar & Appointments
                </h1>
                <p className="text-gray-600 font-poppins mt-1">
                  Manage your schedule and view upcoming appointments
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-6"
            >
            <div className="xl:col-span-2">
              <Calendar
                appointments={appointments}
                onDateSelect={() => {}}
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
                      <p className="font-poppins text-sm text-gray-600">Today&apos;s Schedule</p>
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
          </>
        )}

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <>
            {/* Header */}
            <motion.header
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex justify-between items-center mb-8"
            >
              <div>
                <h1 className="text-4xl font-neue-bold text-gray-900 flex items-center gap-3">
                  <Users className="w-10 h-10 text-indigo-600" />
                  Patient Directory
                </h1>
                <p className="text-gray-600 font-poppins mt-1">
                  Manage and view all your patients
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Filters and Actions */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-neue-bold text-gray-900">Patient Directory</h2>
                <p className="text-gray-600 font-poppins">Manage and view all your patients</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm font-poppins focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-64"
                  />
                </div>
                <div className="flex items-center gap-2 bg-white/80 rounded-xl border border-gray-200 p-1">
                  {['all', 'active', 'inactive', 'critical'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setPatientFilter(filter as typeof patientFilter)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg font-poppins text-sm transition-all capitalize",
                        patientFilter === filter
                          ? "bg-indigo-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Patient
                </Button>
              </div>
            </div>

            {/* Patient Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Patients', value: patients.length, icon: Users, color: 'from-indigo-500 to-purple-600' },
                { label: 'Active', value: patients.filter(p => p.status === 'Active').length, icon: CheckCircle, color: 'from-green-500 to-emerald-600' },
                { label: 'Inactive', value: patients.filter(p => p.status === 'Inactive').length, icon: AlertCircle, color: 'from-yellow-500 to-orange-600' },
                { label: 'Critical', value: patients.filter(p => p.status === 'Critical').length, icon: XCircle, color: 'from-red-500 to-pink-600' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/30 shadow-lg flex items-center gap-4"
                >
                  <div className={cn("p-3 rounded-xl bg-gradient-to-br", stat.color)}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-neue-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600 font-poppins">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Patient List */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <tr>
                      <th className="text-left p-4 font-neue-bold text-gray-900">Patient</th>
                      <th className="text-left p-4 font-neue-bold text-gray-900">Contact</th>
                      <th className="text-left p-4 font-neue-bold text-gray-900">Details</th>
                      <th className="text-left p-4 font-neue-bold text-gray-900">Condition</th>
                      <th className="text-left p-4 font-neue-bold text-gray-900">Status</th>
                      <th className="text-left p-4 font-neue-bold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient, idx) => (
                      <motion.tr
                        key={patient.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-neue-bold">
                              {patient.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-neue-bold text-gray-900">{patient.name}</p>
                              <p className="text-xs text-gray-500 font-poppins">ID: {patient.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-3 h-3" />
                              {patient.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-3 h-3" />
                              {patient.phone}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1 text-sm text-gray-600 font-poppins">
                            <p>Age: {patient.age} | {patient.gender}</p>
                            <p>Blood: {patient.bloodType}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-gray-900 font-poppins">{patient.condition}</span>
                          <p className="text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-poppins",
                            patient.status === 'Active' && "bg-green-100 text-green-700",
                            patient.status === 'Inactive' && "bg-yellow-100 text-yellow-700",
                            patient.status === 'Critical' && "bg-red-100 text-red-700"
                          )}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-indigo-600 hover:bg-indigo-50"
                              onClick={() => handleStartConsultation(patient, 'chat')}
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-600 hover:bg-green-50"
                              onClick={() => handleStartConsultation(patient, 'video')}
                            >
                              <Video className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-50">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-50">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
          </>
        )}

        {/* Consultations Tab */}
        {activeTab === 'consultations' && (
          <>
            {/* Header */}
            <motion.header
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex justify-between items-center mb-8"
            >
              <div>
                <h1 className="text-4xl font-neue-bold text-gray-900 flex items-center gap-3">
                  <Video className="w-10 h-10 text-indigo-600" />
                  Consultations
                </h1>
                <p className="text-gray-600 font-poppins mt-1">
                  Chat and video consultations with your patients
                </p>
              </div>
              <div className="flex items-center gap-4">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-6 h-[calc(100vh-160px)]"
            >
            {/* Patient List for Consultations */}
            <div className={cn(
              "bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl overflow-hidden transition-all duration-300 flex flex-col",
              consultationMode ? "w-1/3" : "w-full"
            )}>
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                <h3 className="font-neue-bold text-lg text-gray-900">Available Patients</h3>
                <p className="text-sm text-gray-600 font-poppins">Select a patient to start consultation</p>
              </div>
              <div className="p-4">
                <div className="relative mb-4">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white font-poppins focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div className="overflow-y-auto flex-1 p-4">
                <div className="grid grid-cols-2 gap-3">
                  {patients.map((patient, idx) => (
                    <motion.div
                      key={patient.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={cn(
                        "p-3 rounded-xl border border-gray-200 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all cursor-pointer bg-white",
                        selectedPatient?.id === patient.id && "bg-indigo-50 border-indigo-300"
                      )}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-neue-bold">
                            {patient.name.charAt(0)}
                          </div>
                          <span className={cn(
                            "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white",
                            patient.status === 'Active' && "bg-green-500",
                            patient.status === 'Inactive' && "bg-yellow-500",
                            patient.status === 'Critical' && "bg-red-500"
                          )} />
                        </div>
                        <div className="flex-1 w-full text-center">
                          <p className="font-neue-bold text-gray-900 text-sm truncate">{patient.name}</p>
                          <p className="text-xs text-gray-500 font-poppins truncate">{patient.condition}</p>
                        </div>
                        <div className="flex gap-2 w-full justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleStartConsultation(patient, 'chat')}
                            className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleStartConsultation(patient, 'video')}
                            className="p-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                          >
                            <Video className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Interface - Mobile-like UI */}
            <AnimatePresence>
              {consultationMode === 'chat' && selectedPatient && (
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  className="flex-1 translate-y-[-50px] flex justify-center items-center"
                >
                  <div className="w-[400px] h-[750px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl relative">
                    {/* Camera Icon on top of mobile frame */}
                    <div className="absolute top-4 right-12 z-30">
                      <button
                        onClick={() => setConsultationMode('video')}
                        className="p-2 rounded-full bg-gray-800/90 hover:bg-gray-700 transition-colors shadow-lg border border-gray-700"
                      >
                        <Video className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
                      {/* Phone Notch */}
                      <div className="relative">
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-22 h-6 bg-gray-900 rounded-full z-10" />
                      </div>
                      {/* Chat Header */}
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 pt-8 pb-4">
                        <div className="flex items-center justify-between mt-2">
                          <button
                            onClick={() => {
                              setConsultationMode(null);
                              setSelectedPatient(null);
                            }}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5 text-white" />
                          </button>
                          <div className="text-center">
                            <p className="text-white font-neue-bold">{selectedPatient.name}</p>
                            <p className="text-white/70 text-xs font-poppins">Online</p>
                          </div>
                          <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                            <Phone className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Chat Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {chatMessages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                              "flex",
                              msg.sender === 'doctor' ? "justify-end" : "justify-start"
                            )}
                          >
                            <div className={cn(
                              "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                              msg.sender === 'doctor'
                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md"
                                : "bg-white text-gray-900 rounded-bl-md"
                            )}>
                              <p className="text-sm font-poppins">{msg.content}</p>
                              <p className={cn(
                                "text-xs mt-1",
                                msg.sender === 'doctor' ? "text-white/70" : "text-gray-400"
                              )}>
                                {msg.timestamp}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Chat Input */}
                      <div className="p-4 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <Paperclip className="w-5 h-5 text-gray-500" />
                          </button>
                          <input
                            type="text"
                            placeholder="Type a message..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 font-poppins text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                          />
                          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <Smile className="w-5 h-5 text-gray-500" />
                          </button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSendMessage}
                            className="p-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                          >
                            <Send className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Home Indicator */}
                      <div className="h-8 bg-white flex items-center justify-center">
                        <div className="w-32 h-1 bg-gray-300 rounded-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Video Call Interface */}
              {consultationMode === 'video' && selectedPatient && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="flex-1 bg-gray-900 rounded-2xl overflow-hidden relative"
                >
                  {/* Main Video (Patient) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl font-neue-bold mx-auto mb-4">
                        {selectedPatient.name.charAt(0)}
                      </div>
                      <p className="text-white text-xl font-neue-bold">{selectedPatient.name}</p>
                      <p className="text-gray-400 font-poppins">{isVideoCallActive ? 'Connected' : 'Connecting...'}</p>
                    </div>
                  </div>

                  {/* Self View (Doctor) */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-6 right-6 w-48 h-36 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl flex items-center justify-center overflow-hidden"
                  >
                    {isVideoOff ? (
                      <div className="text-center">
                        <VideoOff className="w-8 h-8 text-white/60 mx-auto" />
                        <p className="text-white/60 text-xs mt-2 font-poppins">Camera Off</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-neue-bold">
                          DS
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Patient Info Bar */}
                  <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md rounded-xl p-4 flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-white font-neue-bold text-sm">{selectedPatient.name}</p>
                        <p className="text-gray-400 text-xs font-poppins">{selectedPatient.condition}</p>
                      </div>
                    </div>
                    <div className="w-px h-8 bg-gray-600" />
                    <div className="text-center">
                      <p className="text-white text-xs font-poppins">Blood Type</p>
                      <p className="text-indigo-400 font-neue-bold">{selectedPatient.bloodType}</p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMuted(!isMuted)}
                      className={cn(
                        "p-4 rounded-full transition-colors",
                        isMuted ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
                      )}
                    >
                      {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsVideoOff(!isVideoOff)}
                      className={cn(
                        "p-4 rounded-full transition-colors",
                        isVideoOff ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
                      )}
                    >
                      {isVideoOff ? <VideoOff className="w-6 h-6" /> : <VideoIcon className="w-6 h-6" />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    >
                      <Monitor className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setConsultationMode('chat')}
                      className="p-4 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    >
                      <MessageCircle className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleEndCall}
                      className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      <PhoneOff className="w-6 h-6" />
                    </motion.button>
                  </div>

                  {/* Call Duration */}
                  <div className="absolute bottom-8 right-8 bg-black/40 backdrop-blur-md rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-white font-poppins text-sm">05:32</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <>
            {/* Header */}
            <motion.header
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex justify-between items-center mb-8"
            >
              <div>
                <h1 className="text-4xl font-neue-bold text-gray-900 flex items-center gap-3">
                  <Pill className="w-10 h-10 text-indigo-600" />
                  Prescriptions
                </h1>
                <p className="text-gray-600 font-poppins mt-1">
                  Manage patient prescriptions and medications
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search prescriptions..."
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Actions */}
              <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 gap-2">
                  <Plus className="w-4 h-4" />
                  New Prescription
                </Button>
              </div>
            </div>

            {/* Prescription Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Active Prescriptions', value: prescriptions.filter(p => p.status === 'Active').length, icon: FileText, color: 'from-indigo-500 to-purple-600' },
                { label: 'Completed', value: prescriptions.filter(p => p.status === 'Completed').length, icon: CheckCircle, color: 'from-green-500 to-emerald-600' },
                { label: 'Pending Refills', value: 3, icon: AlertCircle, color: 'from-yellow-500 to-orange-600' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/70 backdrop-blur-xl rounded-xl p-5 border border-white/30 shadow-lg flex items-center gap-4"
                >
                  <div className={cn("p-3 rounded-xl bg-gradient-to-br", stat.color)}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-neue-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600 font-poppins">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Prescriptions List */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <tr>
                      <th className="text-left p-4 font-neue-bold text-gray-900">Patient</th>
                      <th className="text-left p-4 font-neue-bold text-gray-900">Medication</th>
                      <th className="text-left p-4 font-neue-bold text-gray-900">Dosage</th>
                      <th className="text-left p-4 font-neue-bold text-gray-900">Frequency</th>
                      <th className="text-left p-4 font-neue-bold text-gray-900">Duration</th>
                      <th className="text-left p-4 font-neue-bold text-gray-900">Status</th>
                      <th className="text-left p-4 font-neue-bold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((prescription, idx) => (
                      <motion.tr
                        key={prescription.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-neue-bold">
                              {prescription.patientName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-neue-bold text-gray-900">{prescription.patientName}</p>
                              <p className="text-xs text-gray-500 font-poppins">{prescription.date}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Pill className="w-4 h-4 text-indigo-600" />
                            <span className="font-poppins text-gray-900">{prescription.medication}</span>
                          </div>
                        </td>
                        <td className="p-4 font-poppins text-gray-600">{prescription.dosage}</td>
                        <td className="p-4 font-poppins text-gray-600">{prescription.frequency}</td>
                        <td className="p-4 font-poppins text-gray-600">{prescription.duration}</td>
                        <td className="p-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-poppins",
                            prescription.status === 'Active' && "bg-green-100 text-green-700",
                            prescription.status === 'Completed' && "bg-blue-100 text-blue-700",
                            prescription.status === 'Cancelled' && "bg-red-100 text-red-700"
                          )}>
                            {prescription.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:bg-indigo-50">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-50">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-50">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <>
            {/* Header */}
            <motion.header
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex justify-between items-center mb-8"
            >
              <div>
                <h1 className="text-4xl font-neue-bold text-gray-900 flex items-center gap-3">
                  <BarChart3 className="w-10 h-10 text-indigo-600" />
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600 font-poppins mt-1">
                  Track your practice performance and insights
                </p>
              </div>
              <div className="flex items-center gap-4">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 mb-6">
              <div className="flex items-center gap-3">
                <select className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white font-poppins focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none">
                  <option>Last 6 Months</option>
                  <option>Last 3 Months</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Revenue', value: '$265,200', change: '+12.5%', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
                { label: 'Total Patients', value: '1,247', change: '+8.2%', icon: Users, color: 'from-indigo-500 to-purple-600' },
                { label: 'Consultations', value: '892', change: '+15.3%', icon: Video, color: 'from-blue-500 to-cyan-600' },
                { label: 'Satisfaction', value: '4.8/5', change: '+0.3', icon: Heart, color: 'from-pink-500 to-rose-600' },
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/70 backdrop-blur-xl rounded-xl p-5 border border-white/30 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("p-2.5 rounded-lg bg-gradient-to-br", metric.color)}>
                      <metric.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-green-600 text-sm font-poppins flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-2xl font-neue-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-gray-600 font-poppins">{metric.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Revenue & Patients Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl"
              >
                <h3 className="text-xl font-neue-bold text-gray-900 mb-6">Revenue & Patient Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                    <YAxis yAxisId="left" stroke="#6b7280" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={3} dot={{ fill: '#6366F1' }} />
                    <Line yAxisId="right" type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-600" />
                    <span className="text-sm text-gray-600 font-poppins">Revenue ($)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-600 font-poppins">Patients</span>
                  </div>
                </div>
              </motion.div>

              {/* Consultation Types */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl"
              >
                <h3 className="text-xl font-neue-bold text-gray-900 mb-6">Consultation Types</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={consultationTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {consultationTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CONSULTATION_COLORS[index % CONSULTATION_COLORS.length]} />
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
                <div className="flex justify-center gap-6 mt-4">
                  {consultationTypeData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CONSULTATION_COLORS[idx] }} />
                      <span className="text-sm text-gray-600 font-poppins">{item.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Patient Demographics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl"
              >
                <h3 className="text-xl font-neue-bold text-gray-900 mb-6">Age Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={patientAgeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {patientAgeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {patientAgeData.map((entry, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                      <span className="text-xs text-gray-600 font-poppins">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl"
              >
                <h3 className="text-xl font-neue-bold text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New patient registered', patient: 'John Smith', time: '5 min ago', icon: Users, color: 'bg-blue-100 text-blue-600' },
                    { action: 'Video consultation completed', patient: 'Sarah Johnson', time: '15 min ago', icon: Video, color: 'bg-green-100 text-green-600' },
                    { action: 'Prescription issued', patient: 'Michael Chen', time: '30 min ago', icon: FileText, color: 'bg-purple-100 text-purple-600' },
                    { action: 'Appointment scheduled', patient: 'Emily Davis', time: '1 hour ago', icon: CalendarIcon, color: 'bg-indigo-100 text-indigo-600' },
                    { action: 'Lab results uploaded', patient: 'Robert Wilson', time: '2 hours ago', icon: FileText, color: 'bg-yellow-100 text-yellow-600' },
                  ].map((activity, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className={cn("p-2.5 rounded-lg", activity.color)}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-poppins text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500 font-poppins">{activity.patient}</p>
                      </div>
                      <span className="text-xs text-gray-400 font-poppins">{activity.time}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
          </>
        )}
      </main>
    </div>
  );
}
