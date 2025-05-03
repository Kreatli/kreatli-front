import React from 'react';

import { EmptyState } from '../../../various/EmptyState';

export const AssetCommentsEmptyState = () => {
  return (
    <EmptyState title="No comments yet" icon="conversation" text="Be the first to comment on this asset" size="sm" />
  );
};
