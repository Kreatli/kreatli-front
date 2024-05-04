import {
  Button,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';

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
  const { t } = useTranslation(['common']);

  const queryClient = useQueryClient();
  const { pushNotification } = useNotifications();
  const { mutate } = useMutation({
    mutationFn: requestCurrentUserUpdate,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['user'] });
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
  const defaultValues = React.useMemo(
    () => ({
      name: user.name,
      country: user.country,
      description: user.description,
      discordUsername: user.discordUsername,
      twitterUrl: user.twitterUrl,
      interestSkills: user.interestSkills,
      youtubeUrlOther: user.youtubeUrlOther,
    }),
    [user],
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: 'onTouched', defaultValues });

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <ModalContent as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader>Edit Profile</ModalHeader>
      <ModalBody>
        <h2 className="text-medium font-semibold mb-2">Basic Information</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="col-span-2 sm:col-span-1">
            <Input label={t('common:email')} isDisabled value={user.email} />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Input
              label="Name"
              placeholder="John Doe"
              isInvalid={!!errors.name}
              {...register('name', VALIDATION_RULES.SHORT_TEXT)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Select
              label="Country"
              placeholder="Select country"
              disallowEmptySelection
              isInvalid={!!errors.country}
              {...register('country', VALIDATION_RULES.REQUIRED)}
            >
              {COUNTRIES.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <h2 className="text-medium font-semibold mb-2">Channel Details</h2>
        <div className="grid grid-cols-2 gap-4 items-start mb-8">
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
          <div className="col-span-2 sm:col-span-1">
            <Input
              startContent={<Icon className="text-gray-400" icon="discord" />}
              endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
              aria-label="Discord Username"
              placeholder="username"
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
              placeholder="https://youtube.com/@mysecondchannel"
              labelPlacement="outside"
              isInvalid={!!errors.youtubeUrlOther}
              errorMessage={errors.youtubeUrlOther?.message}
              {...register('youtubeUrlOther', VALIDATION_RULES.YOUTUBE_CHANNEL.OPTIONAL)}
            />
          </div>
        </div>
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
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" variant="light" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" color="secondary" variant="flat">
          Update information
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
