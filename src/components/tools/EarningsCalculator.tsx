import { Card, CardBody } from '@nextui-org/react';
import React from 'react';

import { CalculatorSection, NumberField, ResultRow } from './CalculatorFields';
import { cpmClipPayout, fixedPayPerWeek, formatCurrency, toNumber, WEEKS_PER_MONTH } from './clippingMath';

export const EarningsCalculator = () => {
  const [clipsPerWeek, setClipsPerWeek] = React.useState('20');
  const [ratePerClip, setRatePerClip] = React.useState('25');
  const [minutesPerClip, setMinutesPerClip] = React.useState('30');

  const [campaignClipsPerWeek, setCampaignClipsPerWeek] = React.useState('10');
  const [qualifyingShare, setQualifyingShare] = React.useState('30');
  const [averageViews, setAverageViews] = React.useState('20000');
  const [ratePer1k, setRatePer1k] = React.useState('1');
  const [capPerClip, setCapPerClip] = React.useState('300');

  const fixedWeekly = fixedPayPerWeek(toNumber(clipsPerWeek), toNumber(ratePerClip));
  const fixedMonthly = fixedWeekly * WEEKS_PER_MONTH;
  const hoursPerWeek = (toNumber(clipsPerWeek) * toNumber(minutesPerClip)) / 60;
  const effectiveHourly = hoursPerWeek > 0 ? fixedWeekly / hoursPerWeek : 0;

  const qualifyingClips = toNumber(campaignClipsPerWeek) * (Math.min(toNumber(qualifyingShare), 100) / 100);
  const payoutPerQualifyingClip = cpmClipPayout({
    views: toNumber(averageViews),
    ratePer1k: toNumber(ratePer1k),
    capPerClip: toNumber(capPerClip),
  });
  const campaignWeekly = qualifyingClips * payoutPerQualifyingClip;
  const campaignMonthly = campaignWeekly * WEEKS_PER_MONTH;

  return (
    <div className="flex flex-col gap-6">
      <CalculatorSection
        title="Fixed-pay clipping"
        description="Clips you edit for a creator who pays per clip, per project or on a monthly retainer."
        fields={
          <>
            <NumberField label="Clips per week" value={clipsPerWeek} onValueChange={setClipsPerWeek} />
            <NumberField label="Pay per clip" prefix="$" value={ratePerClip} onValueChange={setRatePerClip} />
            <NumberField
              label="Minutes per clip"
              suffix="min"
              value={minutesPerClip}
              onValueChange={setMinutesPerClip}
              description="Include finding the moment, revisions and export."
            />
          </>
        }
        results={
          <>
            <ResultRow label="Per week" value={formatCurrency(fixedWeekly)} />
            <ResultRow label="Effective hourly rate" value={formatCurrency(effectiveHourly, true)} />
            <ResultRow label="Per month" value={formatCurrency(fixedMonthly)} emphasis />
          </>
        }
      />
      <CalculatorSection
        title="CPM campaign clipping"
        description="Clips you post on your own accounts for a campaign that pays per 1,000 views."
        fields={
          <>
            <NumberField
              label="Clips posted per week"
              value={campaignClipsPerWeek}
              onValueChange={setCampaignClipsPerWeek}
            />
            <NumberField
              label="Clips that clear the view minimum"
              suffix="%"
              value={qualifyingShare}
              onValueChange={setQualifyingShare}
              description="Clips under the campaign's minimum earn nothing."
            />
            <NumberField
              label="Average views per qualifying clip"
              value={averageViews}
              onValueChange={setAverageViews}
              step={1000}
            />
            <NumberField
              label="Rate per 1,000 views"
              prefix="$"
              value={ratePer1k}
              onValueChange={setRatePer1k}
              step={0.1}
            />
            <NumberField
              label="Payout cap per clip"
              prefix="$"
              value={capPerClip}
              onValueChange={setCapPerClip}
              description="Use 0 if the campaign has no cap."
            />
          </>
        }
        results={
          <>
            <ResultRow label="Payout per qualifying clip" value={formatCurrency(payoutPerQualifyingClip, true)} />
            <ResultRow label="Per week" value={formatCurrency(campaignWeekly)} />
            <ResultRow label="Per month" value={formatCurrency(campaignMonthly)} emphasis />
          </>
        }
      />
      <Card shadow="none" className="bg-default-100">
        <CardBody className="p-6">
          <dl>
            <ResultRow label="Estimated monthly total" value={formatCurrency(fixedMonthly + campaignMonthly)} emphasis />
          </dl>
          <p className="text-small text-foreground-500 mt-2">
            Estimates before platform fees and taxes, using a 4-week month. Campaign earnings vary a lot from week
            to week.
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
