import React from 'react';

import AddImageIcon from '../../../assets/icons/add-image.svg';
import AddVideoIcon from '../../../assets/icons/add-video.svg';
import ArrowLeftIcon from '../../../assets/icons/arrow-left.svg';
import ArrowRightIcon from '../../../assets/icons/arrow-right.svg';
import BankIcon from '../../../assets/icons/bank.svg';
import BitcoinIcon from '../../../assets/icons/bitcoin.svg';
import BoldIcon from '../../../assets/icons/bold.svg';
import BuildingIcon from '../../../assets/icons/building.svg';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import CashIcon from '../../../assets/icons/cash.svg';
import ChatIcon from '../../../assets/icons/chat.svg';
import CheckIcon from '../../../assets/icons/check.svg';
import CheckCircleIcon from '../../../assets/icons/check-circle.svg';
import CheckShieldIcon from '../../../assets/icons/check-shield.svg';
import ChevronDownIcon from '../../../assets/icons/chevron-down.svg';
import CreditCardIcon from '../../../assets/icons/credit-card.svg';
import CrossIcon from '../../../assets/icons/cross.svg';
import CrossCircleIcon from '../../../assets/icons/cross-circle.svg';
import DiamondIcon from '../../../assets/icons/diamond.svg';
import DiscordIcon from '../../../assets/icons/discord.svg';
import DollarIcon from '../../../assets/icons/dollar.svg';
import DotsIcon from '../../../assets/icons/dots.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import EmojiHappyIcon from '../../../assets/icons/emoji/happy.svg';
import EmojiSadIcon from '../../../assets/icons/emoji/sad.svg';
import ErrorIcon from '../../../assets/icons/error.svg';
import FileIcon from '../../../assets/icons/file.svg';
import FilterIcon from '../../../assets/icons/filter.svg';
import GroupIcon from '../../../assets/icons/group.svg';
import HeartIcon from '../../../assets/icons/heart.svg';
import HideIcon from '../../../assets/icons/hide.svg';
import InfoIcon from '../../../assets/icons/info.svg';
import InstagramIcon from '../../../assets/icons/instagram.svg';
import ItalicIcon from '../../../assets/icons/italic.svg';
import LinkIcon from '../../../assets/icons/link.svg';
import LocationIcon from '../../../assets/icons/location.svg';
import LogoIcon from '../../../assets/icons/logo.svg';
import MailIcon from '../../../assets/icons/mail.svg';
import MoonIcon from '../../../assets/icons/moon.svg';
import PaypalIcon from '../../../assets/icons/paypal.svg';
import PlusIcon from '../../../assets/icons/plus.svg';
import RankingIcon from '../../../assets/icons/ranking.svg';
import ReplyIcon from '../../../assets/icons/reply.svg';
import SearchIcon from '../../../assets/icons/search.svg';
import SendIcon from '../../../assets/icons/send.svg';
import ShowIcon from '../../../assets/icons/show.svg';
import StarIcon from '../../../assets/icons/star.svg';
import StrikethroughIcon from '../../../assets/icons/strikethrough.svg';
import SuccessIcon from '../../../assets/icons/success.svg';
import SuitcaseIcon from '../../../assets/icons/suitcase.svg';
import SunIcon from '../../../assets/icons/sun.svg';
import TimeIcon from '../../../assets/icons/time.svg';
import TimerIcon from '../../../assets/icons/timer.svg';
import TrashIcon from '../../../assets/icons/trash.svg';
import TwitterIcon from '../../../assets/icons/twitter.svg';
import UnderlineIcon from '../../../assets/icons/underline.svg';
import UpdateIcon from '../../../assets/icons/update.svg';
import UploadIcon from '../../../assets/icons/upload.svg';
import UserIcon from '../../../assets/icons/user.svg';
import WarningIcon from '../../../assets/icons/warning.svg';
import YoutubeIcon from '../../../assets/icons/youtube.svg';

const ICONS = {
  addImage: AddImageIcon,
  addVideo: AddVideoIcon,
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  bank: BankIcon,
  bitcoin: BitcoinIcon,
  bold: BoldIcon,
  building: BuildingIcon,
  calendar: CalendarIcon,
  cash: CashIcon,
  chat: ChatIcon,
  check: CheckIcon,
  checkCircle: CheckCircleIcon,
  checkShield: CheckShieldIcon,
  chevronDown: ChevronDownIcon,
  creditCard: CreditCardIcon,
  cross: CrossIcon,
  crossCircle: CrossCircleIcon,
  diamond: DiamondIcon,
  discord: DiscordIcon,
  dollar: DollarIcon,
  dots: DotsIcon,
  edit: EditIcon,
  emojiHappy: EmojiHappyIcon,
  emojiSad: EmojiSadIcon,
  error: ErrorIcon,
  file: FileIcon,
  filter: FilterIcon,
  group: GroupIcon,
  heart: HeartIcon,
  hide: HideIcon,
  info: InfoIcon,
  instagram: InstagramIcon,
  italic: ItalicIcon,
  link: LinkIcon,
  location: LocationIcon,
  logo: LogoIcon,
  mail: MailIcon,
  moon: MoonIcon,
  paypal: PaypalIcon,
  plus: PlusIcon,
  ranking: RankingIcon,
  reply: ReplyIcon,
  search: SearchIcon,
  send: SendIcon,
  show: ShowIcon,
  star: StarIcon,
  strikethrough: StrikethroughIcon,
  success: SuccessIcon,
  suitcase: SuitcaseIcon,
  sun: SunIcon,
  time: TimeIcon,
  timer: TimerIcon,
  trash: TrashIcon,
  twitter: TwitterIcon,
  underline: UnderlineIcon,
  update: UpdateIcon,
  upload: UploadIcon,
  user: UserIcon,
  warning: WarningIcon,
  youtube: YoutubeIcon,
};

export type IconType = keyof typeof ICONS;

interface Props extends React.SVGProps<SVGElement> {
  size?: number | string;
  icon: IconType;
}

export const Icon = ({ icon, size = 24, fill = 'currentcolor', className }: Props) => {
  const IconToRender = ICONS[icon];

  return (
    <IconToRender
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
    />
  );
};
