import { motion } from 'motion/react';
import { Shield, Lock, Eye, Bell, Globe, Mail } from 'lucide-react';

const SECTIONS = [
  {
    icon: <Eye size={24} />,
    title: "Information We Collect",
    content: "We collect information you provide directly to us, such as when you create an account, enroll in a course, fill out a form, or communicate with us. This may include your name, email address, school/organization, and interests."
  },
  {
    icon: <Shield size={24} />,
    title: "How We Use Your Information",
    content: "We use the information we collect to provide, maintain, and improve our services, to process your course enrollments, to communicate with you about updates, and to personalize your learning experience."
  },
  {
    icon: <Lock size={24} />,
    title: "Data Security",
    content: "We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no internet transmission is ever completely secure."
  },
  {
    icon: <Bell size={24} />,
    title: "Privacy Choices",
    content: "You may update your account information at any time by logging into your account. You can also opt-out of receiving promotional communications from us by following the instructions in those communications."
  },
  {
    icon: <Globe size={24} />,
    title: "Cookies",
    content: "We use cookies and similar technologies to track activity on our service and hold certain information to enhance your experience and analyze how our service is used."
  },
  {
    icon: <Mail size={24} />,
    title: "Contact Us",
    content: "If you have any questions about this Privacy Policy, please contact us at info@rizqara.org or through the contact form on our website."
  }
];

export function Privacy() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-white/60 text-sm font-bold tracking-widest uppercase">Legal</span>
            <h1 className="text-white mt-4 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              Privacy Policy
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">
              Last updated: April 15, 2026. We value your privacy and are committed to protecting your personal data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {SECTIONS.map((section, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white" style={{ background: '#4A0000' }}>
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="mt-20 p-10 rounded-3xl bg-gray-50 text-center"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Acceptance of this Policy</h3>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm">
              By using our website and services, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our website. Your continued use of the website following the posting of changes to this policy will be deemed your acceptance of those changes.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
