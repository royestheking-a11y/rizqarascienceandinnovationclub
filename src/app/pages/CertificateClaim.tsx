import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { Award, Download, Share2, Building2, User, Check, Loader2, ArrowLeft, Brain } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { createDoc, fetchPrograms, updateDoc } from '../data/api';
import { useAuth } from '../context/AuthContext';

export function CertificateClaim() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const score = searchParams.get('score');
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const certificateRef = useRef<HTMLDivElement>(null);
  
  const [name, setName] = useState(user?.name || '');
  const [company, setCompany] = useState(user?.school || '');
  const [courseName, setCourseName] = useState('Learning Program');
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [slug, setSlug] = useState('');

  useEffect(() => {
    fetchPrograms().then(progs => {
      const allCourses = progs.flatMap((p: any) => p.courses || []);
      const course = allCourses.find((c: any) => c.id === id);
      if (course) setCourseName(course.name);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4A0000', '#FFD700', '#ffffff']
    });
  }, [id]);

  const handleClaim = async () => {
    if (!name || !user) return;
    setIsGenerating(true);
    
    const uniqueSlug = `RSIC-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const certData = {
      slug: uniqueSlug,
      userName: name,
      companyName: company || 'RSIC Member',
      courseId: id,
      courseName: courseName,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      score: parseInt(score || '0'),
      memberId: user._id || user.customId || user.id
    };

    try {
      await createDoc('certificates', certData);
      
      // Update User Record with this certificate
      const updatedCerts = [...(user.certificates || []), uniqueSlug];
      const updatedCompleted = [...(user.completedCourses || [])];
      if (id && !updatedCompleted.includes(id)) {
        updatedCompleted.push(id);
      }
      
      const updatedUser = { 
        ...user, 
        certificates: updatedCerts,
        completedCourses: updatedCompleted 
      };
      
      updateUser(updatedUser);
      await updateDoc('members', user._id || user.customId || user.id, updatedUser);

      setSlug(uniqueSlug);
      setTimeout(() => {
        setIsGenerating(false);
        setIsDone(true);
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.8 }
        });
      }, 2000);
    } catch (e) {
      console.error(e);
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!certificateRef.current) return;
    try {
      const dataUrl = await toPng(certificateRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High quality
      });
      const link = document.createElement('a');
      link.download = `RSIC-Certificate-${slug || 'Preview'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-[#fcfcfd]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Left: Form */}
        <div className="w-full lg:w-1/3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Quiz
          </button>
          
          <h1 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Claim Your Certificate</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">Please enter the details exactly as you want them to appear on your official certificate of achievement.</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#800020] focus:outline-none transition-all placeholder:text-gray-300 font-semibold"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Institution / Company (Optional)</label>
              <div className="relative">
                <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g. Dhaka University"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#800020] focus:outline-none transition-all placeholder:text-gray-300 font-semibold"
                />
              </div>
            </div>

            {!isDone ? (
              <button 
                onClick={handleClaim}
                disabled={!name || isGenerating || isLoading}
                className="w-full py-5 rounded-2xl font-bold bg-[#4A0000] text-white flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale transition-all shadow-xl shadow-[#4A0000]/20"
              >
                {isGenerating ? (
                  <><Loader2 size={20} className="animate-spin" /> Sealing Certificate...</>
                ) : (
                  <><Award size={20} /> Claim My Certificate</>
                )}
              </button>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => window.print()}
                    className="py-4 rounded-2xl font-bold border-2 border-green-600 text-green-700 flex items-center justify-center gap-3 hover:bg-green-50 transition-all"
                  >
                    PDF
                  </button>
                  <button 
                    onClick={handleDownloadImage}
                    className="py-4 rounded-2xl font-bold bg-green-600 text-white flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-lg shadow-green-600/20"
                  >
                    <Download size={20} /> PNG Image
                  </button>
                </div>
                <button 
                  onClick={() => {
                    const url = `${window.location.origin}/certificates/v/${slug}`;
                    navigator.clipboard.writeText(url);
                    alert('Verification link copied to clipboard!');
                  }}
                  className="w-full py-4 rounded-2xl font-bold bg-gray-900 text-white flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
                >
                  <Share2 size={20} /> Copy Share Link
                </button>
                <button 
                   onClick={() => navigate(`/certificates/v/${slug}`)}
                   className="w-full py-4 rounded-2xl font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-3 transition-all"
                >
                  View Public Page
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Preview */}
        <div className="flex-1 w-full lg:sticky lg:top-32">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Live Preview</label>
           <div ref={certificateRef} className="certificate-container bg-white rounded-xl shadow-2xl relative overflow-hidden aspect-[1.414/1] border-[16px] border-[#4A0000]">
              {/* Outer Golden Border */}
              <div className="absolute inset-2 border-[2px] border-[#FFD700]/30 pointer-events-none" />
              
              {/* Subtle Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none grayscale">
                 <img src="/rsic-club/Rsic.png" alt="" className="w-2/3 object-contain" />
              </div>

              {/* Decorative Corners */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#FFD700]" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#FFD700]" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#FFD700]" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#FFD700]" />
              
              {/* Inner Fine Border */}
              <div className="absolute inset-8 border-[1px] border-[#4A0000]/10 pointer-events-none" />
              
              {/* Content Layer */}
              <div className="absolute inset-0 p-12 flex flex-col items-center text-center z-20">
                 {/* Logo Section */}
                 <div className="mb-0 flex flex-col items-center relative transition-all">
                    <div className="w-16 h-16 rounded-full border border-[#4A0000]/10 flex items-center justify-center mb-2 overflow-hidden bg-white shadow-sm p-1">
                       <img src="/rsic-club/Rsic.png" alt="RSIC" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.4em] font-black text-[#4A0000] mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Rizqara Science & Innovation Club</div>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
                 </div>

                <div className="flex-1 flex flex-col items-center justify-center w-full py-4 space-y-4">
                  <div>
                    <h3 className="text-[#800020] font-bold text-lg uppercase tracking-[0.3em]" style={{ fontFamily: 'Cinzel, serif' }}>Certificate of Achievement</h3>
                    <div className="w-40 h-[1px] bg-[#800020]/20 mx-auto mt-1" />
                  </div>
                  
                  <div className="relative">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {name || 'YOUR NAME'}
                    </h2>
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#800020]/30 to-transparent mt-2" />
                  </div>

                  <p className="text-gray-600 text-[11px] max-w-lg leading-relaxed">
                    has successfully completed the <span className="font-bold text-[#4A0000]">{courseName}</span> 
                    with a score of <span className="font-bold text-gray-900">{score || '100'}%</span> and demonstrated 
                    outstanding proficiency in the required competencies.
                  </p>
                </div>

                  {/* Footer Row */}
                  <div className="w-full flex justify-between items-end mt-4 px-10">
                    <div className="text-left">
                      <div className="text-[9px] text-gray-900 font-bold uppercase tracking-widest mb-1">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                      <div className="h-[1px] w-24 bg-[#4A0000]/20 mb-1" />
                      <div className="text-[7px] text-gray-400 uppercase tracking-widest font-bold">Issue Date</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-[#001f3f] font-normal mb-[-4px] text-3xl signature-font translate-y-2 z-10" style={{ fontFamily: '"Mrs Saint Delafield", cursive' }}>Md Sunny</div>
                      <div className="h-[1px] w-32 bg-[#4A0000]/20 mb-1 ml-auto" />
                      <div className="text-[9px] text-gray-900 font-bold uppercase tracking-widest">RSIC President</div>
                      <div className="text-[7px] text-gray-400 uppercase tracking-widest font-bold">Authorized Official</div>
                    </div>
                  </div>

                 {/* Absolute Bottom Info */}
                 <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-full">
                    <div className="text-[10px] text-gray-400 tracking-[0.4em] font-mono mb-1 uppercase font-bold">
                       ID: {slug || 'CERT-RSIC-2026-PREVIEW'}
                    </div>
                    <div className="text-[7px] text-gray-400 tracking-[0.2em] font-medium uppercase">
                       OFFICIALLY VERIFIED AT RSIC.ORG/VERIFY
                    </div>
                 </div>

                {/* Verification Slug */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] text-[#4A0000]/40 tracking-[0.3em] font-mono font-bold uppercase">
                  VERIFY LINK: RSIC.ORG/VERIFY/{slug || 'CERT-XXXXXXXX'}
                </div>
             </div>
          </div>
          <p className="mt-4 text-center text-gray-400 text-xs">
            * This design is a live preview and may vary slightly in the final download.
          </p>
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }
          body {
            margin: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .min-h-screen {
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }
          .max-w-6xl, .lg\\:w-1\\/3, .lg\\:sticky > label, button, p.mt-4, .lg\\:top-32 > label {
            display: none !important;
          }
          .flex-1 {
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .certificate-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 1.414/1 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            margin: 0 !important;
            transform: none !important;
          }
          /* Ensure all ancestors of certificate-container are visible */
          .min-h-screen, .max-w-6xl, .flex-1, .lg\\:top-32 {
            display: block !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
