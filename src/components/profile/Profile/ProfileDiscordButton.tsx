import { Link, Tooltip } from '@nextui-org/react';
import React from 'react';

import { Icon } from '../../various/Icon';

interface Props {
  discordUsername: string;
}

export const ProfileDiscordButton = ({ discordUsername }: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean | undefined>(undefined);
  const timeoutRef = React.useRef<number>();

  const handlePress = () => {
    setIsOpen(true);
    navigator.clipboard.writeText(discordUsername);
    window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(undefined);
    }, 1500);
  };

  const content = isOpen === undefined
    ? (
      <span>
        Click to copy: <span className="font-semibold">{discordUsername}</span>
      </span>
    )
    : (
      <span>
        Copied to clipboard: <span className="font-semibold">{discordUsername}</span>
      </span>
    );

  return (
    <Tooltip isOpen={isOpen} content={content}>
      <Link
        as="button"
        color="foreground"
        onPress={handlePress}
      >
        <Icon icon="discord" size="2rem" />
      </Link>
    </Tooltip>
  );
};
