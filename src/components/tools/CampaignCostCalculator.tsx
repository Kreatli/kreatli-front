import React from 'react';

import { CalculatorSection, NumberField, ResultRow } from './CalculatorFields';
import { fixedPayPerWeek, formatCurrency, formatNumber, toNumber, WEEKS_PER_MONTH } from './clippingMath';

export const CampaignCostCalculator = () => {
  const [clipsPerWeek, setClipsPerWeek] = React.useState('15');
  const [ratePerClip, setRatePerClip] = React.useState('25');
  const [viewsPerClip, setViewsPerClip] = React.useState('10000');

  const [paidViews, setPaidViews] = React.useState('1000000');
  const [ratePer1k, setRatePer1k] = React.useState('1');
  const [platformFee, setPlatformFee] = React.useState('0');

  const hiredWeekly = fixedPayPerWeek(toNumber(clipsPerWeek), toNumber(ratePerClip));
  const hiredMonthly = hiredWeekly * WEEKS_PER_MONTH;
  const hiredMonthlyViews = toNumber(clipsPerWeek) * WEEKS_PER_MONTH * toNumber(viewsPerClip);
  const hiredCostPer1k = hiredMonthlyViews > 0 ? hiredMonthly / (hiredMonthlyViews / 1000) : 0;

  const viewPayouts = (toNumber(paidViews) / 1000) * toNumber(ratePer1k);
  const fees = viewPayouts * (Math.min(toNumber(platformFee), 100) / 100);
  const campaignTotal = viewPayouts + fees;

  return (
    <div className="flex flex-col gap-6">
      <CalculatorSection
        title="Hire clippers (fixed pay)"
        description="A clipper edits clips for your own channels at an agreed rate. You pay for the work, whatever the views."
        fields={
          <>
            <NumberField label="Clips per week" value={clipsPerWeek} onValueChange={setClipsPerWeek} />
            <NumberField label="Rate per clip" prefix="$" value={ratePerClip} onValueChange={setRatePerClip} />
            <NumberField
              label="Expected views per clip"
              value={viewsPerClip}
              onValueChange={setViewsPerClip}
              step={1000}
              description="Your typical Shorts, TikTok or Reels views. Used for the cost per 1,000 views."
            />
          </>
        }
        results={
          <>
            <ResultRow label="Per week" value={formatCurrency(hiredWeekly)} />
            <ResultRow label="Views per month" value={formatNumber(hiredMonthlyViews)} />
            <ResultRow label="Effective cost per 1,000 views" value={formatCurrency(hiredCostPer1k, true)} />
            <ResultRow label="Per month" value={formatCurrency(hiredMonthly)} emphasis />
          </>
        }
      />
      <CalculatorSection
        title="CPM clipping campaign"
        description="Many clippers post clips on their own accounts and you pay per 1,000 verified views, up to your budget."
        fields={
          <>
            <NumberField
              label="Paid views you want"
              value={paidViews}
              onValueChange={setPaidViews}
              step={100000}
              description="Views that clear the minimum and are not capped."
            />
            <NumberField
              label="Rate per 1,000 views"
              prefix="$"
              value={ratePer1k}
              onValueChange={setRatePer1k}
              step={0.1}
            />
            <NumberField
              label="Platform fee"
              suffix="%"
              value={platformFee}
              onValueChange={setPlatformFee}
              description="If the campaign platform charges one."
            />
          </>
        }
        results={
          <>
            <ResultRow label="Payouts to clippers" value={formatCurrency(viewPayouts)} />
            <ResultRow label="Platform fee" value={formatCurrency(fees)} />
            <ResultRow label="Campaign budget" value={formatCurrency(campaignTotal)} emphasis />
          </>
        }
      />
      <p className="text-small text-foreground-500">
        Estimates only, using a 4-week month. Campaign spend is limited by the budget you fund; payout caps and view
        minimums change how that budget is shared between clips.
      </p>
    </div>
  );
};
