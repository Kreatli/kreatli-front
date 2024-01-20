import { Button, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';

const initialValues = {
  email: '',
  name: '',
  message: '',
};

// type InitialValues = typeof initialValues;

export const ContactForm = () => {
  const { register } = useForm({
    defaultValues: initialValues,
  });

  return (
    <form className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email"
          placeholder="john.doe@domain.com"
          {...register('email', VALIDATION_RULES.EMAIL)}
        />
        <Input
          label="Name"
          placeholder="John Doe"
          {...register('name', VALIDATION_RULES.SHORT_TEXT)}

        />
      </div>
      <Textarea
        label="Message"
        placeholder="Hi there! I would like to know more about your platform..."
        minRows={8}
        {...register('message', VALIDATION_RULES.REQUIRED)}
      />
      <div className="mt-4">
        <Button color="secondary" variant="flat" className="px-12">
          Submit
        </Button>
      </div>
    </form>
  );
};
