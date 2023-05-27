import { Button, Card, Col, Row, Text, Tooltip, User } from '@nextui-org/react';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { Common } from '../../../typings/common';
import { User as IUser } from '../../../typings/user';
import { Icon } from '../../various/Icon';

interface Props {
  id: Common.Id;
  youtubeUrl: string;
  details: IUser.YoutubeInfo;
}

export const ChannelDetails = ({ id, youtubeUrl, details }: Props) => {
  const { currentUserId } = useSession();

  const isMyaccount = currentUserId === id;
  const subscribers = new Intl.NumberFormat().format(details.subscriberCount);
  const videos = new Intl.NumberFormat().format(details.videoCount);
  const views = new Intl.NumberFormat().format(details.viewCount);
  const topics = details.topics.join(', ').toLowerCase();

  return (
    <Card variant="shadow" isPressable>
      <Card.Header>
        <Row justify="space-between" align="center">
          <User
            name={details.title}
            src="/youtube.svg"
            size="lg"
          >
            <User.Link href={youtubeUrl} target="_blank">
              {details.customUrl}
            </User.Link>
            <br />
            {videos} videos • {subscribers} subscribers • {views} views
          </User>
          {isMyaccount && (
            <Tooltip content="Update YouTube info" color="primary">
              <Button icon={<Icon icon="update" />} auto rounded flat color="primary" />
            </Tooltip>
          )}
        </Row>
      </Card.Header>
      <Card.Body css={{ p: '$0' }}>
        <Card.Image
          src={`${details.bannerUrl}=w1200-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
          width="100%"
          alt="Yotube banner"
        />
      </Card.Body>
      <Card.Footer>
        <Col>
          <Text size="$sm"><Text span b>Topics: </Text>{topics}</Text>
          <Text size="$sm"><Text span b>Description: </Text>{details.description}</Text>
        </Col>
      </Card.Footer>
    </Card>
  );
};
