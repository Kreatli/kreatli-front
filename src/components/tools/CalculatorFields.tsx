import { Card, CardBody, Input } from '@nextui-org/react';
import React from 'react';

interface NumberFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  description?: string;
  prefix?: string;
  suffix?: string;
  step?: number;
}

export const NumberField = ({
  label,
  value,
  onValueChange,
  description,
  prefix,
  suffix,
  step = 1,
}: NumberFieldProps) => (
  <Input
    type="number"
    inputMode="decimal"
    min={0}
    step={step}
    label={label}
    labelPlacement="outside"
    placeholder="0"
    value={value}
    onValueChange={onValueChange}
    description={description}
    startContent={prefix ? <span className="text-small text-foreground-400">{prefix}</span> : undefined}
    endContent={suffix ? <span className="text-small text-foreground-400 whitespace-nowrap">{suffix}</span> : undefined}
  />
);

interface ResultRowProps {
  label: string;
  value: string;
  emphasis?: boolean;
}

export const ResultRow = ({ label, value, emphasis }: ResultRowProps) => (
  <div className="flex items-baseline justify-between gap-4">
    <dt className={emphasis ? 'font-semibold' : 'text-foreground-500'}>{label}</dt>
    <dd className={emphasis ? 'text-2xl font-semibold' : 'font-semibold'}>{value}</dd>
  </div>
);

interface CalculatorSectionProps {
  title: string;
  description: string;
  fields: React.ReactNode;
  results: React.ReactNode;
}

export const CalculatorSection = ({ title, description, fields, results }: CalculatorSectionProps) => (
  <Card shadow="sm">
    <CardBody className="p-6 gap-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">{title}</h2>
        <p className="text-foreground-500">{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8 pt-4">{fields}</div>
      <dl className="flex flex-col gap-2 rounded-medium bg-secondary-50 dark:bg-secondary-900/20 p-4" aria-live="polite">
        {results}
      </dl>
    </CardBody>
  </Card>
);
