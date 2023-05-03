import { Grid, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { CATEGORIES } from '../../../constants/categories';
import { Icon } from '../../various/Icon';
import { Select } from '../../various/Select';
import { DefaultValues, VALIDATIONS } from './constants';

interface Props {
  control: Control<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
}

export const SignUpCreatorStep2: React.FC<Props> = ({ control, errors, register }) => {
  return (
    <Grid.Container gap={1}>
      <Grid xs={12} sm={6}>
        <Select
          labelLeft="Category"
          aria-label="Category"
          placeholder="Select..."
          fullWidth
          status={errors.category && 'error'}
          name="category"
          options={CATEGORIES}
          control={control}
          rules={VALIDATIONS.category}
        />
      </Grid>
      <Grid xs={12}>
        <Textarea
          placeholder="Introduce yourself and describe your channel. Get creative!"
          aria-label="Description"
          fullWidth
          status={errors.description && 'error'}
          {...register('description', VALIDATIONS.description)}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Input
          type="url"
          labelLeft={<Icon icon="youtube" />}
          aria-label="Youtube Link"
          placeholder="https://youtube.com/@mychannel"
          fullWidth
          status={errors.socialMediaUrl && 'error'}
          {...register('socialMediaUrl', VALIDATIONS.socialMediaUrl)}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Input
          labelLeft={<Icon icon="youtube" />}
          labelRight="optional"
          aria-label="Second Youtube Link"
          placeholder="https://youtube.com/@mysecondchannel"
          fullWidth
          status={errors.socialMediaUrlOther && 'error'}
          {...register('socialMediaUrlOther', VALIDATIONS.socialMediaUrlOther)}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Input
          labelLeft={<Icon icon="discord" />}
          labelRight="optional"
          aria-label="Discord Username"
          placeholder="username#0000"
          fullWidth
          status={errors.discordUsername && 'error'}
          {...register('discordUsername', VALIDATIONS.discordUsername)}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Input
          labelLeft={<Icon icon="twitter" />}
          labelRight="optional"
          aria-label="Twitter Link"
          placeholder="https://twitter.com/myaccount"
          fullWidth
          status={errors.twitterUrl && 'error'}
          {...register('twitterUrl', VALIDATIONS.twitterUrl)}
        />
      </Grid>
    </Grid.Container>
  );
};
