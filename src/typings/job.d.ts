import { Availability } from './availability';
import { Common } from './common';
import { Payment } from './payment';
import { Skill } from './skill';
import { User } from './user';

export namespace Job {
  export interface Offer {
    _id: Common.Id;
    additionalInformation: string;
    applications: Application[];
    applicationsCount: number;
    availability: Availability.Type;
    availabilityDuration?: Availability.ProjectBase;
    creationDate: Date;
    creator: User.Creator;
    description: string;
    hasApplied?: boolean;
    location: 'remote' | string;
    paymentPreferences: Payment.Preference[];
    paymentType: Payment.Type;
    paymentValue: number;
    reviews: {
      creator: Review | null;
      professional: Review | null;
    };
    shortDescription: string;
    skills: Skill[];
    status: 'posted' | 'ongoing' | 'completed' | 'canceled';
    title: string;
  }

  export interface Application {
    _id: Common.Id;
    creationDate: Date;
    coverLetter: string;
    professional: User.Professional;
    status: 'pending' | 'hired' | 'rejected' | 'canceled';
  }

  export interface Review {
    _id: string;
    comment: string;
    rating: number;
    reason: '' | 'satisfied' | 'not-satisfied';
    creationDate: Date;
  }

  export type OfferReviewPayload = Omit<Review, '_id' | 'creationDate'>;
  export type OfferPayload = Omit<Offer, '_id' | 'applications' | 'creator' | 'applicationsCount' | 'creationDate' | 'status' | 'hiredProfessional' | 'reviews'>;
}
