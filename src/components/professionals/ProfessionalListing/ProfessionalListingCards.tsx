import { Button, Card, CardBody, Image } from '@nextui-org/react';
import { TierImage } from 'components/various/TierImage';
import NextLink from 'next/link';
import React from 'react';

import { COUNTRY_LABELS } from '../../../constants/countries';
import { User } from '../../../typings/user';
import { getUserSkills } from '../../../utils/user';
import styles from './ProfessionalListing.module.scss';

interface Props {
  cards: User.Professional[];
}

export const ProfessionalListingCards = ({ cards }: Props) => {
  return (
    <>
      {cards.map((user) => (
        <Card key={user._id} className={styles.card} isHoverable>
          <Image src={user.avatarUrl} removeWrapper radius="none" />
          <CardBody className={styles.cardBody}>
            <h5 className="text-md font-semibold mb-1">
              {user.name}
              <TierImage tier={user.tier} isInline className="w-6 h-6" />
            </h5>
            <p className="text-xs text-gray-400 mb-1">{COUNTRY_LABELS[user.country]}</p>
            <p className="text-sm flex-1 mb-4 tracking-tight">{getUserSkills(user)}</p>
            <Button size="sm" as={NextLink} color="secondary" variant="flat" href={`/profile/${user._id}`}>View profile</Button>
          </CardBody>
        </Card>
      ))}
    </>
  );
};
