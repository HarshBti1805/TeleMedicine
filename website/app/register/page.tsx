'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FloatingOrbs } from '@/components/ui/animated-gradient';
import { Spotlight } from '@/components/ui/spotlight';
import { 
  Stethoscope, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  User, 
  BadgeCheck,
  Briefcase 
} from 'lucide-react';

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    specialization: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const specializations = [
    'General Practice',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
    'Neurology',
    'Psychiatry',
    'Oncology',
    'Gynecology',
    'Ophthalmology',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/50 flex items-center justify-center px-8 py-12 relative overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(99, 102, 241, 0.1)" />
      <FloatingOrbs />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="bg-white/80 backdrop-blur-2xl border-white/40 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex mx-auto p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-xl"
            >
              <Stethoscope className="w-10 h-10 text-white" />
            </motion.div>
            <CardTitle className="text-4xl font-neue-bold text-gray-900">
              Create Account
            </CardTitle>
            <CardDescription className="text-base">
              Join Synapse-TeleMedicine and transform your practice
            </CardDescription>
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {[1, 2].map((s) => (
                <motion.div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === step ? 'w-8 bg-indigo-600' : s < step ? 'w-8 bg-indigo-400' : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-neue-bold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-poppins bg-white/80"
                        placeholder="Dr. John Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-neue-bold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-poppins bg-white/80"
                        placeholder="doctor@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-neue-bold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-poppins bg-white/80"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-neue-bold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-poppins bg-white/80"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-neue-bold text-gray-700 mb-2">
                      Medical License Number
                    </label>
                    <div className="relative">
                      <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-poppins bg-white/80"
                        placeholder="MD12345678"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-neue-bold text-gray-700 mb-2">
                      Specialization
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-poppins bg-white/80 appearance-none"
                      >
                        <option value="">Select your specialization</option>
                        {specializations.map((spec) => (
                          <option key={spec} value={spec.toLowerCase().replace(' ', '-')}>
                            {spec}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600 font-poppins">
                        I agree to the{' '}
                        <Link href="#" className="text-indigo-600 hover:underline">Terms of Service</Link>
                        {' '}and{' '}
                        <Link href="#" className="text-indigo-600 hover:underline">Privacy Policy</Link>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3">
                {step === 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setStep(1)}
                    className="flex-1 font-neue-bold"
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 font-neue-bold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : step === 1 ? (
                    <>
                      Continue
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-600 font-poppins">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-indigo-600 font-neue-bold hover:text-indigo-700 transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center"
            >
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-poppins inline-flex items-center gap-1"
              >
                ← Back to Home
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
