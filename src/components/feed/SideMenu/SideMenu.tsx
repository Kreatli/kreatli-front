import { Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import { usePostsFilters } from 'hooks/usePostsFilters';
import React from 'react';

const FILTER_LABELS = {
  allPosts: 'All posts',
  feedbackPosts: 'Feedback posts',
};

export const SideMenu = () => {
  const { filter, setFilter } = usePostsFilters();

  const handleChange = (keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') {
      return;
    }

    setFilter(Array.from(keys)[0] as 'allPosts' | 'feedbackPosts');
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0 });
    });
  };

  return (
    <Card className="sticky bg-background/70 backdrop-blur-lg z-20 top-20 md:top-24" isBlurred>
      <CardBody className="py-4">
        <div className="flex justify-between">
          <p className="text-default-400">Filter:</p>
          <Dropdown>
            <DropdownTrigger>
              <Link as="button" color="secondary" className="font-semibold">
                {FILTER_LABELS[filter]}
                <Icon icon="chevronDown" />
              </Link>
            </DropdownTrigger>
            <DropdownMenu selectionMode="single" selectedKeys={[filter]} color="secondary" variant="flat" onSelectionChange={handleChange}>
              <DropdownItem key="allPosts">{FILTER_LABELS.allPosts}</DropdownItem>
              <DropdownItem key="feedbackPosts">{FILTER_LABELS.feedbackPosts}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardBody>
    </Card>
  );
};
