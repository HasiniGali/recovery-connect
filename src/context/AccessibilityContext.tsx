import React, { createContext, useContext, useState, useEffect } from 'react';

export type TextSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
  resetAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSizeState] = useState<TextSize>(() => {
    return (localStorage.getItem('recovery_connect_text_size') as TextSize) || 'normal';
  });

  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    return localStorage.getItem('recovery_connect_high_contrast') === 'true';
  });

  const [reducedMotion, setReducedMotionState] = useState<boolean>(() => {
    return localStorage.getItem('recovery_connect_reduced_motion') === 'true';
  });

  useEffect(() => {
    const root = document.documentElement;

    // Apply text sizing
    root.classList.remove('text-scale-lg', 'text-scale-xl');
    if (textSize === 'large') root.classList.add('text-scale-lg');
    if (textSize === 'xlarge') root.classList.add('text-scale-xl');

    // Apply high contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply reduced motion
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [textSize, highContrast, reducedMotion]);

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size);
    localStorage.setItem('recovery_connect_text_size', size);
  };

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled);
    localStorage.setItem('recovery_connect_high_contrast', enabled ? 'true' : 'false');
  };

  const setReducedMotion = (enabled: boolean) => {
    setReducedMotionState(enabled);
    localStorage.setItem('recovery_connect_reduced_motion', enabled ? 'true' : 'false');
  };

  const resetAccessibility = () => {
    setTextSize('normal');
    setHighContrast(false);
    setReducedMotion(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        highContrast,
        setHighContrast,
        reducedMotion,
        setReducedMotion,
        resetAccessibility
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within an AccessibilityProvider');
  return ctx;
};
