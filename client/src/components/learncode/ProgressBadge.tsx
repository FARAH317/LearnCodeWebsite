import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Award } from 'lucide-react';

interface ProgressBadgeProps {
  xp: number;
  level: number;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBadge = ({ xp, level, size = 'md' }: ProgressBadgeProps) => {
  const xpForNextLevel = level * 1000;
  const progress = (xp / xpForNextLevel) * 100;

  const sizes = {
    sm: {
      container: 'w-16 h-16',
      icon: 'w-6 h-6',
      text: 'text-xs',
    },
    md: {
      container: 'w-24 h-24',
      icon: 'w-8 h-8',
      text: 'text-sm',
    },
    lg: {
      container: 'w-32 h-32',
      icon: 'w-12 h-12',
      text: 'text-base',
    },
  };

  const getIcon = () => {
    if (level >= 10) return <Award className={sizes[size].icon} />;
    if (level >= 5) return <Star className={sizes[size].icon} />;
    if (level >= 3) return <Zap className={sizes[size].icon} />;
    return <Trophy className={sizes[size].icon} />;
  };

  const getColor = () => {
    if (level >= 10) return 'from-purple-500 to-pink-500';
    if (level >= 5) return 'from-yellow-500 to-orange-500';
    if (level >= 3) return 'from-blue-500 to-cyan-500';
    return 'from-green-500 to-emerald-500';
  };

  return (
    <div className="relative inline-block">
      {/* Background Circle */}
      <svg
        className={`${sizes[size].container} -rotate-90`}
        viewBox="0 0 100 100"
      >
        {/* Background */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-dark-700"
        />
        
        {/* Progress */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 45}`}
          initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
          animate={{
            strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100),
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`bg-gradient-to-br ${getColor()} rounded-full p-2 mb-1`}>
          {getIcon()}
        </div>
        <span className={`font-black ${sizes[size].text}`}>{level}</span>
      </div>
    </div>
  );
};

export default ProgressBadge;