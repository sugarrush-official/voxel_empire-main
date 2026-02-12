import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  onClick,
  ...props
}) => {
  const variantClass = variant === 'primary' ? 'pixel-btn-primary' : 'pixel-btn-secondary';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const audio = new Audio('/click.wav');
    audio.volume = 0.4;
    audio.play().catch(() => { });
    if (onClick) onClick(e);
  };

  return (
    <button
      className={`px-6 py-2 font-bold uppercase tracking-wider text-zinc-900 transition-all ${variantClass} ${className} ${props.disabled ? 'opacity-40 grayscale cursor-not-allowed pointer-events-none' : 'hover:scale-105 active:scale-95 cursor-pointer'}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};