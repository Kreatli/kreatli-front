import { without } from 'ramda';
import React from 'react';
import { Control, FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

interface TagGroupProps<T extends FieldValues, K extends string> {
  name: FieldPath<T>;
  children: React.ReactNode;
  control: Control<T>;
  max?: number;
  onChange?: (tags: K[]) => void;
  rules?: UseControllerProps<T>['rules'];
}

export const TagGroupContext = React.createContext({
  checkedTags: [] as string[],
  toggleTag: (_value: any) => {},
});

export const TagGroup = <T extends FieldValues, K extends string>(props: TagGroupProps<T, K>) => {
  const { name, children, control, rules, max = Number.POSITIVE_INFINITY, onChange } = props;
  const { field } = useController({ control, name, rules });
  const [checkedTags, setCheckedTags] = React.useState<K[]>(field.value ?? []);

  React.useEffect(() => {
    if (checkedTags.length > max) {
      setCheckedTags(checkedTags.slice(0, max));
      onChange?.(checkedTags.slice(0, max));
      field.onChange(checkedTags.slice(0, max));
      field.onBlur();
    }
  }, [checkedTags]);

  const toggleTag = React.useCallback(
    (value: K) => {
      const tags = checkedTags.includes(value) ? without([value], checkedTags) : [...checkedTags, value];

      if (tags.length > max) {
        return;
      }

      setCheckedTags(tags);
      onChange?.(tags);
      field.onChange(tags);
      field.onBlur();
    },
    [checkedTags, field, max, onChange],
  );

  return <TagGroupContext.Provider value={{ checkedTags, toggleTag }}>{children}</TagGroupContext.Provider>;
};
