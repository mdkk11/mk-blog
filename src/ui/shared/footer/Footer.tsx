import type React from 'react';

export interface FooterLink {
  label: string;
  href?: string;
}

export interface FooterProps {
  leftLinks?: FooterLink[];
  rightLinks?: FooterLink[];
  copyright?: string;
  className?: string;
}

const defaultLeftLinks: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'About', href: '/about' },
];

const defaultRightLinks: FooterLink[] = [
  { label: 'Twitter', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'RSS', href: '#' },
];

export const Footer: React.FC<FooterProps> = ({
  leftLinks = defaultLeftLinks,
  rightLinks = defaultRightLinks,
  copyright = '© 2024 Blog. All rights reserved.',
  className = '',
}) => {
  return (
    <footer
      className={`border-t-[3px] border-border bg-background py-12 px-4 ${className}`}
    >
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
          <div>
            <h3 className='font-black font-heading text-2xl uppercase tracking-tighter mb-4'>
              Navigate
            </h3>
            <ul className='space-y-2 font-mono text-sm'>
              {leftLinks.map((link, index) => (
                <li
                  key={index}
                  className='hover:text-primary cursor-pointer transition-colors'
                >
                  {link.href ? (
                    <a href={link.href}>{link.label}</a>
                  ) : (
                    link.label
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='font-black font-heading text-2xl uppercase tracking-tighter mb-4'>
              Connect
            </h3>
            <ul className='space-y-2 font-mono text-sm'>
              {rightLinks.map((link, index) => (
                <li
                  key={index}
                  className='hover:text-primary cursor-pointer transition-colors'
                >
                  {link.href ? (
                    <a href={link.href}>{link.label}</a>
                  ) : (
                    link.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='pt-8 border-t-[2px] border-border'>
          <p className='font-mono text-xs opacity-60'>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};
