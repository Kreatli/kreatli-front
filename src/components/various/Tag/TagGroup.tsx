import { without } from 'ramda';
import React from 'react';
import { Control, FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

interface TagGroupProps<T extends FieldValues, K extends string> {
  name: FieldPath<T>;
  children: React.ReactNode;
  control: Control<T>;
  onChange?: (tags: K[]) => void;
  rules?: UseControllerProps<T>['rules'];
}

export const TagGroupContext = React.createContext({
  toggleTag: (_value: any) => {},
});

export const TagGroup = <T extends FieldValues, K extends string>(props: TagGroupProps<T, K>) => {
  const { name, children, control, rules, onChange } = props;
  const [checkedTags, setCheckedTags] = React.useState<K[]>([]);
  const { field } = useController({ control, name, rules });

  const toggleTag = React.useCallback((value: K) => {
    const tags = checkedTags.includes(value)
      ? without([value], checkedTags)
      : [...checkedTags, value];

    setCheckedTags(tags);
    onChange?.(tags);
    field.onChange(tags);
    field.onBlur();
  }, [checkedTags, field, onChange]);

  return (
    <TagGroupContext.Provider value={{ toggleTag }}>
      {children}
    </TagGroupContext.Provider>
  );
};
