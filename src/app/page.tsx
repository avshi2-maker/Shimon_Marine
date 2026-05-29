'use client';

import { useLiftingDesigner } from '@/lib/useLiftingDesigner';
import { Header } from '@/components/Header';
import { Presets } from '@/components/Presets';
import { InputPanel } from '@/components/InputPanel';
import { DerivedReadout } from '@/components/DerivedReadout';
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
        <div>
          <InputPanel inputs={inputs} onChange={update} onCondition={setCondition} />
          <DerivedReadout geom={result.geom} />
        </div>

        <ResultsPanel result={result} onUpgrade={upgradeSelection} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AssemblyView result={result} />
          <CostValuePanel result={result} />
        </div>
      </div>

      <footer>
        INDICATIVE COST MODEL — replace with live supplier quotes · selection per GL Noble Denton 0027/ND Rev 10
        <br />
        מודל עלות אינדיקטיבי בלבד · מוקאפ לאפיון — לא תחליף לתכן הנדסי מאושר
      </footer>
    </div>
  );
}
