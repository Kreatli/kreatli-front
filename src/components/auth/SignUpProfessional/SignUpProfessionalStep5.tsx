import { Button, Grid, Input, Spacer } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import { remove } from 'ramda';
import React from 'react';
import { Control, FieldErrors, useController, UseFormRegister } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { FileUploader } from '../../various/FileUploader';
import { Icon } from '../../various/Icon';
import { DEFAULT_CERTIFICATE, DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep5: React.FC<Props> = ({ control, errors, register }) => {
  const { field } = useController({ control, name: 'certificates' });

  const handleAddMore = () => {
    field.onChange([
      ...field.value,
      { ...DEFAULT_CERTIFICATE, id: nanoid() },
    ]);
    field.onBlur();
  };

  const handleRemove = (index: number) => () => {
    field.onChange(remove(index, 1, field.value));
    field.onBlur();
  };

  return (
    <Grid.Container gap={1}>
      {field.value.map(({ id }, index) => (
        <Grid key={id} xs={12} direction="column">
          <Grid.Container alignItems="center" css={{ gap: '1rem' }}>
            <Grid xs>
              <Input
                labelLeft="Certificate"
                aria-label="Certificate"
                placeholder="Adobe Certified Expert in Premiere Pro"
                fullWidth
                status={errors.certificates?.[index]?.name && 'error'}
                helperText={errors.certificates?.[index]?.name?.message}
                helperColor="error"
                {...register(`certificates.${index}.name`, VALIDATION_RULES.SHORT_TEXT)}
              />
            </Grid>
            <Grid>
              <FileUploader
                control={control}
                name={`certificates.${index}.fileUrl`}
                status={errors.certificates?.[index]?.fileUrl && 'error'}
                rules={VALIDATION_RULES.REQUIRED}
              />
            </Grid>
            <Grid>
              <Button
                auto
                rounded
                color="error"
                icon={<Icon icon="trash" />}
                iconLeftCss={{ width: '1.2rem' }}
                onClick={handleRemove(index)}
              />
            </Grid>
          </Grid.Container>
        </Grid>
      ))}
      <Spacer />
      <Grid xs={12}>
        <Button size="sm" auto rounded flat icon={<Icon icon="plus" />} onClick={handleAddMore}>
          Add certificate
        </Button>
      </Grid>
    </Grid.Container>
  );
};
