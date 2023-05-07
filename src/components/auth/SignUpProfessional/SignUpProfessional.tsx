import { Button, Collapse, Container, Grid, Loading, Progress, Spacer, Text, useTheme } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { requestSignUpProfessional } from '../../../services/auth';
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
  const [activeStep, setActiveStep] = React.useState(0);
  const [isFilledByStep, setIsFilledByStep] = React.useState([false, false, false]);

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

  const { mutate, isLoading, isSuccess } = useMutation(requestSignUpProfessional, {
    onSuccess: () => {
      // TODO: show notification
      handleNext();
    },
    // TODO: add error handler
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

  return (
    <Container>
      <Spacer y={2} />
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
