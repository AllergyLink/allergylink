export function Chip({ active=false, children }: { active?: boolean, children: React.ReactNode }) {
  return <span className={active ? 'chip active' : 'chip'}>{children}</span>;
}
