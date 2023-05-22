import { Grid, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { Icon } from '../../various/Icon';
import { DefaultValues } from './constants';

interface Props {
  errors: FieldErrors<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
}

export const SignUpCreatorStep2: React.FC<Props> = ({ errors, register }) => {
  return (
    <Grid.Container gap={1} alignItems="flex-start">
      <Grid xs={12}>
        <Textarea
          placeholder="Introduce yourself and describe your channel. Get creative!"
          aria-label="Description"
          fullWidth
          status={errors.description && 'error'}
          helperText={errors.description?.message}
          helperColor="error"
          {...register('description', VALIDATION_RULES.DESCRIPTION.MIN_100)}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Input
          type="url"
          labelLeft={<Icon icon="youtube" />}
          aria-label="Youtube Link"
          placeholder="https://youtube.com/@mychannel"
          fullWidth
          status={errors.youtubeUrl && 'error'}
          helperText={errors.youtubeUrl?.message}
          helperColor="error"
          {...register('youtubeUrl', VALIDATION_RULES.YOUTUBE_CHANNEL.REQUIRED)}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Input
          labelLeft={<Icon icon="youtube" />}
          labelRight="optional"
          aria-label="Second Youtube Link"
          placeholder="https://youtube.com/@mysecondchannel"
          fullWidth
          status={errors.youtubeUrlOther && 'error'}
          helperText={errors.youtubeUrlOther?.message}
          helperColor="error"
          {...register('youtubeUrlOther', VALIDATION_RULES.YOUTUBE_CHANNEL.OPTIONAL)}
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
          helperText={errors.discordUsername?.message}
          helperColor="error"
          {...register('discordUsername', VALIDATION_RULES.DISCORD_USERNAME)}
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
          helperText={errors.twitterUrl?.message}
          helperColor="error"
          {...register('twitterUrl', VALIDATION_RULES.TWITTER_ACCOUNT_URL)}
        />
      </Grid>
    </Grid.Container>
  );
};
