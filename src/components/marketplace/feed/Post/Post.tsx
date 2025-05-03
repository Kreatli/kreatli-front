import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Link } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

import { PostContext } from '../../../../contexts/marketplace/Post';
import { useSession } from '../../../../hooks/marketplace/useSession';
import { useBreakpointValue } from '../../../../hooks/useBreakpointValue';
import { formatRelativeTime } from '../../../../utils/dates';
import { Icon } from '../../../various/Icon';
import { Lightbox } from '../../../various/Lightbox';
import { MediaSlider } from '../../../various/MediaSlider';
import { TierImage } from '../../../various/TierImage';
import { ConnectionButton } from '../../profile/Connections/ConnectionButton';
import { ProfileUnverifiedTooltip } from '../../profile/Profile/ProfileUnverifiedTooltip';
import { Comments } from '../Comments';
import { EditPostModal } from './EditPostModal';
import { PostLikeButton } from './PostLikeButton';

const POST_TEXT_LIMIT = 300;
const POST_CONTENT_LIMIT = 350;

export const Post = () => {
  const { post } = React.useContext(PostContext);
  const { _id: postId, author, media, creationDate, content, likeCount, hasLiked, commentCount, isFeedback } = post;
  const { name: authorName, _id: authorId, hasConnection, hasInvitation, tier: authorTier } = author;

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isContentExpanded, setIsContentExpanded] = React.useState(false);
  const [areCommentsExpanded, setAreCommentsExpanded] = React.useState(false);
  const [openedMediaIndex, setOpenedMediaIndex] = React.useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

  const { currentUser, currentUserId } = useSession();
  const isMobile = useBreakpointValue({ SM: false }, true);

  const postContent = React.useMemo(() => {
    const contentEl = document.createElement('div');
    contentEl.innerHTML = content;
    const textLength = contentEl.textContent?.length ?? 0;

    if (textLength <= POST_TEXT_LIMIT) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    if (isContentExpanded) {
      return (
        <>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <Link as="button" color="secondary" onClick={() => setIsContentExpanded(false)}>
            show less
          </Link>
        </>
      );
    }

    return (
      <>
        <div
          className="contents [&>*]:contents"
          dangerouslySetInnerHTML={{ __html: `${content.slice(0, POST_CONTENT_LIMIT)}... ` }}
        />
        <Link as="button" color="secondary" onClick={() => setIsContentExpanded(true)}>
          show more
        </Link>
      </>
    );
  }, [isContentExpanded, content]);

  const toggleComments = () => {
    setAreCommentsExpanded((isExpanded) => !isExpanded);
  };

  const handleMediaClick = (index: number) => {
    setOpenedMediaIndex(index);
    setIsLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
  };

  const userName = (
    <>
      {authorName}
      <TierImage tier={authorTier} className="w-6 h-6" isInline />
    </>
  );

  const isMyPost = authorId === currentUserId;

  return (
    <div className={`relative ${isFeedback ? 'mt-4 lg:mt-0' : ''}`}>
      {isFeedback && (
        <div className="absolute top-0 left-0 py-1 px-4 rounded-t-xl translate-x-4 -translate-y-8 lg:translate-y-0 lg:-translate-x-full lg:-rotate-90 origin-bottom-right  bg-gradient-to-r from-violet-500 to-fuchsia-500">
          <span className="text-xs text-white tracking-widest font-semibold">feedback</span>
        </div>
      )}
      <Card>
        <CardHeader className="p-5 gap-4 justify-between">
          <NextLink href={`/marketplace/profile/${authorId}`} className="flex items-center gap-4">
            <Avatar src={author.avatarUrl} className="w-12 h-12 shrink-0" name={author.name} />
            <div>
              <h3 className="text-md font-semibold">{userName}</h3>
              <p className="text-xs text-default-400">{formatRelativeTime(creationDate)}</p>
            </div>
          </NextLink>
          <div className="flex gap-3">
            <PostLikeButton postId={postId} hasLiked={hasLiked} likeCount={likeCount} />
            {isMyPost ? (
              <>
                <Button
                  variant="flat"
                  color="secondary"
                  isIconOnly={isMobile}
                  startContent={<Icon icon="edit" size={20} />}
                  onClick={() => setIsEditModalOpen(true)}
                >
                  {!isMobile && 'Edit post'}
                </Button>
                <EditPostModal isOpen={isEditModalOpen} post={post} onClose={() => setIsEditModalOpen(false)} />
              </>
            ) : (
              <ConnectionButton
                hasConnection={hasConnection ?? false}
                hasInvitation={hasInvitation ?? false}
                inviteeName={authorName}
                userId={authorId}
                mode="redirect"
              />
            )}
          </div>
        </CardHeader>
        <CardBody className="px-5 py-0 gap-4">
          <div className="whitespace-pre-wrap">{postContent}</div>
          {media.length > 0 && <MediaSlider media={media} onClick={handleMediaClick} />}
        </CardBody>
        <CardFooter className="px-5 flex-col items-start">
          <ProfileUnverifiedTooltip>
            <Button
              variant="light"
              isDisabled={!currentUser?.isVerified}
              color={areCommentsExpanded ? 'secondary' : 'default'}
              size="sm"
              onClick={toggleComments}
            >
              <Icon icon="chat" size={20} />
              {commentCount}
            </Button>
          </ProfileUnverifiedTooltip>
          {areCommentsExpanded && <Comments />}
        </CardFooter>
      </Card>
      {media.length > 0 && (
        <Lightbox defaultIndex={openedMediaIndex} isOpen={isLightboxOpen} media={media} onClose={handleLightboxClose} />
      )}
    </div>
  );
};
