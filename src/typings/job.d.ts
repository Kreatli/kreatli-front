import { Availability } from './availability';
import { Common } from './common';
import { Payment } from './payment';
import { Skill } from './skill';
import { User } from './user';

export namespace Job {
  export interface Offer {
    _id: Common.Id;
    title: string;
    shortDescription: string;
    description: string;
    skills: Skill[];
    paymentType: Payment.Type;
    paymentPreferences: Payment.Preference[];
    paymentValue: number;
    availability: Availability.Type;
    availabilityDuration?: Availability.ProjectBase;
    location: 'remote' | string;
    additionalInformation: string;
    creationDate: Date;
    creator: User.Creator;
    hiredApplication: Application;
    applications: Application[];
    applicationsCount: number;
    hasApplied?: boolean;
  }

  export interface Application {
    _id: Common.Id;
    professional: User.Professional;
    coverLetter: string;
  }

  export type OfferPayload = Omit<Offer, '_id' | 'applications' | 'hiredApplication' | 'creator' | 'applicationsCount' | 'creationDate'>;
}
