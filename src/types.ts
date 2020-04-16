//types
export type Member = {
  name: string;
  channel_id: string;
  nicknames: string[];
  icon: string;
};
export type Mention = {
  origin_channel: string;
  target_channel: string;
  comment_num: number;
};
export type ResultJSON = {
  members: Member[];
  mentions: Mention[];
};
