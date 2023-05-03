import { Grid, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { AvatarUploader } from '../../various/AvatarUploader';
import { Icon } from '../../various/Icon';
import { DefaultValues, VALIDATIONS } from './constants';

interface Props {
  control: Control<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep2: React.FC<Props> = ({ control, errors, register }) => {
  return (
    <>
      <Grid.Container gap={1} alignItems="center">
        <Grid>
          <AvatarUploader
            status={errors.avatarUrl && 'error'}
            name="avatarUrl"
            control={control}
            rules={VALIDATIONS.avatarUrl}
          />
        </Grid>
        <Grid css={{ flexGrow: 1 }}>
          <Textarea
            placeholder="Describe yourself"
            aria-label="Description"
            fullWidth
            status={errors.description && 'error'}
            {...register('description', VALIDATIONS.description)}
          />
        </Grid>
      </Grid.Container>
      <Grid.Container gap={1}>
        <Grid xs={12} sm={6}>
          <Input
            labelLeft={<Icon icon="link" />}
            labelRight="optional"
            aria-label="Portfolio Link"
            placeholder="https://myportflio.com"
            fullWidth
            status={errors.portfolioUrl && 'error'}
            {...register('portfolioUrl', VALIDATIONS.portfolioUrl)}
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
            labelLeft={<Icon icon="instagram" />}
            labelRight="optional"
            aria-label="Instagram Profile"
            placeholder="@myusername"
            fullWidth
            status={errors.instagramUsername && 'error'}
            {...register('instagramUsername', VALIDATIONS.instagramUsername)}
          />
        </Grid>
      </Grid.Container>
    </>
  );
};
