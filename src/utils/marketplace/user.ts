import { SKILL_LABELS_FOR_PROFESSIONAL } from '../../constants/marketplace/skills';
import { User } from '../../typings/marketplace/user';

export const getUserSkills = (user: User.ShortInfo) => {
  return user.role === 'creator'
    ? user.youtube.topics.join(' • ')
    : user.skills.map((skill) => SKILL_LABELS_FOR_PROFESSIONAL[skill]).join(' ');
};

export const getUserShortDescription = (user: User.ShortInfo) => {
  return user.role === 'creator'
    ? `${user.youtube.customUrl} | ${user.youtube.topics.join(' • ')}`
    : getUserSkills(user);
};
