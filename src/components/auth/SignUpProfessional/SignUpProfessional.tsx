import { Button, Accordion, AccordionItem, Progress, Selection } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { useNotifications } from '../../../hooks/useNotifications';
import { requestSignUpProfessional } from '../../../services/auth';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';
import { DEFAULT_VALUES, DefaultValues } from './constants';
import { SignUpProfessionalStep1 } from './SignUpProfessionalStep1';
import { SignUpProfessionalStep2 } from './SignUpProfessionalStep2';
import { SignUpProfessionalStep3 } from './SignUpProfessionalStep3';
import { SignUpProfessionalStep4 } from './SignUpProfessionalStep4';
import { SignUpProfessionalStep5 } from './SignUpProfessionalStep5';

const FIELDS_BY_STEP = [
  ['email', 'password', 'name', 'country'],
  ['avatarUrl', 'description', 'portfolioUrl', 'twitterUrl', 'discordUsername', 'instagramUsername'],
  ['skills', 'skillLevels'],
  ['experiences'],
  ['certificates'],
] as const;

export const SignUpProfessional: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Set<React.Key>>(new Set(['0']));
  const [isFilledByStep, setIsFilledByStep] = React.useState([false, false, false]);

  const pushNotification = useNotifications((state) => state.pushNotification);
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    trigger,
  } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onBlur' });

  const isValidByStep = FIELDS_BY_STEP.map((fields) => !fields.some((field) => errors[field]));

  const handleSelectionChange = (keys: Selection) => {
    if (keys !== 'all') {
      setSelectedKeys(keys);
    }
  };

  const handleNext = () => {
    const index = Number(selectedKeys.values().next().value);

    trigger(FIELDS_BY_STEP[index]).then((isValid) => {
      if (isValid) {
        setSelectedKeys(new Set([(index + 1).toString()]));
        setIsFilledByStep(Object.assign([], isFilledByStep, { [index]: true }));
      }
    });
  };

  const handleBack = () => {
    const index = Number(selectedKeys.values().next().value);

    setSelectedKeys(new Set([(index - 1).toString()]));
  };

  const progressValue = React.useMemo(() => {
    const filledStepsLength = isFilledByStep.reduce((acc, isFilled) => acc + Number(isFilled), 0);

    return ((filledStepsLength + 1) / 4) * 100;
  }, [isFilledByStep]);

  const { mutate, isLoading, isSuccess } = useMutation(requestSignUpProfessional, {
    onSuccess: () => {
      pushNotification({
        message: 'Great! Check your inbox to complete the registration',
        color: 'success',
        icon: 'success',
      });
      handleNext();
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const onSubmit = (data: DefaultValues) => {
    mutate(data);
  };

  const steps = [
    {
      title: 'Step 1 - Basic Information',
      subtitle: 'Fill out a form that includes i.a. your name, email, and password to create an account on the platform',
      render: <SignUpProfessionalStep1 control={control} register={register} errors={errors} />,
    },
    {
      title: 'Step 2 - Creating a Profile',
      subtitle: 'Introduce yourself to the Kreatli community. This information helps you stand out and make great connections especially with YouTube creators looking to hire professionals',
      render: <SignUpProfessionalStep2 control={control} register={register} errors={errors} />,
    },
    {
      title: 'Step 3 - Qualifications',
      subtitle: 'Provide information about the skills you possess and their level. Be sure to accurately represent your qualifications and skill level to build trust with potential clients',
      render: <SignUpProfessionalStep3 control={control} errors={errors} />,
    },
    {
      title: 'Step 4 - Experience',
      subtitle: 'Provide details about your relevant work experience, including past projects and clients you\'ve worked with. Be sure to highlight your most impressive work to attract potential clients',
      render: <SignUpProfessionalStep4 control={control} register={register} errors={errors} />,
    },
    {
      title: 'Step 5 - Certifications and Licenses (optional)',
      subtitle: 'Provide information about any relevant certifications or licenses you hold. This information helps YouTube creators understand your level of expertise. Keep in mind that we manually verify information you provide!',
      render: <SignUpProfessionalStep5 control={control} register={register} errors={errors} />,
    },
  ];

  const description = 'Kreatli will help you find the best YouTube creators to collaborate and network with. The registration process only takes 7 minutes, so join today and become a part of our community';
  const disabledKeys = new Set(
    steps
      .map((_, index) => index)
      .filter((index) => isSuccess || isLoading || (index > 0 && !isFilledByStep[index - 1]))
      .map((index) => index.toString())
  );

  return (
    <div className="container max-w-screen-lg mx-auto px-6">
      <h2 className="text-3xl text-secondary font-bold mb-4">Sign up</h2>
      <p className="mb-6">{description}</p>
      <Progress className="mb-10" value={progressValue} color="secondary" />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Accordion
          className="gap-4 p-0"
          itemClasses={{ title: 'font-semibold', subtitle: 'text-gray-400' }}
          variant="splitted"
          selectedKeys={selectedKeys}
          disabledKeys={disabledKeys}
          keepContentMounted
          onSelectionChange={handleSelectionChange}
        >
          {steps.map(({ title, subtitle, render }, index) => (
            <AccordionItem
              key={`${index}`}
              title={title}
              subtitle={subtitle}
              startContent={!isValidByStep[index] && <Icon className="fill-danger" icon="error" />}
            >
              {render}
              <div className="flex gap-2 mt-6">
                {index > 0 && (
                  <Button variant="light" color="secondary" onClick={handleBack}>Back</Button>
                )}
                {index !== steps.length - 1 && (
                  <Button variant="flat" color="secondary" onClick={handleNext}>Next</Button>
                )}
                {index === steps.length - 1 && (
                  <Button type="submit" color="secondary" isLoading={isLoading}>Create profile</Button>
                )}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </form>
    </div>
  );
};
