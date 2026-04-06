import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import type { FAQItem as FAQItemType } from '@types';

interface FAQItemProps {
  item: FAQItemType;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = React.memo(({ item, index }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (open) {
        gsap.fromTo(contentRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      } else {
        gsap.to(contentRef.current, {
          height: 0, opacity: 0, duration: 0.3, ease: 'power2.in'
        });
      }
    }
  }, [open]);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open
        ? 'border-primary shadow-yellow bg-white dark:bg-dark-surface dark:border-primary/50 translate-x-1'
        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-surface hover:border-primary/50'
        }`}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-5 md:px-6 md:py-6 text-left active:bg-gray-50/50 dark:active:bg-dark-bg/50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3 md:gap-4">
          <span className="flex-shrink-0 w-8 h-8 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center text-xs font-heading font-700 text-text-main shadow-sm">
            {index + 1}
          </span>
          <span className="font-heading font-700 text-text-main dark:text-dark-text text-sm md:text-base leading-snug">{item.q}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-text-muted dark:text-dark-muted flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-secondary dark:text-primary' : ''}`}
        />
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="px-5 pb-6 md:px-6 md:pb-6">
          <p className="text-text-muted dark:text-dark-muted leading-relaxed font-body text-sm pl-11 md:pl-12 opacity-90" dangerouslySetInnerHTML={{ __html: item.a }} />
        </div>
      </div>
    </div>
  );
});

export default FAQItem;
