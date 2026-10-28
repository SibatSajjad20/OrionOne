import { ElementType, ReactNode } from 'react';

type Level = 'display' | 'section' | 'card' | 'eyebrow' | 'ui';

const map: Record<Level, { tag: ElementType; className: string }> = {
  display: { tag: 'h1', className: 'type-display font-serif-heading text-4xl sm:text-6xl lg:text-7xl text-[#EDE5DA] leading-[1.08]' },
  section: { tag: 'h2', className: 'type-section font-serif-heading text-2xl sm:text-4xl lg:text-5xl text-[#EDE5DA] leading-[1.08]' },
  card:    { tag: 'h3', className: 'type-section font-serif-heading text-xl sm:text-2xl lg:text-3xl text-[#EDE5DA]' },
  eyebrow: { tag: 'span', className: 'type-eyebrow font-sans-body' },
  ui:      { tag: 'span', className: 'type-ui font-sans-body text-[11px]' },
};

export function Heading(props: {
  level: Level; as?: ElementType; accent?: ReactNode; children: ReactNode; className?: string;
}) {
  const cfg = map[props.level];
  const Tag = props.as ?? cfg.tag;
  const cls = [cfg.className, props.className || ''].join(' ');
  return (
    <Tag className={cls}>
      {props.children}
      {props.accent ? (
        <span className="type-display-accent text-sand-gradient"> {props.accent}</span>
      ) : null}
    </Tag>
  );
}
