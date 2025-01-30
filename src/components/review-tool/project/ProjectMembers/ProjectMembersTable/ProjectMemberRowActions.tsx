import { Tooltip, Button, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import React from 'react';
import { ProjectMemberDto } from '../../../../../services/review-tool/types';
import { Icon } from '../../../../various/Icon';

interface Props {
  onRemove: () => void;
  onResendInvite: () => void;
  isDisabled?: boolean;
  member: ProjectMemberDto;
}

export const ProjectMemberRowActions = ({ onRemove, onResendInvite, isDisabled, member }: Props) => {
  const [isRemovePopoverOpen, setIsRemovePopoverOpen] = React.useState(false);

  return (
    <div className="flex gap-2 justify-end">
      {member.status !== 'joined' && (
        <Tooltip content="Resend invitation">
          <Button isIconOnly size="sm" variant="light" radius="full" isDisabled={isDisabled} onClick={onResendInvite}>
            <Icon icon="update" size={18} />
          </Button>
        </Tooltip>
      )}
      {member.role === 'contributor' && member.status !== 'removed' && member.status !== 'left' && (
        <Popover
          placement="bottom-end"
          backdrop="opaque"
          isOpen={isRemovePopoverOpen}
          onOpenChange={setIsRemovePopoverOpen}
        >
          <PopoverTrigger>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              radius="full"
              className="text-foreground hover:text-danger"
              color="danger"
              isDisabled={isDisabled}
            >
              <Icon icon="trash" size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-4 p-2">
              <div className="text-medium font-medium max-w-80">
                Are you sure you want to remove {member.user?.name ?? member.email} from the project?
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="light" onClick={() => setIsRemovePopoverOpen(false)}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => {
                    onRemove();
                    setIsRemovePopoverOpen(false);
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
