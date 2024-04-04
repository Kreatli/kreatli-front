import { Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

import { Feed } from '../../../typings/feed';
import { Icon } from '../../various/Icon';

const FILTER_LABELS = {
  allPosts: 'All posts',
  feedbackPosts: 'Feedback posts',
  myPosts: 'My posts',
};

export const SideMenu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter = (searchParams.get('filter') ?? 'allPosts') as Feed.Filter;

  const handleChange = (keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') {
      return;
    }

    const key = Array.from(keys)[0] as Feed.Filter;
    router.replace({ search: `?filter=${key}` });
  };

  return (
    <Card className="sticky z-20 top-20 md:top-24">
      <CardBody className="px-5 py-4">
        <div className="flex justify-between">
          <p className="text-default-400">Filter:</p>
          <Dropdown>
            <DropdownTrigger>
              {/* Disabled since it renders as button */}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link as="button" color="secondary" className="font-semibold">
                {FILTER_LABELS[filter]}
                <Icon icon="chevronDown" />
              </Link>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="single"
              selectedKeys={[filter]}
              disallowEmptySelection
              color="secondary"
              variant="flat"
              onSelectionChange={handleChange}
            >
              <DropdownItem key="allPosts">{FILTER_LABELS.allPosts}</DropdownItem>
              <DropdownItem key="feedbackPosts">{FILTER_LABELS.feedbackPosts}</DropdownItem>
              <DropdownItem key="myPosts">{FILTER_LABELS.myPosts}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardBody>
    </Card>
  );
};
