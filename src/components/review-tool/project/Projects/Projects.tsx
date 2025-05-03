import { Button, Input, Tab, Tabs } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

import { useDebounce } from '../../../../hooks/useDebounce';
import { useGetProjects } from '../../../../services/review-tool/hooks';
import { GetProjectsQueryParams } from '../../../../services/review-tool/types';
import { Icon } from '../../../various/Icon';
import { CreateProjectModal } from '../ProjectModals/CreateProjectModal';
import { ProjectsList } from '../ProjectsList';

export const Projects = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState<GetProjectsQueryParams['status']>(
    (searchParams.get('tab') as GetProjectsQueryParams['status']) ?? 'active',
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const activeTab = (searchParams.get('tab') as GetProjectsQueryParams['status']) ?? 'active';

  React.useEffect(() => {
    if (activeTab !== status) {
      setStatus(activeTab as GetProjectsQueryParams['status']);
    }
  }, [activeTab]);

  const searchDebounced = useDebounce(search);

  const { data, isLoading, isError } = useGetProjects({ status, search: searchDebounced });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleTabChange = (newStatus: React.Key) => {
    router.push({ query: { tab: newStatus.toString() } });
    setStatus(newStatus.toString() as GetProjectsQueryParams['status']);
  };

  return (
    <div className="p-6 border-t border-foreground-200">
      <div className="flex justify-between gap-4 mb-2">
        <h2 className="text-3xl font-semibold">Projects</h2>
        <Button className="bg-foreground text-content1" onClick={() => setIsCreateModalOpen(true)}>
          <Icon icon="plus" size={16} />
          Create project
        </Button>
      </div>
      <div className="flex gap-6 mb-4">
        <Tabs selectedKey={status} onSelectionChange={handleTabChange}>
          <Tab title={`All (${data?.totals.all ?? 0})`} key="all" />
          <Tab title={`Active (${data?.totals.active ?? 0})`} key="active" />
          <Tab title={`Completed (${data?.totals.completed ?? 0})`} key="completed" />
          <Tab title={`Archived (${data?.totals.archived ?? 0})`} key="archived" />
        </Tabs>
        <Input
          value={search}
          placeholder="Search"
          className="w-fit"
          variant="underlined"
          isClearable
          startContent={<Icon icon="search" />}
          onChange={handleInputChange}
          onClear={() => setSearch('')}
        />
      </div>
      <ProjectsList
        projects={data?.projects}
        status={status}
        search={searchDebounced}
        isLoading={isLoading}
        isError={isError}
        onCreateProject={() => setIsCreateModalOpen(true)}
      />
      <CreateProjectModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
};
