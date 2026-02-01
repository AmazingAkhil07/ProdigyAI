import React from 'react';

interface BadgeDisplayProps {
  icon: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earned: boolean;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ icon, name, description, rarity, earned }) => {
  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-amber-500',
    legendary: 'from-yellow-400 to-yellow-600'
  };

  const rarityBorders = {
    common: 'border-gray-400',
    rare: 'border-blue-400',
    epic: 'border-purple-400',
    legendary: 'border-yellow-400'
  };

  return (
    <div
      className={`
        relative flex flex-col items-center p-3 rounded-lg border-2 transition-all
        ${earned ? rarityBorders[rarity] : 'border-gray-700 opacity-50'}
        ${earned ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}
        bg-gray-800
      `}
      title={description}
    >
      <div
        className={`
          text-3xl mb-2
          ${!earned && 'grayscale opacity-40'}
        `}
      >
        {icon}
      </div>
      <div className="text-xs font-semibold text-center text-white">
        {name}
      </div>
      {earned && (
        <div
          className={`
            absolute -top-1 -right-1 w-4 h-4 rounded-full
            bg-gradient-to-br ${rarityColors[rarity]}
            flex items-center justify-center text-[8px]
          `}
        >
          ✓
        </div>
      )}
    </div>
  );
};

interface BadgesGridProps {
  badges: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
  }>;
  earnedBadges: string[];
}

export const BadgesGrid: React.FC<BadgesGridProps> = ({ badges, earnedBadges }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {badges.map(badge => (
        <BadgeDisplay
          key={badge.id}
          icon={badge.icon}
          name={badge.name}
          description={badge.description}
          rarity={badge.rarity}
          earned={earnedBadges.includes(badge.id)}
        />
      ))}
    </div>
  );
};
