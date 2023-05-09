import { Button, Collapse, Container, Grid, Loading, Progress, Spacer, Text, useTheme } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { useNotifications } from '../../../hooks/useNotifications';
import { requestSignUpCreator } from '../../../services/auth';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';
import { DEFAULT_VALUES, DefaultValues } from './constants';
import { SignUpCreatorStep1 } from './SignUpCreatorStep1';
import { SignUpCreatorStep2 } from './SignUpCreatorStep2';
import { SignUpCreatorStep3 } from './SignUpCreatorStep3';

const FIELDS_BY_STEP = [
  ['email', 'password', 'name', 'country'],
  ['category', 'description', 'socialMediaUrl', 'socialMediaUrlOther', 'discordUsername', 'twitterUrl'],
  ['interestSkills'],
] as const;

export const SignUpCreator: React.FC = () => {
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

  const progressValue = React.useMemo(() => {
    const filledStepsLength = isFilledByStep.reduce((acc, isFilled) => acc + Number(isFilled), 0);

    return ((filledStepsLength + 1) / 4) * 100;
  }, [isFilledByStep]);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = (step?: number, isExpanded?: boolean) => {
    if (isExpanded && step) {
      setActiveStep(step - 1);
    }
  };

  const { mutate, isLoading, isSuccess } = useMutation(requestSignUpCreator, {
    onSuccess: () => {
      pushNotification({
        message: 'Cool! Now all you have to do is check your email to complete the registration',
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

  const steps = [
    {
      title: 'Step 1 - Basic Information',
      subtitle: 'Fill out a form that includes i.a. your name, email, and password to create an account on the platform',
      render: <SignUpCreatorStep1 control={control} register={register} errors={errors} />,
    },
    {
      title: 'Step 2 - Channel Details',
      subtitle: 'Provide your YouTube channel link and describe it for professionals to know your content and background',
      render: <SignUpCreatorStep2 control={control} register={register} errors={errors} />,
    },
    {
      title: 'Step 3 - Professionals Needed',
      subtitle: 'Choose the professionals who best fit your requirements. You can choose more than one',
      render: <SignUpCreatorStep3 control={control} errors={errors} />,
    },
  ];

  const description = 'Kreatli will help you find professionals to create high-quality content that resonates with your audience. The registration process only takes 3 minutes, so join today and take your YouTube channel to the next level!';

  return (
    <Container>
      <Grid.Container justify="center">
        <Grid xs={12} md={8} direction="column">
          <Text as="h2" weight="bold" color="secondary">Sign up</Text>
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
                          Create profile
                        </Button>
                      </Grid>
                    )}
                  </Grid.Container>
                </Collapse>
              ))}
            </Collapse.Group>
          </form>
        </Grid>
      </Grid.Container>
    </Container>
  );
};
