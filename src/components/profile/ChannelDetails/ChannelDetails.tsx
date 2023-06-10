import { Button, Card, Col, Row, Text, Tooltip, User } from '@nextui-org/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { useNotifications } from '../../../hooks/useNotifications';
import { useSession } from '../../../hooks/useSession';
import { requestYoutubeInfoUpdate } from '../../../services/user';
import { Common } from '../../../typings/common';
import { User as IUser } from '../../../typings/user';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';

interface Props {
  id: Common.Id;
  youtubeUrl: string;
  details: IUser.YoutubeInfo;
}

const DAY_IN_MSEC = 24 * 1000 * 60 * 60;

export const ChannelDetails = ({ id, youtubeUrl, details }: Props) => {
  const queryClient = useQueryClient();
  const { currentUserId } = useSession();
  const { pushNotification } = useNotifications();
  const { mutate } = useMutation(requestYoutubeInfoUpdate, {
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'error',
        icon: 'error',
      });
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['user', currentUserId], user);
    },
  });

  const isMyAccount = currentUserId === id;
  const subscribers = new Intl.NumberFormat().format(details.subscriberCount);
  const videos = new Intl.NumberFormat().format(details.videoCount);
  const views = new Intl.NumberFormat().format(details.viewCount);
  const topics = details.topics.join(', ').toLowerCase();
  const lastUpdateAt = new Date(details.lastUpdateAt);
  const canUpdateYoutubeInfo = Date.now() - lastUpdateAt.getTime() > DAY_IN_MSEC;
  const tooltipContent = canUpdateYoutubeInfo
    ? 'Update YouTube info'
    : <>Update limit: Once daily <br />Last update: {lastUpdateAt.toLocaleString()}</>;

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
          {isMyAccount && (
            <Tooltip
              content={tooltipContent}
              color={canUpdateYoutubeInfo ? 'primary' : 'default'}
            >
              <Button
                icon={<Icon icon="update" />}
                auto
                rounded
                flat
                disabled={!canUpdateYoutubeInfo}
                color="primary"
                onClick={() => mutate()}
              />
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
