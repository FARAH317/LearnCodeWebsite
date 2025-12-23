import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Trophy, CheckCircle, Lock } from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    order: number;
  };
  isCompleted?: boolean;
  isLocked?: boolean;
  index: number;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isCompleted = false,
  isLocked = false,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        hover={!isLocked}
        glass
        className={`${isLocked ? 'opacity-50' : ''} ${
          isCompleted ? 'border-2 border-green-500/20' : ''
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Status Icon */}
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isCompleted
                ? 'bg-green-500/20'
                : isLocked
                ? 'bg-dark-700'
                : 'bg-primary-500/20'
            }`}
          >
            {isLocked ? (
              <Lock className="w-6 h-6 text-gray-500" />
            ) : isCompleted ? (
              <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
              <BookOpen className="w-6 h-6 text-primary-400" />
            )}
          </div>

          {/* Lesson Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500">
                Leçon {lesson.order}
              </span>
              {isCompleted && (
                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">
                  Complétée
                </span>
              )}
            </div>
            <h3 className="font-bold mb-1">{lesson.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-1">
              {lesson.description}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                ~15 min
              </span>
              <span className="text-xs text-primary-400 flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                +{lesson.xpReward} XP
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Link to={`/lessons/${lesson.id}`}>
            <Button
              size="sm"
              disabled={isLocked}
              icon={
                isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <BookOpen className="w-4 h-4" />
                )
              }
            >
              {isCompleted ? 'Revoir' : 'Commencer'}
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default LessonCard;