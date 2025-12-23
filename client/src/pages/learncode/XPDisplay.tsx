import { motion } from 'framer-motion';
import { Zap, TrendingUp } from 'lucide-react';

interface XPDisplayProps {
  currentXP: number;
  level: number;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const XPDisplay: React.FC<XPDisplayProps> = ({
  currentXP,
  level,
  showProgress = true,
  size = 'md',
}) => {
  const xpForNextLevel = level * 1000;
  const progress = (currentXP / xpForNextLevel) * 100;
  const xpNeeded = xpForNextLevel - currentXP;

  const sizes = {
    sm: {
      text: 'text-sm',
      icon: 'w-4 h-4',
      bar: 'h-1',
    },
    md: {
      text: 'text-base',
      icon: 'w-5 h-5',
      bar: 'h-2',
    },
    lg: {
      text: 'text-lg',
      icon: 'w-6 h-6',
      bar: 'h-3',
    },
  };

  return (
    <div className="space-y-2">
      {/* XP Amount */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Zap className={`${sizes[size].icon} text-yellow-400`} />
          </div>
          <div>
            <p className={`${sizes[size].text} font-bold`}>
              {currentXP.toLocaleString()} XP
            </p>
            <p className="text-xs text-gray-400">Niveau {level}</p>
          </div>
        </div>
        {showProgress && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <TrendingUp className="w-3 h-3" />
            <span>{xpNeeded} XP restants</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div>
          <div className={`${sizes[size].bar} bg-dark-700 rounded-full overflow-hidden`}>
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-500">
              {currentXP} / {xpForNextLevel} XP
            </p>
            <p className="text-xs text-primary-400 font-medium">
              {Math.round(progress)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default XPDisplay;