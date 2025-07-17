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
}as const