'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Menu,
  X,
  Quote,
  Zap,
  Building2,
  Heart,
} from 'lucide-react';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#pricing', label: 'Pricing' },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const features = [
    {
      icon: <Users className="w-8 h-8 text-neutral-700" />,
      title: 'Patient Management',
      description:
        'Efficiently manage your patient records, appointments, and medical history all in one centralized platform.',
    },
    {
      icon: <Calendar className="w-8 h-8 text-neutral-700" />,
      title: 'Smart Scheduling',
      description:
        'Scheduling system with automated reminders, conflict detection, and calendar sync.',
    },
    {
      icon: <Pill className="w-8 h-8 text-neutral-700" />,
      title: 'E-Prescriptions',
      description:
        'Digital prescription writing with drug interaction checks and e-signature capabilities.',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-neutral-700" />,
      title: 'Analytics Dashboard',
      description:
        'Comprehensive analytics and insights to track patient trends and practice performance.',
    },
    {
      icon: <Video className="w-8 h-8 text-neutral-700" />,
      title: 'Teleconsultation',
      description:
        'HD video consultations with screen sharing, virtual waiting rooms, and recording.',
    },
    {
      icon: <FileText className="w-8 h-8 text-neutral-700" />,
      title: 'Medical Records',
      description:
        'Secure cloud storage with instant access to patient history, lab results, and imaging.',
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-neutral-700" />,
      title: 'Secure Messaging',
      description:
        'HIPAA-compliant messaging system for secure communication with patients and colleagues.',
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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-neue-bold tracking-tight text-neutral-900">
                Arogyam
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="font-medium bg-neutral-900 hover:bg-neutral-800 text-white">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden border-t border-neutral-200 mt-4 pt-4"
              >
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-neutral-700 hover:text-neutral-900 font-medium py-2"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="flex flex-col gap-2 pt-4 border-t border-neutral-200">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-neutral-900 text-white">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600 font-medium text-sm mb-6">
              Trusted by 10,000+ Healthcare Professionals
            </p>

            <h1 className="text-5xl lg:text-6xl font-neue-bold text-neutral-900 mb-6 leading-[1.15] tracking-tight">
              The future of healthcare management
            </h1>

            <p className="text-lg text-neutral-600 mb-8 leading-relaxed max-w-lg">
              Streamline your practice with a comprehensive telemedicine platform.
              Manage patients, appointments, and consultations in one place.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/register">
                <Button
                  size="lg"
                  className="font-semibold bg-neutral-900 hover:bg-neutral-800 text-white"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                >
                  Watch Demo
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {benefits.slice(0, 3).map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.08 }}
                  className="flex items-center gap-2 text-neutral-600 text-sm font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  {benefit}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.08 }}
                    className="text-center p-5 rounded-xl bg-white border border-neutral-200"
                  >
                    <div className="text-3xl font-neue-bold text-neutral-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-500 font-poppins">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-6 p-4 rounded-xl bg-neutral-900 text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">Enterprise Security</div>
                    <div className="text-sm text-neutral-300">
                      HIPAA Compliant & SOC 2 Certified
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 px-6 border-y border-neutral-200 bg-neutral-50/50">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm font-medium text-neutral-500 mb-8 font-poppins">
            Trusted by leading healthcare organizations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {['Healthcare Plus', 'MedCorp', 'City Hospital', 'Wellness First', 'Prime Care'].map((name, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <Building2 className="w-5 h-5" />
                <span className="font-semibold text-neutral-600">{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto relative z-10 border-t border-neutral-200 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-neue-bold text-neutral-900 mb-3 tracking-tight">
            Everything you need to succeed
          </h2>
            <p className="text-lg text-neutral-600 max-w-xl mx-auto font-poppins">
            Features designed for modern healthcare professionals
          </p>
        </motion.div>

        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoGridItem
              key={idx}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              className={idx === 0 || idx === 3 ? 'md:col-span-2' : ''}
            />
          ))}
        </BentoGrid>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-neutral-50 border-t border-neutral-200 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-neue-bold text-neutral-900 mb-3 tracking-tight">
              Get started in minutes
            </h2>
            <p className="text-lg text-neutral-600 max-w-xl mx-auto font-poppins">
              Three simple steps to transform your practice
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Sign up free', desc: 'Create your account in under 2 minutes. No credit card required.', icon: Zap },
              { step: '02', title: 'Complete setup', desc: 'Add your practice details, team members, and connect your calendar.', icon: Building2 },
              { step: '03', title: 'Start consulting', desc: 'Invite patients and begin secure video consultations today.', icon: Heart },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative"
              >
                {idx < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-neutral-200" />
                )}
                <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-5xl font-neue-bold text-neutral-200 mb-4">{item.step}</div>
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center mb-6">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-neue-bold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-600 font-poppins">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 max-w-6xl mx-auto border-t border-neutral-200 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-neue-bold text-neutral-900 mb-3 tracking-tight">
            Loved by healthcare professionals
          </h2>
          <p className="text-lg text-neutral-600 max-w-xl mx-auto font-poppins">
            See what doctors and practices are saying about Arogyam
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { quote: 'Arogyam has streamlined our entire practice. Patient no-shows dropped 40% with automated reminders.', name: 'Dr. Sarah Mitchell', role: 'Family Physician' },
            { quote: 'The teleconsultation feature is flawless. My patients love the convenience of virtual visits from home.', name: 'Dr. James Chen', role: 'Cardiologist' },
            { quote: 'E-prescriptions and EHR integration saved us countless hours. Worth every penny.', name: 'Dr. Emily Foster', role: 'Internal Medicine' },
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200"
            >
              <Quote className="w-8 h-8 text-neutral-300 mb-4" />
              <p className="text-neutral-700 mb-6 font-poppins leading-relaxed">{testimonial.quote}</p>
              <div>
                <p className="font-neue-bold text-neutral-900">{testimonial.name}</p>
                <p className="text-sm text-neutral-500 font-poppins">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-20 px-6 bg-neutral-50 border-t border-neutral-200 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-neue-bold text-neutral-900 mb-3 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-neutral-600 max-w-xl mx-auto font-poppins">
              Start free. Scale as you grow.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: 'Free', desc: 'For solo practitioners', features: ['Up to 50 patients', 'Basic scheduling', '5 video calls/month'] },
              { name: 'Professional', price: '$49/mo', desc: 'For growing practices', features: ['Unlimited patients', 'Full scheduling suite', 'Unlimited consultations'], popular: true },
              { name: 'Enterprise', price: 'Custom', desc: 'For large organizations', features: ['Everything in Pro', 'Dedicated support', 'Custom integrations'] },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-2xl p-8 border-2 ${plan.popular ? 'border-neutral-900 bg-white shadow-lg' : 'border-neutral-200 bg-white'}`}
              >
                {plan.popular && (
                  <span className="inline-block px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-medium mb-4">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-neue-bold text-neutral-900 mb-1">{plan.name}</h3>
                <p className="text-3xl font-neue-bold text-neutral-900 mb-1">{plan.price}</p>
                <p className="text-sm text-neutral-500 font-poppins mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-neutral-700 font-poppins text-sm">
                      <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button
                    className={`w-full ${plan.popular ? 'bg-neutral-900 text-white' : 'border-neutral-300'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Get started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-900 rounded-2xl p-12 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm20 20v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-3xl lg:text-4xl font-neue-bold text-white mb-4 tracking-tight">
                  Ready to transform your practice?
                </h2>
                <p className="text-lg text-neutral-400 mb-8">
                  Join thousands of healthcare professionals using Arogyam.
                </p>
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 font-semibold"
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span className="text-white/90 text-sm font-medium">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-400 relative z-10 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-white" />
                </div>
                <span className="font-neue-bold text-white text-lg">Arogyam</span>
              </Link>
              <p className="text-sm text-neutral-500 font-poppins max-w-[200px]">
                The future of healthcare management for modern practices.
              </p>
            </div>
            <div>
              <h4 className="font-neue-bold text-white mb-4">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Integrations', 'Changelog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-white transition-colors font-poppins">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-neue-bold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-white transition-colors font-poppins">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-neue-bold text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                {['Privacy', 'Terms', 'Security', 'HIPAA'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-white transition-colors font-poppins">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2025 Arogyam. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors text-sm font-medium">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors text-sm font-medium">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors text-sm font-medium">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
