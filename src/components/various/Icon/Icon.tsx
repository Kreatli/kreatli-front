import React from 'react';

import AddImageIcon from '../../../assets/icons/add-image.svg';
import BuildingIcon from '../../../assets/icons/building.svg';
import CheckIcon from '../../../assets/icons/check.svg';
import CrossIcon from '../../../assets/icons/cross.svg';
import DiscordIcon from '../../../assets/icons/discord.svg';
import ErrorIcon from '../../../assets/icons/error.svg';
import FileIcon from '../../../assets/icons/file.svg';
import HideIcon from '../../../assets/icons/hide.svg';
import InfoIcon from '../../../assets/icons/info.svg';
import InstagramIcon from '../../../assets/icons/instagram.svg';
import LinkIcon from '../../../assets/icons/link.svg';
import PlusIcon from '../../../assets/icons/plus.svg';
import SearchIcon from '../../../assets/icons/search.svg';
import ShowIcon from '../../../assets/icons/show.svg';
import SuccessIcon from '../../../assets/icons/success.svg';
import TrashIcon from '../../../assets/icons/trash.svg';
import TwitterIcon from '../../../assets/icons/twitter.svg';
import UploadIcon from '../../../assets/icons/upload.svg';
import UserIcon from '../../../assets/icons/user.svg';
import WarningIcon from '../../../assets/icons/warning.svg';
import YoutubeIcon from '../../../assets/icons/youtube.svg';

const ICONS = {
  addImage: AddImageIcon,
  building: BuildingIcon,
  check: CheckIcon,
  cross: CrossIcon,
  discord: DiscordIcon,
  error: ErrorIcon,
  file: FileIcon,
  hide: HideIcon,
  info: InfoIcon,
  instagram: InstagramIcon,
  link: LinkIcon,
  plus: PlusIcon,
  search: SearchIcon,
  show: ShowIcon,
  success: SuccessIcon,
  trash: TrashIcon,
  twitter: TwitterIcon,
  upload: UploadIcon,
  user: UserIcon,
  warning: WarningIcon,
  youtube: YoutubeIcon,
};

export type IconType = keyof typeof ICONS;

interface Props {
  size?: number;
  fill?: string;
  icon: IconType;
}

export const Icon: React.FC<Props> = ({ icon, size = 24, fill = 'currentcolor' }) => {
  const IconToRender = ICONS[icon];

  return (
    <IconToRender
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24"
      fill={fill}
    />
  );
};
