/* eslint-disable max-len */
import { Availability } from '../../../../typings/marketplace/availability';
import { Payment } from '../../../../typings/marketplace/payment';

export const DEFAULT_VALUES = {
  title: '',
  shortDescription: '',
  description: '',
  skills: [],
  paymentType: '' as Payment.Type,
  paymentPreferences: [],
  paymentValue: 0,
  paymentValueTo: 0,
  availability: '' as Availability.Type,
  availabilityDuration: '' as Availability.ProjectBase,
  location: 'remote',
  additionalInformation: '',
};

export type DefaultValues = typeof DEFAULT_VALUES;

export const SHORT_DESCRIPTION_PLACEHOLDER =
  "Briefly describe the job you're hiring for. This information is going to be shown on your Job Posting Preview.";

export const DESCRIPTION_PLACEHOLDER = `Clearly describe the job you're hiring for and the responsibilities/requirements that come with it.

Example: Type of content you create (e.g. vlogs, tutorials, reviews, etc.)
Goals for the project (e.g. increase views, gain more subscribers, improve engagement, etc.)
Specific requirements you have (e.g. use of certain colors or branding, inclusion of certain keywords, etc.)`;

export const ADDITIONAL_INFORMATION_PLACEHOLDER = `For example:
Deadline. State the deadline for the job, whether it's a specific date or a duration of time.
Deliverables. Clearly specify the deliverables and what you expect from the professional you hire.
Requirements for submission. Let professionals know what information/materials they need to submit as part of their application.`;
