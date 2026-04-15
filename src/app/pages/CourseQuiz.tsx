import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useParams } from 'react-router';
import { Brain, CheckCircle2, XCircle, ArrowRight, Award, Timer, HelpCircle } from 'lucide-react';

const QUESTIONS = [
  {
    q: "What does AI stand for?",
    a: ["Artificial Intelligence", "Automated Information", "Advanced Integration", "Actual Implementation"],
    c: 0
  },
  {
    q: "Which of the following is an example of Narrow AI?",
    a: ["A robot that can feel emotions", "GPT-3 performing specific text tasks", "An AI that can do any human job", "A conscious computer"],
    c: 1
  },
  {
    q: "What is 'Machine Learning'?",
    a: ["When machines build other machines", "A subset of AI where systems learn from data", "A type of physical robot", "The hardware used to run AI"],
    c: 1
  },
  {
    q: "What is a 'Neural Network' inspired by?",
    a: ["The Internet", "Spider webs", "The human brain", "Electric circuits"],
    c: 2
  },
  {
    q: "What is 'Prompt Engineering'?",
    a: ["Building computers", "Designing effective inputs for AI models", "Repairing AI servers", "Writing code in Python"],
    c: 1
  },
  {
    q: "Which company created ChatGPT?",
    a: ["Google", "Microsoft", "OpenAI", "Meta"],
    c: 2
  },
  {
    q: "What is 'Deep Learning'?",
    a: ["Learning while sleeping", "ML using multi-layered neural networks", "Searching the dark web", "A very slow learning process"],
    c: 1
  },
  {
    q: "In AI, what is 'Training'?",
    a: ["Taking an AI to the gym", "The process of providing data to an ML model to learn patterns", "Installing an AI on a computer", "Upgrading the AI's CPU"],
    c: 1
  },
  {
    q: "What is 'Computer Vision'?",
    a: ["Having good eyesight", "AI's ability to interpret and understand digital images", "A screen protector", "Looking at a monitor for too long"],
    c: 1
  },
  {
    q: "What does 'NLP' stand for?",
    a: ["Natural Language Processing", "Normal Logical Programming", "New Layer Protocol", "Net Level Probability"],
    c: 0
  },
  {
    q: "What is 'Reinforcement Learning'?",
    a: ["Learning by watching videos", "Learning through trial and error with rewards", "Strict rules for AI", "Repeating the same data twice"],
    c: 1
  },
  {
    q: "What is an 'AI Hallucination'?",
    a: ["When an AI gets a virus", "When an AI generates confident but false information", "When an AI predicts the future", "A screen glitch"],
    c: 1
  },
  {
    q: "Which field of AI deals with generating new content like text or images?",
    a: ["Predictive AI", "Generative AI", "Static AI", "Recursive AI"],
    c: 1
  },
  {
    q: "What is 'LLM' short for?",
    a: ["Large Language Model", "Little Logical Machine", "Low Latency Module", "Long List Memory"],
    c: 0
  },
  {
    q: "What is 'Supervised Learning'?",
    a: ["Learning with a teacher watching the AI", "Learning from labeled data sets", "Learning without any data", "Learning very fast"],
    c: 1
  },
  {
    q: "Which of these is a popular language for AI development?",
    a: ["HTML", "Python", "CSS", "PHP"],
    c: 1
  },
  {
    q: "What is 'Biometrics'?",
    a: ["Biological statistics", "Using AI to identify people via biological traits (face, iris)", "Measuring plant growth", "AI used in medicine only"],
    c: 1
  },
  {
    q: "What is 'Ethics in AI'?",
    a: ["Making AI run faster", "Principles to ensure AI is developed safely and fairly", "The cost of building AI", "The history of AI"],
    c: 1
  },
  {
    q: "What is a 'Turing Test'?",
    a: ["A test for internet speed", "A test of a machine's ability to exhibit intelligent behavior equivalent to a human", "A hardware stress test", "A typing test"],
    c: 1
  },
  {
    q: "What is the primary goal of RSIC's 'Learn AI' course?",
    a: ["To build a super-computer", "To understand AI foundations and start innovating", "To replace human researchers", "To play video games better"],
    c: 1
  }
];

export function CourseQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === QUESTIONS[current].c;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (current < QUESTIONS.length - 1) {
        setCurrent(c => c + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  const percentage = Math.round((score / QUESTIONS.length) * 100);
  const passed = percentage >= 80;

  if (showResult) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 bg-[#f8f9fc]">
        <div className="max-w-xl mx-auto text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            {passed ? (
              <>
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award size={40} />
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Congratulations!</h1>
                <p className="text-gray-500 mb-6">You passed the AI Essentials Quiz with a score of {score}/{QUESTIONS.length} ({percentage}%)</p>
                <div className="bg-gray-50 p-6 rounded-2xl mb-8">
                  <p className="text-sm text-gray-600 mb-4">You are now eligible to claim your official certificate of completion.</p>
                  <button 
                    onClick={() => navigate(`/certificates/claim/${id}?score=${score}`)}
                    className="w-full py-4 rounded-xl font-bold bg-[#4A0000] text-white flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                  >
                    Claim Your Certificate <ArrowRight size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle size={40} />
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Keep Learning!</h1>
                <p className="text-gray-500 mb-6">You scored {score}/{QUESTIONS.length} ({percentage}%). You need at least 80% to pass.</p>
                <button 
                  onClick={() => { setShowResult(false); setCurrent(0); setScore(0); setSelected(null); }}
                  className="w-full py-4 rounded-xl font-bold bg-gray-900 text-white hover:scale-[1.02] transition-all"
                >
                  Try Again
                </button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-[#f8f9fc]">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#4A0000] rounded-xl flex items-center justify-center text-white">
              <Brain size={24} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">AI Essentials Quiz</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Timer size={14} /> Question {current + 1} of {QUESTIONS.length}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Progress</div>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#4A0000] transition-all duration-300" 
                style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <motion.div 
          key={current}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex gap-3">
             <HelpCircle className="text-[#4A0000] flex-shrink-0" />
             {QUESTIONS[current].q}
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {QUESTIONS[current].a.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrectOpt = isCorrect !== null && i === QUESTIONS[current].c;
              const isWrongOpt = isCorrect === false && isSelected;

              return (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => handleSelect(i)}
                  className={`
                    flex items-center justify-between p-5 rounded-2xl border-2 text-left transition-all
                    ${isSelected ? 'border-[#4A0000] bg-[#4A0000]/5' : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'}
                    ${isCorrectOpt ? 'border-green-500 bg-green-50' : ''}
                    ${isWrongOpt ? 'border-red-500 bg-red-50' : ''}
                  `}
                >
                  <span className={`font-semibold ${isSelected || isCorrectOpt ? 'text-gray-900' : 'text-gray-600'}`}>
                    {opt}
                  </span>
                  {isCorrectOpt && <CheckCircle2 size={20} className="text-green-600" />}
                  {isWrongOpt && <XCircle size={20} className="text-red-600" />}
                </button>
              );
            })}
          </div>
        </motion.div>
        
        <p className="mt-8 text-center text-sm text-gray-400">
          Tip: You need to answer at least 16 out of 20 questions correctly to earn your certificate.
        </p>
      </div>
    </div>
  );
}
