import { Button, Grid, Input, Textarea } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import { remove } from 'ramda';
import React from 'react';
import { Control, FieldErrors, useController, UseFormRegister } from 'react-hook-form';

import { AvatarUploader } from '../../various/AvatarUploader';
import { Icon } from '../../various/Icon';
import { DEFAULT_EXPERIENCE, DefaultValues, VALIDATIONS } from './constants';

interface Props {
  control: Control<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep4: React.FC<Props> = ({ control, errors, register }) => {
  const { field } = useController({ control, name: 'experiences', rules: VALIDATIONS.experiences });

  const handleAddMore = () => {
    field.onChange([
      ...field.value,
      { ...DEFAULT_EXPERIENCE, id: nanoid() },
    ]);
    field.onBlur();
  };

  const handleRemove = (index: number) => () => {
    field.onChange(remove(index, 1, field.value));
    field.onBlur();
  };

  return (
    <Grid.Container gap={1} css={{ gap: '2rem 0' }}>
      {field.value.map(({ id }, index) => (
        <Grid key={id} xs={12} direction="column">
          <Grid.Container css={{ gap: '0 1rem' }}>
            <Grid xs>
              <Grid.Container alignItems="center" css={{ gap: '1rem' }}>
                <Grid>
                  <AvatarUploader
                    label="logo"
                    control={control}
                    name={`experiences.${index}.imageUrl`}
                  />
                </Grid>
                <Grid xs direction="column" css={{ gap: '1rem 0' }}>
                  <Input
                    placeholder="Channel/Company"
                    aria-label="Channel/Company"
                    labelLeft={<Icon icon="building" />}
                    fullWidth
                    status={errors.experiences?.[index]?.companyName && 'error'}
                    {...register(`experiences.${index}.companyName`, VALIDATIONS['experiences.0.companyName'])}
                  />
                  <Input
                    placeholder="Channel/Company link"
                    aria-label="Channel/Company link"
                    labelLeft={<Icon icon="link" />}
                    fullWidth
                    status={errors.experiences?.[index]?.companyUrl && 'error'}
                    {...register(`experiences.${index}.companyUrl`, VALIDATIONS['experiences.0.companyUrl'])}
                  />
                </Grid>
                <Grid xs={12}>
                  <Textarea
                    placeholder="Description"
                    aria-label="Description"
                    fullWidth
                    status={errors.experiences?.[index]?.description && 'error'}
                    {...register(`experiences.${index}.description`, VALIDATIONS['experiences.0.description'])}
                  />
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid>
              <Button
                auto
                rounded
                color="error"
                icon={<Icon icon="trash" />}
                iconLeftCss={{ width: '1.2rem' }}
                disabled={index === 0}
                onClick={handleRemove(index)}
              />
            </Grid>
          </Grid.Container>
        </Grid>
      ))}
      <Grid xs={12}>
        <Button size="sm" auto rounded flat icon={<Icon icon="plus" />} onClick={handleAddMore}>
          Add more
        </Button>
      </Grid>
    </Grid.Container>
  );
};
