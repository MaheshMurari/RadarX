import React from 'react';
import { FileText, Users, Trophy, Mail, CheckCircle, XCircle, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LiveTracker({ jobTitle, progress = {}, topMatches = [], emailSent = false }) {
  const { compared = false, ranked = false, emailed = false } = progress;
  const recommendedMatches = topMatches.filter(m => m.score >= 0.5);
const hasRecommended = recommendedMatches.length > 0;


  const steps = [
    {
      name: 'JD Analysis',
      icon: FileText,
      active: compared,
      details: '✓ JD text extracted • Skills identified',
    },
    {
      name: 'Profile Comparison',
      icon: Users,
      active: ranked,
      details: '✓ Consultant profiles matched by AI',
    },
    {
      name: 'Intelligent Ranking',
      icon: Trophy,
     active: hasRecommended,
failed: !hasRecommended && ranked,
details: hasRecommended
  ? `✓ ${recommendedMatches.length} profile${recommendedMatches.length > 1 ? 's' : ''} recommended`
  : '⚠ No profiles met the quality threshold',

    },
    {
      name: 'Email Sent',
      icon: Mail,
      active: emailed && emailSent,
      details: emailSent
        ? '✓ Email successfully sent to recruiter'
        : '📬 Ready to send',
    },
  ];

  const currentIndex = steps.findIndex((s) => !s.active && !s.failed);
  const progressPercent = currentIndex === -1 ? 100 : (currentIndex / steps.length) * 100;

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl space-y-10 border border-gray-300">
      {/* Premium Header */}
      <h3 className="text-2xl font-extrabold text-center text-gray-800 tracking-wide flex items-center justify-center gap-2 mb-4">
        {emailSent ? (
          <>
            <Brain
              size={28}
              className={`${
                hasRecommended
                  ? 'text-green-600 drop-shadow-[0_0_5px_rgba(34,197,94,0.6)]'
                  : 'text-yellow-500 drop-shadow-[0_0_5px_rgba(250,204,21,0.6)]'
              }`}
            />
            <span
              className={`${
                hasRecommended ? 'text-green-700' : 'text-yellow-700'
              } flex items-center gap-2`}
            >
              {hasRecommended ? 'Recognised' : 'Notified'}
              <span
                className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full shadow-sm animate-pulse ${
                  hasRecommended
                    ? 'bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-800'
                    : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                }`}
              >
                {hasRecommended ? '🏅 Top Match' : '⚠ No Recommended Profiles'}
              </span>
            </span>
          </>
        ) : (
          <>
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain size={28} className="text-purple-600 drop-shadow-[0_0_5px_rgba(150,0,255,0.6)]" />
            </motion.span>
            <span className="!text-gray-900">
              Matching for{' '}
              <span className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                {jobTitle}
              </span>
            </span>
          </>
        )}
      </h3>

      {/* Glowing Progress Bar */}
      <div className="relative w-full h-20">
        <div className="absolute top-[36px] left-0 w-full h-1 bg-gray-200 rounded-full z-0" />

        <div className="absolute top-[34px] left-0 w-full h-2 z-10 flex justify-between items-center px-[6px]">
          {steps.map((step, i) => {
            if (i === steps.length - 1) return null;
            const nextActive = steps[i + 1].active;
            return (
              <div key={i} className="w-full h-full relative">
                <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id={`glow-line-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={step.active ? '#00ffff' : '#ccc'} />
                      <stop offset="100%" stopColor={nextActive ? '#00ffff' : '#ccc'} />
                    </linearGradient>
                  </defs>
                  <line
                    x1="0"
                    y1="5"
                    x2="100"
                    y2="5"
                    stroke={`url(#glow-line-${i})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            );
          })}
        </div>

        <div className="absolute top-[34px] left-0 w-full h-2 rounded-full overflow-hidden z-20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
          />
        </div>

        {!emailSent && (
          <motion.div
            className="absolute top-[24px] w-6 h-6 rounded-full bg-cyan-400 shadow-[0_0_15px_5px_rgba(0,255,255,0.6)] animate-pulse z-30"
            animate={{ left: `calc(${progressPercent}% - 12px)` }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        )}

        <div className="absolute top-4 left-0 w-full flex justify-between z-40">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center w-1/4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all shadow-md ${
                  step.active
                    ? 'bg-green-500 border-green-300'
                    : step.failed
                    ? 'bg-red-500 border-red-300'
                    : 'bg-gray-800 border-gray-600'
                }`}
              >
                {step.active ? (
                  <CheckCircle className="text-white w-5 h-5" />
                ) : step.failed ? (
                  <XCircle className="text-white w-5 h-5" />
                ) : (
                  <step.icon className="text-white w-5 h-5" />
                )}
              </div>
              <div className="mt-2 text-sm text-center font-semibold text-gray-700">{step.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Description */}
      <div className="text-center mt-4">
        {steps
          .slice()
          .reverse()
          .find((step) => step.active || step.failed) && (
          <motion.div
            key={steps.findIndex((s) => s.active || s.failed)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="inline-block bg-white/30 px-6 py-3 rounded-xl border border-white/40 backdrop-blur-md shadow-xl"
          >
            <div className="text-base text-gray-900 italic tracking-wide font-medium">
              {
                steps
                  .slice()
                  .reverse()
                  .find((step) => step.active || step.failed)?.details
              }
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
