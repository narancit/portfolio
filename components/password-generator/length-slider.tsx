'use client';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface LengthSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

export function LengthSlider({ value, onChange, min, max }: LengthSliderProps) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor="password-length"
        className="text-sm text-muted-foreground"
      >
        Adjust Length
      </Label>

      <Slider
        id="password-length"
        min={min}
        max={max}
        step={2}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        aria-label={`Password length: ${value} characters`}
        className="w-full"
      />

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min} chars</span>
        <span>{max} chars</span>
      </div>
    </div>
  );
}
