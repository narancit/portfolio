'use client';

import { Badge } from '@/components/ui/badge';
import type { PasswordStrength } from '@/types/password-generator';

interface StrengthIndicatorProps {
  strength: PasswordStrength;
}

export function StrengthIndicator({ strength }: StrengthIndicatorProps) {
  // Map strength levels to color classes and visual indicators
  const strengthConfig = {
    Weak: {
      color: 'bg-red-500/20 text-red-400 border-red-500/50',
      bars: 1,
    },
    Fair: {
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      bars: 2,
    },
    Good: {
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      bars: 3,
    },
    Strong: {
      color: 'bg-green-500/20 text-green-400 border-green-500/50',
      bars: 4,
    },
  };

  const config = strengthConfig[strength];

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <span className="text-sm text-muted-foreground">Password Strength:</span>
        <Badge className={config.color} variant="outline">
          {strength}
        </Badge>
      </div>

      {/* Visual strength bars */}
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`h-1 flex-1 rounded-full transition-colors ${
              bar <= config.bars
                ? strength === 'Weak'
                  ? 'bg-red-500'
                  : strength === 'Fair'
                    ? 'bg-yellow-500'
                    : strength === 'Good'
                      ? 'bg-blue-500'
                      : 'bg-green-500'
                : 'bg-muted'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
