import { Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { Icon } from '../../various/Icon';
import { DefaultValues } from './constants';

interface Props {
  errors: FieldErrors<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
}

export const SignUpCreatorStep2 = ({ errors, register }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 items-start">
      <div className="col-span-2">
        <Textarea
          label="Description"
          placeholder="Introduce yourself and describe your channel. Get creative!"
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
          {...register('description', VALIDATION_RULES.DESCRIPTION.MIN_100)}
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <Input
          type="url"
          startContent={<Icon className="text-gray-400" icon="youtube" />}
          aria-label="Youtube Link"
          placeholder="https://youtube.com/@mychannel"
          labelPlacement="outside"
          isInvalid={!!errors.youtubeUrl}
          errorMessage={errors.youtubeUrl?.message}
          {...register('youtubeUrl', VALIDATION_RULES.YOUTUBE_CHANNEL.REQUIRED)}
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <Input
          startContent={<Icon className="text-gray-400" icon="youtube" />}
          endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
          aria-label="Second Youtube Link"
          placeholder="https://youtube.com/@mysecondchannel"
          labelPlacement="outside"
          isInvalid={!!errors.youtubeUrlOther}
          errorMessage={errors.youtubeUrlOther?.message}
          {...register('youtubeUrlOther', VALIDATION_RULES.YOUTUBE_CHANNEL.OPTIONAL)}
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <Input
          startContent={<Icon className="text-gray-400" icon="discord" />}
          endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
          aria-label="Discord Username"
          placeholder="username#0000"
          labelPlacement="outside"
          isInvalid={!!errors.discordUsername}
          errorMessage={errors.discordUsername?.message}
          {...register('discordUsername', VALIDATION_RULES.DISCORD_USERNAME)}
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <Input
          startContent={<Icon className="text-gray-400" icon="twitter" />}
          endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
          aria-label="Twitter Link"
          placeholder="https://twitter.com/myaccount"
          labelPlacement="outside"
          isInvalid={!!errors.twitterUrl}
          errorMessage={errors.twitterUrl?.message}
          {...register('twitterUrl', VALIDATION_RULES.TWITTER_ACCOUNT_URL)}
        />
      </div>
    </div>
  );
};
