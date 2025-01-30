import { Button, Card, CardBody, CardFooter, CardHeader, Image, Link, Tooltip, User } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import NextLink from 'next/link';
import React from 'react';

import { useNotifications } from '../../../../hooks/useNotifications';
import { useSession } from '../../../../hooks/marketplace/useSession';
import { requestYoutubeInfoUpdate } from '../../../../services/marketplace/user';
import { Common } from '../../../../typings/common';
import { User as IUser } from '../../../../typings/marketplace/user';
import { getErrorMessage } from '../../../../utils/marketplace/getErrorMessage';
import { Icon } from '../../../various/Icon';

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
  const { mutate } = useMutation({
    mutationFn: requestYoutubeInfoUpdate,
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['user', currentUserId], user);
    },
  });

  const isMyAccount = currentUserId === id;
  const numberFormatter = new Intl.NumberFormat();
  const subscribers = numberFormatter.format(details.subscriberCount);
  const videos = numberFormatter.format(details.videoCount);
  const views = numberFormatter.format(details.viewCount);
  const topics = details.topics.join(', ').toLowerCase();
  const lastUpdateAt = new Date(details.lastUpdateAt);
  const canUpdateYoutubeInfo = Date.now() - lastUpdateAt.getTime() > DAY_IN_MSEC;
  const tooltipContent = canUpdateYoutubeInfo ? (
    'Update YouTube info'
  ) : (
    <>
      Update limit: Once a day <br />
      Last update: {lastUpdateAt.toLocaleString()}
    </>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <User
            name={details.title}
            className="gap-3 bg-transparent"
            classNames={{ name: 'font-medium' }}
            description={
              <>
                <Link as={NextLink} href={youtubeUrl} target="_blank" className="text-xs">
                  {details.customUrl}
                </Link>
                <div className="flex items-center space-x-2 text-xs leading-3">
                  {videos} videos • {subscribers} subscribers • {views} views
                </div>
              </>
            }
            avatarProps={{ src: '/youtube.svg', className: 'bg-transparent' }}
          >
            <br />
          </User>
          {isMyAccount && (
            <Tooltip content={tooltipContent} color={canUpdateYoutubeInfo ? 'secondary' : 'default'}>
              <Button
                isIconOnly
                size="sm"
                radius="full"
                variant="flat"
                aria-label="Update YouTube information"
                disabled={!canUpdateYoutubeInfo}
                color={canUpdateYoutubeInfo ? 'secondary' : 'default'}
                onClick={() => mutate()}
              >
                <Icon icon="update" size={20} />
              </Button>
            </Tooltip>
          )}
        </div>
      </CardHeader>
      {details.bannerUrl && (
        <CardBody className="p-0">
          <Image
            src={`${details.bannerUrl}=w1200-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
            radius="none"
            width="100%"
            alt="Yotube banner"
          />
        </CardBody>
      )}
      {(topics || details.description) && (
        <CardFooter className="flex-col items-start">
          {topics && (
            <p className="text-small">
              <span className="font-bold">Topics: </span>
              {topics}
            </p>
          )}
          {details.description && (
            <p className="text-small whitespace-pre-line">
              <span className="font-bold">Description: </span>
              {details.description.trim()}
            </p>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
