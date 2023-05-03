import { Dropdown, DropdownMenuProps, Input } from '@nextui-org/react';
import { Props as InputProps } from '@nextui-org/react/types/input/input-props';
import React from 'react';
import { Control, FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

interface Props<T extends FieldValues> extends InputProps {
  control?: Control<T>;
  name: FieldPath<T>;
  options?: {
    label: string;
    value: string;
  }[];
  color?: DropdownMenuProps['color'];
  rules?: UseControllerProps<T>['rules'];
}

export const Select = <T extends FieldValues>(props: Props<T>) => {
  const { control, color, name, rules, options = [], ...rest } = props;
  const [selected, setSelected] = React.useState<Set<string | number>>(new Set([]));
  const { field } = useController({ control, name, rules });

  React.useEffect(() => {
    if (!selected.has(field.value)) {
      setSelected(new Set([field.value]));
    }
  }, [field.value, selected]);

  const handleChange = React.useCallback((keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') {
      return;
    }

    setSelected(keys);

    field.onChange(Array.from(keys).join(''));
    field.onBlur();
  }, [field]);

  const selectedValue = React.useMemo(() => {
    const value = Array.from(selected).join('');

    return options.find((option) => option.value === value)?.label || '';
  }, [options, selected]);

  return (
    <Dropdown placement="bottom-left">
      <Dropdown.Trigger>
        <div style={{ width: '100%' }}>
          <Input
            {...rest}
            type="text"
            value={selectedValue}
            readOnly
          />
        </div>
      </Dropdown.Trigger>
      <Dropdown.Menu
        aria-label={rest['aria-label']}
        selectionMode="single"
        color={color}
        selectedKeys={selected}
        onSelectionChange={handleChange}
      >
        {options.map(({ label, value }) => (
          <Dropdown.Item
            key={value}
            css={{ height: 'auto', minHeight: '2.25rem' }}
          >
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
