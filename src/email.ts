import { WebClient, WebAPICallResult } from '@slack/web-api'

const slackClient = new WebClient(process.env.SLACK_TOKEN)

async function getConverstionInfo (channel: Channel) {
  const resp = await slackClient.conversations.info({
    channel: channel.id
  }) as ConversationInfoMessageResult
  return resp.channel
}

async function getConverstionMembers (channel: Channel) {
  const resp = await slackClient.conversations.members({
    channel: channel.id
  }) as ConversationMembersMessageResult
  return resp.members
}

async function getUserInfo (userId: string) {
  const resp = await slackClient.users.info({ user: userId }) as UserInfoMessageResult
  return resp.user
}

async function getUsersInfo (members: string[]) {
  return Promise.all(members.map(getUserInfo))
}

async function getChannelEmails (channel: Channel) {
  const members = await getConverstionMembers(channel)
  const memberDetails = await getUsersInfo(members)
  return memberDetails.map(detail => detail.profile.email)
}

export async function getEmails () {
  const { channels } = await slackClient.conversations.list() as ConverstaionListMessageResult
  const output = await Promise.all(channels.map(getChannelEmails))
  console.log(output)
  return output
}



interface ConverstaionListMessageResult extends WebAPICallResult {
  channels: Channel[];
}
interface ConversationInfoMessageResult extends WebAPICallResult {
  channel: ChannelDetails
}

interface ConversationMembersMessageResult extends WebAPICallResult {
  members: string[];
}

interface UserInfoMessageResult extends WebAPICallResult {
  user: User;
}

interface ChannelDetails {
  id: string;
  name: string;
  is_channel: boolean;
  is_group: boolean;
  is_im: boolean;
  created: number;
  is_archived: boolean;
  is_general: boolean;
  unlinked: number;
  name_normalized: string;
  is_shared: boolean;
  parent_conversation?: any;
  creator: string;
  is_ext_shared: boolean;
  is_org_shared: boolean;
  shared_team_ids: string[];
  pending_shared: any[];
  pending_connected_team_ids: any[];
  is_pending_ext_shared: boolean;
  is_member: boolean;
  is_private: boolean;
  is_mpim: boolean;
  topic: Topic;
  purpose: Topic;
  previous_names: any[];
  num_members: number;
}

interface Topic {
  value: string;
  creator: string;
  last_set: number;
}


interface Channel {
  id: string;
  name: string;
  is_channel: boolean;
  is_group: boolean;
  is_im: boolean;
  created: number;
  is_archived: boolean;
  is_general: boolean;
  unlinked: number;
  name_normalized: string;
  is_shared: boolean;
  parent_conversation?: any;
  creator: string;
  is_read_only?: boolean;
  is_thread_only?: boolean;
  is_non_threadable?: boolean;
  is_ext_shared: boolean;
  is_org_shared: boolean;
  shared_team_ids: string[];
  pending_shared: any[];
  pending_connected_team_ids: any[];
  is_pending_ext_shared: boolean;
  is_member: boolean;
  is_private: boolean;
  is_mpim: boolean;
  topic: Topic;
  purpose: Topic;
  previous_names: any[];
}


interface User {
  id: string;
  team_id: string;
  name: string;
  deleted: boolean;
  color: string;
  real_name: string;
  tz: string;
  tz_label: string;
  tz_offset: number;
  profile: Profile;
  is_admin: boolean;
  is_owner: boolean;
  is_primary_owner: boolean;
  is_restricted: boolean;
  is_ultra_restricted: boolean;
  is_bot: boolean;
  updated: number;
  is_app_user: boolean;
  has_2fa: boolean;
}

interface Profile {
  avatar_hash: string;
  status_text: string;
  status_emoji: string;
  real_name: string;
  display_name: string;
  real_name_normalized: string;
  display_name_normalized: string;
  email: string;
  image_original: string;
  image_24: string;
  image_32: string;
  image_48: string;
  image_72: string;
  image_192: string;
  image_512: string;
  team: string;
}