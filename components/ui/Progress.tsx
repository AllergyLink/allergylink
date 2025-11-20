export function Progress({ step, total }: { step: number; total: number }) {
  const pct = Math.min(100, Math.max(0, Math.round((step/total)*100)));
  return <div className="progress"><span style={{ width: pct + '%' }} /></div>;
}
