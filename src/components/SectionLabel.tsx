type SectionLabelProps = {
  children: string;
  light?: boolean;
};

export function SectionLabel({ children, light = false }: SectionLabelProps) {
  return <p className={`section-label${light ? ' section-label--light' : ''}`}>{children}</p>;
}
