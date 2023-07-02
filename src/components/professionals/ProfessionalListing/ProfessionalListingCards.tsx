import { Button, Card, Text } from '@nextui-org/react';
import Link from 'next/link';
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
          <Card.Image src={user.avatarUrl} />
          <Card.Body className={styles.cardBody}>
            <Text h5 className={styles.cardTitle}>{user.name}</Text>
            <Text size="$xs" color="$accents6">{`${COUNTRY_LABELS[user.country]} • Tier ${user.tier}`}</Text>
            <Text size="$sm" className={styles.cardDescription}>{getUserSkills(user)}</Text>
            <Button size="sm" as={Link} href={`/profile/${user._id}`}>View profile</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
