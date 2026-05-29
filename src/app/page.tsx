'use client';

import { useLiftingDesigner } from '@/lib/useLiftingDesigner';
import { Header } from '@/components/Header';
import { Presets } from '@/components/Presets';
import { LoadingPanel } from '@/components/LoadingPanel';
import { LiftSolverPanel } from '@/components/LiftSolverPanel';
import { ConditionPanel } from '@/components/ConditionPanel';
import { BalanceReadout } from '@/components/BalanceReadout';
import { ResultsPanel } from '@/components/ResultsPanel';
import { AssemblyView } from '@/components/AssemblyView';
import { CostValuePanel } from '@/components/CostValuePanel';

export default function Page() {
  const { inputs, update, setCondition, applyPreset, upgradeSelection, result } = useLiftingDesigner();

  return (
    <div className="wrap">
      <Header />
      <Presets onPick={applyPreset} />

      <div className="grid">
        <div className="col">
          <LoadingPanel inputs={inputs} loading={result.loading} onChange={update} />
          <LiftSolverPanel inputs={inputs} onChange={update} />
          <ConditionPanel inputs={inputs} onChange={update} onCondition={setCondition} />
        </div>

        <ResultsPanel result={result} onUpgrade={upgradeSelection} />

        <div className="col">
          <BalanceReadout loading={result.loading} geom={result.geom} />
          <AssemblyView result={result} />
          <CostValuePanel result={result} />
        </div>
      </div>

      <footer>
        INDICATIVE COST MODEL — replace with live supplier quotes · selection &amp; balance per GL Noble Denton 0027/ND Rev 10
        <br />
        מודל עלות אינדיקטיבי · מוקאפ לאפיון — לא תחליף לתכן הנדסי מאושר
      </footer>
    </div>
  );
}
