// ParticlesBackground.tsx
import { useMemo } from 'react';
import { Particles } from '@tsparticles/react';
import type { ISourceOptions } from '@tsparticles/engine';

interface Props {
  condition: string;
}

export default function ParticlesBackground({ condition }: Props) {
  const options = useMemo<ISourceOptions>(() => {
    let particles: ISourceOptions['particles'] = {
      number: { value: 70 },
      size: { value: 3 },
      color: { value: '#93c5fd' },
      move: { speed: 1.5 },
      opacity: { value: 0.6 },
    };

    switch (condition.toLowerCase()) {
      case 'clear sky':
        particles = {
          number: { value: 50 },
          color: { value: '#facc15' },
          move: { speed: 0.8 },
          opacity: { value: 0.7 },
          size: { value: 4 },
        };
        break;

      case 'rain':
      case 'shower rain':
      case 'light rain':
        particles = {
          number: { value: 100 },
          size: { value: 2 },
          color: { value: '#60a5fa' },
          move: { speed: 3, direction: 'bottom' },
          opacity: { value: 0.5 },
        };
        break;

      case 'snow':
        particles = {
          number: { value: 150 },
          size: { value: 3 },
          color: { value: '#f3f4f6' },
          move: { speed: 1, direction: 'bottom' },
          opacity: { value: 0.8 },
        };
        break;

      case 'thunderstorm':
        particles = {
          number: { value: 80 },
          size: { value: 3 },
          color: { value: '#fbbf24' },
          move: { speed: 5, direction: 'none' },
          opacity: { value: 0.9 },
        };
        break;
    }

    return {
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: 'transparent' },
      particles,
    };
  }, [condition]);

  return <Particles id="tsparticles" options={options} />;
}