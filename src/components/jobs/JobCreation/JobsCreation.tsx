import { Button, Collapse, Grid, Loading, Progress, Spacer, Text, useTheme } from '@nextui-org/react';
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

const FIELDS_BY_STEP = [
  ['title', 'shortDescription', 'description'],
  ['skills'],
  ['paymentType', 'paymentPreferences', 'paymentValue'],
  ['duration', 'location'],
  ['additionalInformation'],
] as const;

export const JobsCreation = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isFilledByStep, setIsFilledByStep] = React.useState([false, false, false]);

  const pushNotification = useNotifications((state) => state.pushNotification);

  const { theme } = useTheme();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    trigger,
  } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onBlur' });

  const isValidByStep = FIELDS_BY_STEP.map((fields) => !fields.some((field) => errors[field]));

  const handleNext = () => {
    trigger(FIELDS_BY_STEP[activeStep]).then((isValid) => {
      if (isValid) {
        setActiveStep(activeStep + 1);
        setIsFilledByStep(Object.assign([], isFilledByStep, { [activeStep]: true }));
      }
    });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = (step?: number, isExpanded?: boolean) => {
    if (isExpanded && step) {
      setActiveStep(step - 1);
    }
  };

  const { mutate, isLoading, isSuccess } = useMutation(requestJobOfferCreation, {
    onSuccess: () => {
      pushNotification({
        message: 'Job offer created! Get ready for applications from professionals',
        color: 'success',
        icon: 'success',
      });
      handleNext();
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'error',
        icon: 'error',
      });
    },
  });

  const onSubmit = (data: DefaultValues) => {
    mutate(data);
  };

  const progressValue = React.useMemo(() => {
    const filledStepsLength = isFilledByStep.reduce((acc, isFilled) => acc + Number(isFilled), 0);

    return ((filledStepsLength + 1) / 4) * 100;
  }, [isFilledByStep]);

  const steps = [
    {
      title: 'Step 1 - Job title and description',
      subtitle: 'The title and short description are displayed in Jobs listing on the offer card. Keep them descriptive but concise. The description provides more details and is shown on the offer page',
      render: <JobsCreationStep1 register={register} errors={errors} />,
    },
    {
      title: 'Step 2 - Required qualifications',
      subtitle: 'Select qualifications that align with your requirements. Feel free to choose multiple options',
      render: <JobsCreationStep2 control={control} errors={errors} />,
    },
    {
      title: 'Step 3 - Payment and Budget',
      subtitle: 'Be transparent about the budget for the job, whether it\'s a flat rate or an hourly rate. Specify how payment will be made',
      render: <JobsCreationStep3 register={register} control={control} errors={errors} />,
    },
    {
      title: 'Step 4 - Duration and Location',
      subtitle: 'Please provide the deadline for the job and specify the location',
      render: <JobsCreationStep4 control={control} errors={errors} />,
    },
    {
      title: 'Step 5 - Additional information (optional)',
      subtitle: 'Any comments or additional information you want to leave',
      render: <JobsCreationStep5 register={register} errors={errors} />,
    },
  ];

  const description = 'Gosha description needed';

  return (
    <>
      <Text as="h2" weight="bold" color="secondary">Create a job offer</Text>
      <Text>{description}</Text>
      <Spacer y={1} />
      <Progress value={progressValue} size="sm" color="gradient" />
      <Spacer y={1} />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Collapse.Group splitted onChange={handleChange} css={{ padding: 0 }}>
          {steps.map(({ title, subtitle, render }, index) => (
            <Collapse
              key={title}
              title={title}
              subtitle={subtitle}
              shadow
              contentLeft={!isValidByStep[index] && <Icon icon="error" fill={theme?.colors.error.value} />}
              expanded={activeStep === index && !isSuccess}
              disabled={isSuccess || isLoading || (index > 0 && !isFilledByStep[index - 1])}
            >
              {render}
              <Spacer />
              <Grid.Container gap={1}>
                {index > 0 && (
                  <Grid>
                    <Button auto light color="primary" onClick={handleBack}>Back</Button>
                  </Grid>
                )}
                {index !== steps.length - 1 && (
                  <Grid>
                    <Button auto flat onClick={handleNext}>Next</Button>
                  </Grid>
                )}
                {index === steps.length - 1 && (
                  <Grid>
                    <Button type="submit" auto color="gradient" disabled={isLoading}>
                      {isLoading && <Loading size="xs" css={{ paddingRight: '$4' }} />}
                      Create a job offer
                    </Button>
                  </Grid>
                )}
              </Grid.Container>
            </Collapse>
          ))}
        </Collapse.Group>
      </form>
    </>
  );
};
