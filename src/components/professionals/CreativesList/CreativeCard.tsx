import { Card, Text, User } from '@nextui-org/react';
import React from 'react';

export const CreativeCard: React.FC = () => {
  return (
    <Card>
      <Card.Header>
        <User name="Gosha Tolochko" description="description" />
      </Card.Header>
      <Card.Body css={{ p: '$0 $10' }}>
        <Text>
          Body
        </Text>
      </Card.Body>
      <Card.Footer isBlurred css={{ p: '$10' }}>
        Footer
      </Card.Footer>
    </Card>
  );
};
