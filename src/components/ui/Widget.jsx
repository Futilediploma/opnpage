import TrendPill from './TrendPill';
import Sparkline from './SparkLine';
import ProgressBar from './ProgressBar';

export default function Widget({
  title,
  metric,
  unit,
  delta,        // % up/down
  footnote,     // small caption
  progress,     // 0..100 for goal
  spark = [],   // numbers for sparkline
  icon,         // emoji or small icon
}) {
  return (
    <section className="bg-white rounded-xl border border-brand-gray p-20 shadow-subtle hover:shadow-card transition-shadow">
      <header className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-10">
          {icon && <span className="text-xl" aria-hidden="true">{icon}</span>}
          <h4 className="text-base font-semibold text-brand-navy">{title}</h4>
        </div>
        {(delta !== undefined) && <TrendPill value={delta} />}
      </header>

      <div className="flex items-end justify-between gap-12 mb-16">
        <div>
          <div className="text-3xl font-bold tracking-tight text-brand-navy">
            {metric}<span className="text-brand-navy/60 text-lg ml-6">{unit}</span>
          </div>
          {footnote && <p className="text-sm text-brand-navy/60 mt-6">{footnote}</p>}
        </div>
        {spark?.length > 1 && <Sparkline data={spark} />}
      </div>

      {typeof progress === 'number' && (
        <div className="space-y-8">
          <ProgressBar value={progress} />
          <p className="text-xs text-brand-navy/50">Goal {progress}%</p>
        </div>
      )}
    </section>
  );
}

