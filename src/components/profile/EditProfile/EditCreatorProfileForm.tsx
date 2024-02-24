import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { COUNTRIES } from '../../../constants/countries';
import { SKILL_OPTIONS_FOR_CREATOR } from '../../../constants/skills';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useNotifications } from '../../../hooks/useNotifications';
import { requestCurrentUserUpdate } from '../../../services/user';
import { User } from '../../../typings/user';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';
import { Tag } from '../../various/Tag';

interface Props {
  user: User.Creator;
  onCancel: () => void;
  onSuccess: () => void;
}

export const EditCreatorProfileForm = ({ user, onCancel, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { pushNotification } = useNotifications();
  const { mutate } = useMutation(requestCurrentUserUpdate, {
    onSuccess: () => {
      queryClient.refetchQueries('user');
      onSuccess();
      pushNotification({
        message: 'Your profile has been updated!',
        color: 'success',
        icon: 'checkCircle',
      });
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });
  const defaultValues = React.useMemo(() => ({
    name: user.name,
    country: user.country,
    description: user.description,
    discordUsername: user.discordUsername,
    twitterUrl: user.twitterUrl,
    interestSkills: user.interestSkills,
    youtubeUrlOther: user.youtubeUrlOther,
  }), [user]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: 'onTouched', defaultValues });

  const defaultSelectedCountry = user.country
    ? new Set([user.country])
    : undefined;

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-medium font-semibold mb-2">Basic Information</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="col-span-2 sm:col-span-1">
          <Input label="Email" isDisabled value={user.email} />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input
            label="Name"
            placeholder="John Doe"
            defaultValue={user.name}
            isInvalid={!!errors.name}
            {...register('name', VALIDATION_RULES.SHORT_TEXT)}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Select
            label="Country"
            placeholder="Select country"
            isInvalid={!!errors.country}
            defaultSelectedKeys={defaultSelectedCountry}
            {...register('country', VALIDATION_RULES.REQUIRED)}
          >
            {COUNTRIES.map((country) => (
              <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <h2 className="text-medium font-semibold mb-2">Channel Details</h2>
      <div className="grid grid-cols-2 gap-4 items-start mb-8">
        <div className="col-span-2">
          <Textarea
            label="Description"
            defaultValue={user.description}
            placeholder="Introduce yourself and describe your channel. Get creative!"
            isInvalid={!!errors.description}
            errorMessage={errors.description?.message}
            {...register('description', VALIDATION_RULES.DESCRIPTION.MIN_100)}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input
            startContent={<Icon className="text-gray-400" icon="twitter" />}
            endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
            aria-label="Twitter Link"
            defaultValue={user.twitterUrl}
            placeholder="https://twitter.com/myaccount"
            labelPlacement="outside"
            isInvalid={!!errors.twitterUrl}
            errorMessage={errors.twitterUrl?.message}
            {...register('twitterUrl', VALIDATION_RULES.TWITTER_ACCOUNT_URL)}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input
            startContent={<Icon className="text-gray-400" icon="discord" />}
            endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
            aria-label="Discord Username"
            placeholder="username"
            defaultValue={user.discordUsername}
            labelPlacement="outside"
            isInvalid={!!errors.discordUsername}
            errorMessage={errors.discordUsername?.message}
            {...register('discordUsername')}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input
            startContent={<Icon className="text-gray-400" icon="youtube" />}
            endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
            aria-label="Second Youtube Link"
            defaultValue={user.youtubeUrlOther}
            placeholder="https://youtube.com/@mysecondchannel"
            labelPlacement="outside"
            isInvalid={!!errors.youtubeUrlOther}
            errorMessage={errors.youtubeUrlOther?.message}
            {...register('youtubeUrlOther', VALIDATION_RULES.YOUTUBE_CHANNEL.OPTIONAL)}
          />
        </div>
      </div>
      {user.role === 'creator' && (
        <>
          <h2 className="text-medium font-semibold mb-2">Professionals Needed</h2>
          <Tag.Group name="interestSkills" control={control} rules={VALIDATION_RULES.REQUIRED}>
            <div className="flex flex-wrap gap-2 mb-8">
              {SKILL_OPTIONS_FOR_CREATOR.map((area) => (
                <Tag key={area.value} value={area.value} status={errors.interestSkills && 'danger'}>
                  {area.label}
                </Tag>
              ))}
            </div>
          </Tag.Group>
        </>
      )}
      <div className="flex gap-4 mb-4 justify-end">
        <Button color="secondary" variant="light" onClick={onCancel}>Cancel</Button>
        <Button type="submit" color="secondary" variant="flat">Update information</Button>
      </div>
    </form>
  );
};
