import { SKILL_LABELS_FOR_PROFESSIONAL } from '../constants/skills';
import { User } from '../typings/user';

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
