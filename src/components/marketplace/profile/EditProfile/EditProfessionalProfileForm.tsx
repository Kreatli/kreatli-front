import {
  Button,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tab,
  Tabs,
  Textarea,
} from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { omit } from 'ramda';
import React from 'react';
import { useForm } from 'react-hook-form';

import { COUNTRIES } from '../../../../constants/countries';
import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { useNotifications } from '../../../../hooks/useNotifications';
import { requestCurrentUserUpdate } from '../../../../services/marketplace/user';
import { User } from '../../../../typings/marketplace/user';
import { getErrorMessage } from '../../../../utils/marketplace/getErrorMessage';
import { AvatarUploader } from '../../../various/AvatarUploader';
import { Icon } from '../../../various/Icon';
import { DefaultValues } from '../../auth/SignUpProfessional/constants';
import { SignUpProfessionalStep3 } from '../../auth/SignUpProfessional/SignUpProfessionalStep3';
import { SignUpProfessionalStep4 } from '../../auth/SignUpProfessional/SignUpProfessionalStep4';
import { SignUpProfessionalStep5 } from '../../auth/SignUpProfessional/SignUpProfessionalStep5';

interface Props {
  user: User.Professional;
  onCancel: () => void;
  onSuccess: () => void;
}

const FIELDS_PER_TAB = {
  'basic-information': ['name', 'country'],
  'profile-details': ['avatarUrl', 'description', 'portfolioUrl', 'twitterUrl', 'discordUsername', 'instagramUsername'],
  qualifications: ['skills', 'skillLevels'],
  experience: ['experiences'],
  'certifications-and-licenses': ['certificates'],
} as Record<string, string[]>;

export const EditProfessionalProfileForm = ({ user, onCancel, onSuccess }: Props) => {
  const [selectedTab, setSelectedTab] = React.useState('basic-information');

  const { t } = useTranslation(['common']);
  const { pushNotification } = useNotifications();
  const queryClient = useQueryClient();

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
    () =>
      ({
        avatarUrl: user.avatarUrl,
        name: user.name,
        country: user.country,
        certificates: user.certificates,
        description: user.description,
        discordUsername: user.discordUsername,
        experiences: user.experiences,
        skills: user.skills,
        skillLevels: user.skillLevels,
        twitterUrl: user.twitterUrl,
        instagramUsername: user.instagramUsername,
        portfolioUrl: user.portfolioUrl,
      }) as unknown as DefaultValues,
    [user],
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    trigger,
  } = useForm({ mode: 'onTouched', defaultValues });

  const handleTabChange = (key: React.Key) => {
    if (typeof key !== 'string') {
      return;
    }

    const fieldsToValidate = FIELDS_PER_TAB[selectedTab] as (keyof typeof defaultValues)[];

    trigger(fieldsToValidate).then((isValid) => {
      if (isValid) {
        setSelectedTab(key);
      }
    });
  };

  const onSubmit = (data: DefaultValues) => {
    const normalizedData = {
      ...data,
      experiences: data.experiences.map((experience) => omit(['id'], experience)),
      certificates: data.certificates.map((certificate) => omit(['id'], certificate)),
    };

    mutate(normalizedData);
  };

  return (
    <ModalContent as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader>Edit Profile</ModalHeader>
      <ModalBody>
        <Tabs variant="light" className="max-w-full" selectedKey={selectedTab} onSelectionChange={handleTabChange}>
          <Tab key="basic-information" title="Basic Information">
            <h2 className="text-medium font-semibold">Basic Information</h2>
            <p className="text-small text-foreground-400 mb-2">
              Fill out a form that includes i.a. your name, email, and password
            </p>
            <div className="grid grid-cols-2 gap-4">
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
          </Tab>
          <Tab key="profile-details" title="Profile Details">
            <h2 className="text-medium font-semibold">Profile Details</h2>
            <p className="text-small text-foreground-400 mb-2">
              Introduce yourself to the Kreatli community. {/* eslint-disable-next-line max-len */}
              This information helps you stand out and make great connections especially with YouTube creators looking
              to hire professionals
            </p>
            <div className="grid grid-cols-2 gap-4 items-start">
              <div className="col-span-2 flex gap-4">
                <AvatarUploader
                  status={errors.avatarUrl && 'danger'}
                  name="avatarUrl"
                  control={control}
                  rules={VALIDATION_RULES.REQUIRED}
                />
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
                  startContent={<Icon className="text-gray-400" icon="link" />}
                  endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
                  aria-label="Portfolio Link"
                  placeholder="https://myportflio.com"
                  labelPlacement="outside"
                  isInvalid={!!errors.portfolioUrl}
                  errorMessage={errors.portfolioUrl?.message}
                  {...register('portfolioUrl', VALIDATION_RULES.URL.OPTIONAL)}
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
                  startContent={<Icon className="text-gray-400" icon="instagram" />}
                  endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
                  aria-label="Instagram Profile"
                  placeholder="myusername"
                  labelPlacement="outside"
                  isInvalid={!!errors.instagramUsername}
                  errorMessage={errors.instagramUsername?.message}
                  {...register('instagramUsername')}
                />
              </div>
            </div>
          </Tab>
          <Tab key="qualifications" title="Qualifications">
            <h2 className="text-medium font-semibold">Qualifications</h2>
            <p className="text-small text-foreground-400 mb-2">
              Provide information about the skills you possess and their level. Be sure to accurately represent your
              qualifications and skill level to build trust with potential clients. You can select up to 3
              qualifications
            </p>
            <SignUpProfessionalStep3 register={register} control={control} errors={errors} />
          </Tab>
          <Tab key="experience" title="Experience">
            <h2 className="text-medium font-semibold">Experience</h2>
            <p className="text-small text-foreground-400 mb-2">
              {/* eslint-disable-next-line max-len */}
              Provide details about your relevant work experience, including past projects and clients you&apos;ve
              worked with. Be sure to highlight your most impressive work to attract potential clients
            </p>
            <SignUpProfessionalStep4 control={control} errors={errors} />
          </Tab>
          <Tab key="certifications-and-licenses" title="Certifications and Licenses">
            <h2 className="text-medium font-semibold">Certifications and Licenses</h2>
            <p className="text-small text-foreground-400 mb-2">
              Provide information about any relevant certifications or licenses you hold. This information helps YouTube
              creators understand your level of expertise.
            </p>
            <SignUpProfessionalStep5 control={control} errors={errors} />
          </Tab>
        </Tabs>
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
