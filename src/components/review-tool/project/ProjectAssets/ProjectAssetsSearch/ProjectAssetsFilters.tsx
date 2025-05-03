import { Badge, Button, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem } from '@heroui/react';
import React from 'react';

import {
  ProjectAssetsFilters as ProjectAssetsFiltersType,
  useProjectContext,
} from '../../../../../contexts/review-tool/Project';
import { Icon } from '../../../../various/Icon';

export const ProjectAssetsFilters = () => {
  const { project, search, setSearch, filters: defaultFilters, setFilters: updateFilters } = useProjectContext();

  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  const [filters, setFilters] = React.useState<ProjectAssetsFiltersType>(defaultFilters);

  const hasFilters = Object.keys(defaultFilters).length > 0;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleApplyFilters = () => {
    setIsPopoverVisible(false);
    const filteredFilters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => !!value));
    updateFilters(filteredFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
    updateFilters({});
    setIsPopoverVisible(false);
  };

  const handlePopoverClose = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="flex justify-end gap-4 w-full">
      <Badge isOneChar size="sm" color="primary" isInvisible={!hasFilters}>
        <Popover
          placement="bottom-end"
          isOpen={isPopoverVisible}
          onOpenChange={setIsPopoverVisible}
          onClose={handlePopoverClose}
        >
          <PopoverTrigger>
            <Button color="default" variant="flat">
              <Icon icon="filter" size={20} />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 w-64 p-2">
              <div className="text-lg font-semibold">Filters</div>
              <div className="flex flex-col gap-4">
                <Select
                  label="Assignee"
                  size="sm"
                  value={filters.assignee}
                  selectedKeys={filters.assignee ? [filters.assignee] : []}
                  onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
                  labelPlacement="outside"
                  placeholder="Select assignee"
                  startContent={<Icon icon="user" size={18} className="text-foreground-500" />}
                >
                  {project.members.map((member) => (
                    <SelectItem key={member.user?.id ?? member.id}>{member.user?.name}</SelectItem>
                  ))}
                </Select>
                <Select
                  size="sm"
                  value={filters.status}
                  selectedKeys={filters.status ? [filters.status] : []}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  label="Status"
                  labelPlacement="outside"
                  placeholder="Select status"
                  startContent={<Icon icon="check" size={18} className="text-foreground-500" />}
                >
                  <SelectItem key="in-progress">In progress</SelectItem>
                  <SelectItem key="review-needed">Review needed</SelectItem>
                  <SelectItem key="changes-required">Changes required</SelectItem>
                  <SelectItem key="approved">Approved</SelectItem>
                </Select>
                <div className="flex gap-2">
                  <Input
                    size="sm"
                    label="Size from"
                    labelPlacement="outside"
                    type="number"
                    value={filters.sizeFrom?.toString()}
                    onChange={(e) => setFilters({ ...filters, sizeFrom: Number(e.target.value) })}
                    startContent={<span className="text-sm text-foreground-500">MB</span>}
                  />
                  <Input
                    size="sm"
                    label="Size to"
                    labelPlacement="outside"
                    type="number"
                    value={filters.sizeTo?.toString()}
                    onChange={(e) => setFilters({ ...filters, sizeTo: Number(e.target.value) })}
                    startContent={<span className="text-sm text-foreground-500">MB</span>}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  {hasFilters && (
                    <Button size="sm" color="danger" variant="light" onClick={handleResetFilters}>
                      Reset filters
                    </Button>
                  )}
                  <Button size="sm" className="text-content1 bg-foreground" onClick={handleApplyFilters}>
                    Apply filters
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Badge>

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
  );
};
