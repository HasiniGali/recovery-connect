import React from 'react';
import { Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSaved } from '../../context/SavedContext';

interface BookmarkButtonProps {
  resourceId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  resourceId,
  size = 'md',
  className = ''
}) => {
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved(resourceId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(resourceId);
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4.5 h-4.5',
    lg: 'w-5 h-5'
  };

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
      aria-label={saved ? 'Remove from saved resources' : 'Save resource for later'}
      title={saved ? 'Saved' : 'Save for later'}
      className={`rounded-full border transition-all flex items-center justify-center ${sizeClasses[size]} ${
        saved
          ? 'bg-[#E7DFF3] border-[#C9BCE2] text-[#4D396E] shadow-xs'
          : 'bg-white/80 hover:bg-white border-[#EADBCE] text-[#6F6D76] hover:text-[#34343B]'
      } ${className}`}
    >
      <Bookmark
        className={`${iconSizes[size]} transition-colors ${saved ? 'fill-[#4D396E]' : ''}`}
      />
    </motion.button>
  );
};
