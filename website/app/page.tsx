'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Spotlight } from '@/components/ui/spotlight';
import { FloatingOrbs } from '@/components/ui/animated-gradient';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  Pill, 
  BarChart3, 
  Video, 
  FileText, 
  Shield, 
  Clock,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: 'Patient Management',
      description: 'Efficiently manage your patient records, appointments, and medical history all in one centralized platform.',
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: 'Smart Scheduling',
      description: 'AI-powered scheduling system with automated reminders, conflict detection, and calendar sync.',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      icon: <Pill className="w-8 h-8 text-purple-600" />,
      title: 'E-Prescriptions',
      description: 'Digital prescription writing with drug interaction checks and e-signature capabilities.',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics and insights to track patient trends and practice performance.',
      gradient: 'from-indigo-500 to-blue-600',
    },
    {
      icon: <Video className="w-8 h-8 text-violet-600" />,
      title: 'Teleconsultation',
      description: 'HD video consultations with screen sharing, virtual waiting rooms, and recording.',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      icon: <FileText className="w-8 h-8 text-cyan-600" />,
      title: 'Medical Records',
      description: 'Secure cloud storage with instant access to patient history, lab results, and imaging.',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: <FileText className="w-8 h-8 text-cyan-600" />,
      title: 'Medical Records',
      description: 'Secure cloud storage with instant access to patient history, lab results, and imaging.',
      gradient: 'from-blue-500 to-cyan-600',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Active Doctors' },
    { value: '1M+', label: 'Consultations' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9/5', label: 'Rating' },
  ];

  const benefits = [
    'HIPAA Compliant & Secure',
    '24/7 Technical Support',
    'Easy Integration with EHR',
    'Multi-device Access',
    'Automated Billing',
    'Real-time Notifications',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/50 relative overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(99, 102, 241, 0.15)" />
      <FloatingOrbs />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 glass border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-neue-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Synapse-TeleMedicine
            </span>
          </motion.div>
          <div className="flex gap-4 items-center">
            <Link href="/login">
              <Button variant="ghost" className="font-poppins">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="font-poppins">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-poppins text-sm mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Trusted by 10,000+ Healthcare Professionals
            </motion.div>
            
            <h1 className="text-6xl lg:text-7xl font-neue-bold text-gray-900 mb-6 leading-[1.1]">
              The Future of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient-text">
                Healthcare
              </span>{' '}
              Management
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed font-poppins max-w-xl">
              Streamline your practice with our comprehensive telemedicine platform. 
              Manage patients, appointments, and consultations all in one place.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/register">
                <Button size="lg" className="font-neue-bold shadow-2xl glow">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="font-neue-bold">
                  Watch Demo
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {benefits.slice(0, 3).map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center gap-2 text-gray-600 font-poppins text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {benefit}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10 bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100"
                  >
                    <div className="text-4xl font-neue-bold text-indigo-600 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-poppins">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-neue-bold">Enterprise Security</div>
                    <div className="text-sm opacity-80 font-poppins">HIPAA Compliant & SOC 2 Certified</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl blur-2xl opacity-40" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur-2xl opacity-40" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-neue-bold text-gray-900 mb-4">
            Everything You Need to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-poppins">
            Powerful features designed for modern healthcare professionals
          </p>
        </motion.div>

        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoGridItem
              key={idx}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              gradient={feature.gradient}
              className={idx === 0 || idx === 3 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-neue-bold text-white mb-6">
                  Ready to Transform Your Practice?
                </h2>
                <p className="text-xl text-white/80 mb-8 font-poppins">
                  Join thousands of healthcare professionals who have already modernized their practice with Synapse-TeleMedicine.
                </p>
                <Link href="/register">
                  <Button size="lg" className="bg-white text-white hover:bg-white/90 font-neue-bold shadow-2xl">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white font-poppins text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 bg-gray-900 text-gray-400 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="font-neue-bold text-white">Synapse-TeleMedicine</span>
          </div>
          <p className="font-poppins text-sm">© 2024 Synapse-TeleMedicine. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors font-poppins text-sm">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors font-poppins text-sm">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors font-poppins text-sm">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
