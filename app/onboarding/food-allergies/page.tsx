
import { Progress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';

export default function Page() {
  return (
    <main className="container col">
      <h1 className="title">Allergies (Food)</h1>
      <Progress step={2} total={5} />
      <div className="card col">
        <p className="muted">Fields/components go here.</p>
      </div>
      <div className="row" style={{justifyContent:'space-between'}}>
        <Button className="btn secondary">Back</Button>
        <Button>Next</Button>
      </div>
    </main>
  );
}
