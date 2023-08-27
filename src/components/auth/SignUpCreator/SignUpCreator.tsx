import { Accordion, AccordionItem, Button, Progress, Selection } from '@nextui-org/react';
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
  ['description', 'youtubeUrl', 'youtubeUrlOther', 'discordUsername', 'twitterUrl'],
  ['interestSkills'],
] as const;

export const SignUpCreator: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(['0']);
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

  const progressValue = React.useMemo(() => {
    const filledStepsLength = isFilledByStep.reduce((acc, isFilled) => acc + Number(isFilled), 0);

    return ((filledStepsLength + 1) / 4) * 100;
  }, [isFilledByStep]);

  const { mutate, isLoading, isSuccess } = useMutation(requestSignUpCreator, {
    onSuccess: () => {
      pushNotification({
        message: 'Cool! Now all you have to do is check your inbox to complete the registration',
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
      render: <SignUpCreatorStep1 register={register} errors={errors} />,
    },
    {
      title: 'Step 2 - Channel Details',
      subtitle: 'Provide your YouTube channel link and describe it for professionals to know your content and background',
      render: <SignUpCreatorStep2 register={register} errors={errors} />,
    },
    {
      title: 'Step 3 - Professionals Needed',
      subtitle: 'Choose the professionals who best fit your requirements. You can choose more than one',
      render: <SignUpCreatorStep3 control={control} errors={errors} />,
    },
  ];

  const description = 'Kreatli will help you find professionals to create high-quality content that resonates with your audience. The registration process only takes 3 minutes, so join today and take your YouTube channel to the next level!';
  const disabledKeys = steps
    .map((_, index) => index)
    .filter((index) => isSuccess || isLoading || (index > 0 && !isFilledByStep[index - 1]))
    .map((index) => index.toString());

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
