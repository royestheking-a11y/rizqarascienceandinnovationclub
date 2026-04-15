import { motion } from 'motion/react';
import { FileText, Users, Award, AlertCircle, Scale, HelpCircle } from 'lucide-react';

const SECTIONS = [
  {
    icon: <FileText size={24} />,
    title: "Acceptance of Terms",
    content: "By accessing and using the Rizqara Science & Innovation Club (RSIC) website and services, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site."
  },
  {
    icon: <Users size={24} />,
    title: "Membership & Conduct",
    content: "Members must provide accurate information when joining. You are responsible for maintaining the confidentiality of your account credentials. All members are expected to interact respectfully within the community and refrain from any disruptive or harmful behavior."
  },
  {
    icon: <Award size={24} />,
    title: "Intellectual Property",
    content: "All content provided through RSIC, including course materials, code samples, designs, and logos, are the property of RSIC or its content creators. You may use these for personal, educational purposes only and may not redistribute or sell them without explicit permission."
  },
  {
    icon: <AlertCircle size={24} />,
    title: "Limitation of Liability",
    content: "RSIC provides its services 'as is' without any warranties. In no event shall RSIC or its partners be liable for any damages arising out of the use or inability to use the services, even if RSIC has been notified of the possibility of such damage."
  },
  {
    icon: <Scale size={24} />,
    title: "Governing Law",
    content: "These terms and conditions are governed by and construed in accordance with the laws of Bangladesh. You irrevocably submit to the exclusive jurisdiction of the courts in that location."
  },
  {
    icon: <HelpCircle size={24} />,
    title: "Changes to Terms",
    content: "RSIC reserves the right to revise these Terms of Use for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Use."
  }
];

export function Terms() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-white/60 text-sm font-bold tracking-widest uppercase">Legal</span>
            <h1 className="text-white mt-4 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              Terms of Use
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By using RSIC, you agree to these conditions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {SECTIONS.map((section, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-white" style={{ background: '#4A0000' }}>
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center text-gray-400 text-xs">
            For any clarifications regarding these terms, please contact our legal team at legal@rizqara.org.
          </div>
        </div>
      </section>
    </div>
  );
}
