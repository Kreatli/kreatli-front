import { Button } from '@nextui-org/react';
import React from 'react';

interface TableOfContentsItem {
  id: string;
  title: string;
  level?: number;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  className = '',
}) => {
  const [activeId, setActiveId] = React.useState<string>('');

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = items.length - 1; i >= 0; i -= 1) {
        const element = document.getElementById(items[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(items[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      className={`sticky top-24 self-start ${className}`}
      aria-label="Table of contents"
    >
      <div className="border-l-2 border-default-200 pl-4">
        <h3 className="text-sm font-semibold text-foreground-500 mb-3 uppercase tracking-wide">
          Table of Contents
        </h3>
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = activeId === item.id;
            const level = item.level || 1;
            const paddingLeft = level > 1 ? `${(level - 1) * 12}px` : '0';

            return (
              <li key={item.id} style={{ paddingLeft }}>
                <Button
                  variant="light"
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm transition-colors justify-start h-auto p-0 min-w-0 ${
                    isActive
                      ? 'text-secondary font-semibold'
                      : 'text-foreground-500 hover:text-foreground'
                  }`}
                >
                  {item.title}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
