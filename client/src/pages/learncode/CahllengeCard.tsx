import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Clock, Code2, Zap } from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';

interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    language: string;
    xpReward: number;
    timeLimit?: number;
  };
  index: number;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, index }) => {
  const difficultyVariants = {
    easy: 'success',
    medium: 'warning',
    hard: 'danger',
  } as const;

  const difficultyLabels = {
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card hover gradient className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">
              {challenge.title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={difficultyVariants[challenge.difficulty]}>
                {difficultyLabels[challenge.difficulty]}
              </Badge>
              <Badge variant="info">{challenge.language.toUpperCase()}</Badge>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
          {challenge.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-700">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>{challenge.xpReward} XP</span>
            </div>
            {challenge.timeLimit && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{Math.floor(challenge.timeLimit / 60)} min</span>
              </div>
            )}
          </div>
          <Link to={`/challenges/${challenge.id}`}>
            <Button size="sm" icon={<Code2 className="w-4 h-4" />}>
              Relever
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default ChallengeCard;