export const Config = {
  USER_TYPE_SINGLE: 'Exoneree',
  USER_TYPE_PLURAL: 'Exonerees',
  MEMBER_TYPE_SINGLE: 'Chapter Member',
  MEMBER_TYPE_PLURAL: 'Chapter Members',
  FUTURE_MEMBER_TYPE_SINGLE: 'Future Member',
  FUTURE_MEMBER_TYPE_PLURAL: 'Future Members',
} as const;

export type ManagingType =
  | typeof Config['USER_TYPE_PLURAL']
  | typeof Config['MEMBER_TYPE_PLURAL']
  | typeof Config['FUTURE_MEMBER_TYPE_PLURAL'];

export const Messages = {
  INACTIVATE_KB: '**Inactivating a knowledge base will inactivate all its articles.**',
  REACTIVATE_KB: '**Reactivating a knowledge base will reactivate all its articles.**',
  INACTIVATE_ARTICLE: `**Inactivating a knowledge article will not allow ${Config.USER_TYPE_PLURAL} to view it.**`,
  REACTIVATE_ARTICLE: `**Reactivating a knowledge article will allow ${Config.USER_TYPE_PLURAL} to view it.**`,
} as const

export const ToastMessages = {
  TIER_UP: (firstName?: string, newTier?: number, oldTier?: number) =>
    `Changed ${firstName}'s Tier to: ${newTier} From: ${oldTier}`,
} as const

export const NavNames = {
  NEWSLETTER: 'Home',
  REQUEST: 'Requests',
  PEOPLE: 'People',
  KNOWLEDGE: 'Knowledge',
  CONTACTS: 'Contacts',
  PORTAL: 'Portal'
} as const