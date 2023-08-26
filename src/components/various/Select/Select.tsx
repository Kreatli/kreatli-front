import { Dropdown, DropdownItem, DropdownMenu, DropdownMenuProps, DropdownTrigger, Input, InputProps } from '@nextui-org/react';
import React from 'react';
import { Control, FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

interface Props<T extends FieldValues> extends InputProps {
  control?: Control<T>;
  name: FieldPath<T>;
  options?: readonly {
    label: string;
    value: string;
  }[];
  color?: DropdownMenuProps['color'];
  rules?: UseControllerProps<T>['rules'];
  selectionMode?: DropdownMenuProps['selectionMode'];
}

export const Select = <T extends FieldValues>(props: Props<T>) => {
  const { control, color, name, selectionMode = 'single', rules, options = [], ...rest } = props;
  const [selected, setSelected] = React.useState<Set<string | number>>(new Set([]));
  const { field } = useController({ control, name, rules });
  const isSingleMode = selectionMode === 'single';

  React.useEffect(() => {
    if (!selected.has(field.value)) {
      setSelected(isSingleMode
        ? new Set([field.value])
        : new Set(field.value));
    }
  }, []);

  const handleChange = React.useCallback((keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') {
      return;
    }

    setSelected(keys);

    field.onChange(isSingleMode
      ? Array.from(keys).join('')
      : Array.from(keys));
    field.onBlur();
  }, [field, isSingleMode]);

  const selectedValue = React.useMemo(() => {
    return Array.from(selected)
      .map((value) => options.find((option) => option.value === value)?.label ?? '')
      .join(', ');
  }, [options, selected]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <div>
          <Input
            {...rest}
            type="text"
            value={selectedValue}
            readOnly
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={rest['aria-label']}
        selectionMode={selectionMode}
        color={color}
        selectedKeys={selected}
        onSelectionChange={handleChange}
      >
        {options.map(({ label, value }) => (
          <DropdownItem key={value}>{label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
