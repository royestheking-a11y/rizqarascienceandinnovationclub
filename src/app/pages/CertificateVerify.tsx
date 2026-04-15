import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { Award, CheckCircle, Share2, ArrowRight, Brain, ShieldCheck, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useRef } from 'react';
import { API_BASE } from '../data/config';

export function CertificateVerify() {
  const { slug } = useParams();
  const [cert, setCert] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/certificates/v/${slug}`)
      .then(res => res.json())
      .then(data => {
        setCert(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleDownloadImage = async () => {
    if (!certificateRef.current) return;
    try {
      const dataUrl = await toPng(certificateRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `RSIC-Verified-Certificate-${slug}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin text-[#800020]"><Award size={48} /></div>
    </div>
  );

  if (!cert || cert.error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-red-500 mb-4"><Award size={64} /></div>
      <h1 className="text-2xl font-black text-gray-900 mb-2">Certificate Not Found</h1>
      <p className="text-gray-500 mb-8">This certificate could not be verified or does not exist.</p>
      <Link to="/programs" className="px-8 py-3 rounded-xl bg-[#800020] text-white font-bold">Browse Courses</Link>
    </div>
  );

  return (
    <>
      <div className="min-h-screen pt-32 pb-20 px-4 bg-[#f8f9fc]">
        <div className="max-w-4xl mx-auto">
          
          {/* Verification Badge */}
          <div className="flex items-center justify-center gap-2 mb-8 text-green-600 bg-green-50 px-6 py-2 rounded-full w-fit mx-auto border border-green-100 shadow-sm">
            <ShieldCheck size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">Verified RSIC Digital Certificate</span>
          </div>

          <div className="bg-white rounded-[2.5rem] p-1 shadow-2xl overflow-hidden mb-8 border border-gray-100">
             {/* Re-using identical template as claim page for consistency */}
             <div ref={certificateRef} className="certificate-container bg-white rounded-[2rem] relative overflow-hidden aspect-[1.414/1] border-[16px] border-[#4A0000]">
                {/* Outer Golden Border */}
                <div className="absolute inset-2 border-[2px] border-[#FFD700]/40 pointer-events-none" />
                
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
                    
                    <p className="text-gray-400 text-xs italic mb-4">This is to certify that</p>
                    
                    <div className="relative">
                      <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {cert.userName}
                      </h2>
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#800020]/30 to-transparent mt-2" />
                    </div>

                    <p className="text-gray-600 text-[11px] max-w-lg leading-relaxed">
                      has successfully completed the <span className="font-bold text-[#4A0000]">{cert.courseName}</span> 
                      with a score of <span className="font-bold text-gray-900">{cert.score}%</span> and demonstrated 
                      outstanding proficiency in the required competencies.
                    </p>
                  </div>

                    {/* Footer Row */}
                    <div className="w-full flex justify-between items-end mt-4 px-10 text-gray-900 font-bold uppercase tracking-widest">
                      <div className="text-left">
                        <div className="text-[10px] mb-1">{cert.issueDate}</div>
                        <div className="h-[1px] w-24 bg-[#4A0000]/20 mb-1" />
                        <div className="text-[7px] text-gray-400 uppercase tracking-widest font-bold">Issue Date</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-[#001f3f] font-normal mb-[-4px] text-3xl signature-font translate-y-2 z-10" style={{ fontFamily: '"Mrs Saint Delafield", cursive' }}>Md Sunny</div>
                        <div className="h-[1px] w-32 bg-[#4A0000]/20 mb-1 ml-auto" />
                        <div className="text-[10px]">RSIC President</div>
                        <div className="text-[7px] text-gray-400 font-bold">Authorized Official</div>
                      </div>
                    </div>

                   {/* Absolute Bottom Info */}
                   <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-full">
                      <div className="text-[10px] text-gray-400 tracking-[0.4em] font-mono mb-1 uppercase font-bold">
                         SERIAL ID: {cert.slug}
                      </div>
                      <div className="text-[7px] text-gray-400 tracking-[0.2em] font-medium uppercase">
                         OFFICIALLY VERIFIED RECORD · RIZQARA SCIENCE & INNOVATION CLUB
                      </div>
                   </div>

                  {/* Verification Slug */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] text-[#4A0000]/40 tracking-[0.3em] font-mono font-bold uppercase">
                    AUTHENTIC RECORD: {cert.slug}
                  </div>
               </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-12">
             <button 
               onClick={() => window.print()}
               className="px-8 py-3 rounded-xl font-bold bg-[#800020]/10 text-[#800020] hover:bg-[#800020]/20 transition-all flex items-center gap-2"
             >
               Save as PDF
             </button>
             <button 
               onClick={handleDownloadImage}
               className="px-8 py-3 rounded-xl font-bold bg-[#800020] text-white hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
             >
               <Download size={18} /> Download Image
             </button>
          </div>

          {/* Public CTA */}
          <div className="bg-[#4A0000] rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
             
             <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <Brain size={32} />
                </div>
                <h2 className="text-3xl font-black mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>You can also earn this certificate</h2>
                <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  Join {cert.userName} and hundreds of other innovators in our most popular AI course. 
                  Start learning fundamental AI concepts and claim your official club certificate today.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    to="/programs" 
                    className="w-full sm:w-auto px-10 py-4 bg-white text-[#4A0000] font-black rounded-2xl transition-all hover:scale-105 hover:bg-gray-50 text-lg shadow-lg"
                  >
                    Enroll Now Free
                  </Link>
                  <Link 
                    to="/join" 
                    className="w-full sm:w-auto px-10 py-4 bg-white/10 text-white font-black rounded-2xl transition-all hover:bg-white/20 text-lg border border-white/20"
                  >
                    Join the Club
                  </Link>
                </div>
             </div>
          </div>
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
          .max-w-4xl, .bg-green-50, .bg-[#4A0000], button, .shadow-2xl, .flex.justify-center.gap-4 {
            display: none !important;
            box-shadow: none !important;
          }
          .bg-white.rounded-\[2\.5rem\].p-1 {
             padding: 0 !important;
             border: none !important;
             background: transparent !important;
             display: block !important;
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
            visibility: visible !important;
          }
          /* Ensure required containers are visible */
          .min-h-screen, .max-w-4xl, .bg-white.rounded-\[2\.5rem\] {
            display: block !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
