export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }) {
  const { variant = 'primary', style, ...rest } = props;
  const base = 'btn';
  const cls = variant === 'secondary' ? base + ' secondary' : base + (variant==='danger' ? ' danger' : '');
  return <button className={cls} style={style} {...rest} />;
}
