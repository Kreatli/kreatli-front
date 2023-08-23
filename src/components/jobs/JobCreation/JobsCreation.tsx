import { Button, Accordion, AccordionItem, Progress, Selection } from '@nextui-org/react';
import { omit } from 'ramda';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { useNotifications } from '../../../hooks/useNotifications';
import { requestJobOfferCreation } from '../../../services/job';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';
import { DEFAULT_VALUES, DefaultValues } from './constants';
import { JobsCreationStep1 } from './JobsCreationStep1';
import { JobsCreationStep2 } from './JobsCreationStep2';
import { JobsCreationStep3 } from './JobsCreationStep3';
import { JobsCreationStep4 } from './JobsCreationStep4';
import { JobsCreationStep5 } from './JobsCreationStep5';
import { useRouter } from 'next/router';
import { useSession } from '../../../hooks/useSession';

const FIELDS_BY_STEP = [
  ['title', 'shortDescription', 'description'],
  ['skills'],
  ['paymentType', 'paymentPreferences', 'paymentValue'],
  ['availability', 'availabilityDuration', 'location'],
  ['additionalInformation'],
] as const;

export const JobsCreation = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(['0']);
  const [isFilledByStep, setIsFilledByStep] = React.useState([false, false, false]);

  const { currentUserId } = useSession();
  const router = useRouter();
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
      setSelectedKeys(Array.from(keys) as string[]);
    }
  };

  const handleNext = () => {
    const index = Number(selectedKeys.values().next().value);

    trigger(FIELDS_BY_STEP[index]).then((isValid) => {
      if (isValid) {
        setSelectedKeys([(index + 1).toString()]);
        setIsFilledByStep(Object.assign([], isFilledByStep, { [index]: true }));
      }
    });
  };

  const handleBack = () => {
    const index = Number(selectedKeys.values().next().value);

    setSelectedKeys([(index - 1).toString()]);
  };

  const { mutate, isLoading, isSuccess } = useMutation(requestJobOfferCreation, {
    onSuccess: () => {
      pushNotification({
        message: 'Job offer was created!',
        color: 'success',
        icon: 'success',
      });
      router.push(`/profile/${currentUserId}/jobs`);
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
    mutate(data.availabilityDuration
      ? data
      : omit(['availabilityDuration'], data));
  };

  const progressValue = React.useMemo(() => {
    const filledStepsLength = isFilledByStep.reduce((acc, isFilled) => acc + Number(isFilled), 0);

    return ((filledStepsLength + 1) / 4) * 100;
  }, [isFilledByStep]);

  const steps = [
    {
      title: 'Step 1 - Job title and description',
      subtitle: 'Clearly describe the job you\'re hiring for and the responsibilities that come with it. Be specific about the skills and experience you\'re looking for',
      render: <JobsCreationStep1 register={register} errors={errors} />,
    },
    {
      title: 'Step 2 - Required qualifications',
      subtitle: 'Choose the qualifications required for the job. Feel free to choose multiple options',
      render: <JobsCreationStep2 control={control} errors={errors} />,
    },
    {
      title: 'Step 3 - Payment and Budget',
      subtitle: 'Be transparent about the budget for the job, whether it\'s a flat rate or an hourly rate. Specify how payment will be made and when it will be paid',
      render: <JobsCreationStep3 register={register} control={control} errors={errors} />,
    },
    {
      title: 'Step 4 - Availability and Location',
      subtitle: 'Please provide the availability you require from professionals and specify the location',
      render: <JobsCreationStep4 control={control} errors={errors} />,
    },
    {
      title: 'Step 5 - Additional information (optional)',
      subtitle: 'Any comments or additional information you want to include in your job offer',
      render: <JobsCreationStep5 register={register} errors={errors} />,
    },
  ];

  const description = 'Create a job offer to attract and hire the most relevant professionals. Make it unique so that it stands out!';
  const disabledKeys = steps
    .map((_, index) => index)
    .filter((index) => isSuccess || isLoading || (index > 0 && !isFilledByStep[index - 1]))
    .map((index) => index.toString());

  return (
    <>
      <h2 className="text-3xl text-secondary font-bold mb-4">Create job offer</h2>
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
              aria-label={title}
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
                  <Button type="submit" color="secondary" isLoading={isLoading}>Create job offer</Button>
                )}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </form>
    </>
  );
};
