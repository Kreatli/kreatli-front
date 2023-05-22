import React from 'react';

import AddImageIcon from '../../../assets/icons/add-image.svg';
import BuildingIcon from '../../../assets/icons/building.svg';
import ChatIcon from '../../../assets/icons/chat.svg';
import CheckIcon from '../../../assets/icons/check.svg';
import CrossIcon from '../../../assets/icons/cross.svg';
import DiscordIcon from '../../../assets/icons/discord.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import ErrorIcon from '../../../assets/icons/error.svg';
import FileIcon from '../../../assets/icons/file.svg';
import HideIcon from '../../../assets/icons/hide.svg';
import InfoIcon from '../../../assets/icons/info.svg';
import InstagramIcon from '../../../assets/icons/instagram.svg';
import LinkIcon from '../../../assets/icons/link.svg';
import MailIcon from '../../../assets/icons/mail.svg';
import MoonIcon from '../../../assets/icons/moon.svg';
import PlusIcon from '../../../assets/icons/plus.svg';
import SearchIcon from '../../../assets/icons/search.svg';
import ShowIcon from '../../../assets/icons/show.svg';
import SuccessIcon from '../../../assets/icons/success.svg';
import SunIcon from '../../../assets/icons/sun.svg';
import TrashIcon from '../../../assets/icons/trash.svg';
import TwitterIcon from '../../../assets/icons/twitter.svg';
import UpdateIcon from '../../../assets/icons/update.svg';
import UploadIcon from '../../../assets/icons/upload.svg';
import UserIcon from '../../../assets/icons/user.svg';
import WarningIcon from '../../../assets/icons/warning.svg';
import YoutubeIcon from '../../../assets/icons/youtube.svg';

const ICONS = {
  addImage: AddImageIcon,
  building: BuildingIcon,
  chat: ChatIcon,
  check: CheckIcon,
  cross: CrossIcon,
  discord: DiscordIcon,
  edit: EditIcon,
  error: ErrorIcon,
  file: FileIcon,
  hide: HideIcon,
  info: InfoIcon,
  instagram: InstagramIcon,
  link: LinkIcon,
  mail: MailIcon,
  moon: MoonIcon,
  plus: PlusIcon,
  search: SearchIcon,
  show: ShowIcon,
  success: SuccessIcon,
  sun: SunIcon,
  trash: TrashIcon,
  twitter: TwitterIcon,
  update: UpdateIcon,
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
