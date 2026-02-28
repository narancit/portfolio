'use client';

import { Badge } from '@/components/ui/badge';
import type { PasswordStrength } from '@/types/password-generator';

interface StrengthIndicatorProps {
  strength: PasswordStrength;
  length: number;
}

export function StrengthIndicator({ strength, length }: StrengthIndicatorProps) {
  // Map strength levels to color classes and visual indicators
  const strengthConfig = {
    Weak: {
      color: 'bg-red-500/20 text-red-400 border-red-500/50',
      bars: 1,
      barColor: 'bg-red-500',
    },
    Fair: {
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      bars: 2,
      barColor: 'bg-yellow-500',
    },
    Good: {
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      bars: 3,
      barColor: 'bg-blue-500',
    },
    Strong: {
      color: 'bg-green-500/20 text-green-400 border-green-500/50',
      bars: 4,
      barColor: 'bg-green-500',
    },
  };

  const config = strengthConfig[strength];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Strength:</span>
          <Badge className={config.color} variant="outline">
            {strength}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Length:</span>
          <span className="text-sm font-medium text-foreground">{length}</span>
        </div>
      </div>

      {/* Visual strength bars */}
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              bar <= config.bars ? config.barColor : 'bg-muted'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
