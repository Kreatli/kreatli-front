import { Tab, Tabs } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import { useGetAssetFileIdComments } from '../../../../services/review-tool/hooks';
import { getAssetFileIdComments } from '../../../../services/review-tool/services';
import { AssetCommentsResponse } from '../../../../services/review-tool/types';
import { AssetComment } from './AssetComment';
import { AssetCommentsEmptyState } from './AssetCommentsEmptyState';
import { AssetCommentsLoading } from './AssetCommentsLoading';

type CommentsStatus = 'all' | 'unresolved' | 'resolved';

interface Props {
  fileId: string;
}

export const AssetComments = ({ fileId }: Props) => {
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useGetAssetFileIdComments(fileId);
  const [commentsStatus, setCommentsStatus] = useState<CommentsStatus>('unresolved');

  const { comments = [] } = data ?? {};

  const commentsToShow = React.useMemo(() => {
    if (commentsStatus === 'all') {
      return comments;
    }

    if (commentsStatus === 'resolved') {
      return comments.filter(({ isResolved }) => isResolved);
    }

    return comments.filter(({ isResolved }) => !isResolved);
  }, [commentsStatus, comments]);

  if (isPending) {
    return <AssetCommentsLoading />;
  }

  if (isError) {
    return 'Something went wrong';
  }

  const unresolvedCommentsCount = comments.reduce((acc, comment) => acc + (comment.isResolved ? 0 : 1), 0);

  const handleRemove = (commentId: string) => () => {
    queryClient.setQueriesData<AssetCommentsResponse>(
      { queryKey: [getAssetFileIdComments.key, fileId] },
      (cacheData) => ({
        comments: (cacheData?.comments ?? []).filter((comment) => comment.id !== commentId),
      }),
    );

    queryClient.invalidateQueries({ queryKey: [getAssetFileIdComments.key, fileId] });
  };

  const handleUpdate = () => {
    queryClient.invalidateQueries({ queryKey: [getAssetFileIdComments.key, fileId] });
  };

  const handleTabsChange = (newStatus: React.Key) => {
    setCommentsStatus(newStatus as CommentsStatus);
  };

  return (
    <div className="p-3 pt-0 pb-9 flex flex-col gap-2">
      <div className="text-medium">
        <span className="font-semibold">
          {comments.length} comment{comments.length === 1 ? '' : 's'}
        </span>
      </div>
      <Tabs size="sm" selectedKey={commentsStatus} onSelectionChange={handleTabsChange}>
        <Tab key="unresolved" title={`Unresolved (${unresolvedCommentsCount})`} />
        <Tab key="resolved" title={`Resolved (${comments.length - unresolvedCommentsCount})`} />
        <Tab key="all" title={`All (${comments.length})`} />
      </Tabs>
      <div className="flex flex-col gap-2">
        {commentsToShow.length === 0 && <AssetCommentsEmptyState />}
        {commentsToShow.map((comment) => (
          <div key={comment.id}>
            <AssetComment
              fileId={fileId}
              comment={comment}
              onUpdate={handleUpdate}
              onRemove={handleRemove(comment.id)}
            />
            {comment.replies.length > 0 && (
              <div className="pl-6 pt-2 flex flex-col gap-2">
                {comment.replies.map((reply) => (
                  <AssetComment
                    key={reply.id}
                    fileId={fileId}
                    comment={reply}
                    isResolvable={false}
                    isResolved={comment.isResolved}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove(reply.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
