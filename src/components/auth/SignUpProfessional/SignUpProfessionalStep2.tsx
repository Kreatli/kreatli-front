import { Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { AvatarUploader } from '../../various/AvatarUploader';
import { Icon } from '../../various/Icon';
import { DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep2: React.FC<Props> = ({ control, errors, register }) => {
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <AvatarUploader
          status={errors.avatarUrl && 'danger'}
          name="avatarUrl"
          control={control}
          rules={VALIDATION_RULES.REQUIRED}
        />
        <div className="flex-1">
          <Textarea
            label="Description"
            placeholder="Describe your background and make your profile stand out!"
            validationState={errors.description && 'invalid'}
            errorMessage={errors.description?.message}
            {...register('description', VALIDATION_RULES.DESCRIPTION.MIN_100)}
          />
        </div>
      </div>
      <div className="grid items-start gap-4 grid-cols-1 sm:grid-cols-2">
        <Input
          startContent={<Icon className="text-gray-400" icon="link" />}
          endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
          aria-label="Portfolio Link"
          placeholder="https://myportflio.com"
          validationState={errors.portfolioUrl && 'invalid'}
          errorMessage={errors.portfolioUrl?.message}
          {...register('portfolioUrl', VALIDATION_RULES.URL.OPTIONAL)}
        />
        <Input
          startContent={<Icon className="text-gray-400" icon="twitter" />}
          endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
          aria-label="Twitter Link"
          placeholder="https://twitter.com/myaccount"
          validationState={errors.twitterUrl && 'invalid'}
          errorMessage={errors.twitterUrl?.message}
          {...register('twitterUrl', VALIDATION_RULES.TWITTER_ACCOUNT_URL)}
        />
        <Input
          startContent={<Icon className="text-gray-400" icon="discord" />}
          endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
          aria-label="Discord Username"
          placeholder="username#0000"
          validationState={errors.discordUsername && 'invalid'}
          errorMessage={errors.discordUsername?.message}
          {...register('discordUsername', VALIDATION_RULES.DISCORD_USERNAME)}
        />
        <Input
          startContent={<Icon className="text-gray-400" icon="instagram" />}
          endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
          aria-label="Instagram Profile"
          placeholder="@myusername"
          validationState={errors.instagramUsername && 'invalid'}
          errorMessage={errors.instagramUsername?.message}
          {...register('instagramUsername', VALIDATION_RULES.INSTAGRAM_USERNAME)}
        />
      </div>
    </>
  );
};
