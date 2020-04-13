import { Member, Mention, ResultJSON } from '../types';
import result_json from '../scraping/TEMP_result.json';
import { NodeData, LinkData } from './graph/types';

export const result: ResultJSON = result_json;
const id2member: Map<string, Member> = new Map();
result.members.forEach((x) => id2member.set(x.channel_id, x));
export const getNameFromId = (id: string): string | undefined => {
  const member = id2member.get(id);
  if (member === undefined) return undefined;
  return member.name;
};

export const isNijisanjiChannelId = (id: string): boolean => id2member.has(id);

export const getPairsFromResult = (
  result: ResultJSON
): { mentions: Mention[]; amount: number }[] => {
  const nijisanji_mentions = result.mentions.filter((x) =>
    isNijisanjiChannelId(x.origin_channel)
  );
  const mentions_group_map: Map<string, Mention[]> = new Map();
  nijisanji_mentions.forEach((x) => {
    const key =
      x.origin_channel.localeCompare(x.target_channel) > 0
        ? `${x.origin_channel}${x.target_channel}`
        : `${x.target_channel}${x.origin_channel}`;

    const target_array = mentions_group_map.get(key);
    if (target_array === undefined) {
      mentions_group_map.set(key, [x]);
    } else {
      target_array.push(x);
    }
  });
  const pairs = Array.from(mentions_group_map.values())
    .filter((x) => x.length !== 0 && x.length <= 2)
    .map((x) => {
      const amount =
        x.length === 1 ? x[0].comment_num : x[0].comment_num * x[1].comment_num;
      //x.length === 1
      //  ? x[0].comment_num
      //  : x[0].comment_num > x[1].comment_num
      //  ? x[1].comment_num
      //  : x[0].comment_num;
      return { mentions: x, amount };
    });
  return pairs;
};

export const pairs = getPairsFromResult(result);

const getNodes = (): NodeData[] => {
  const nodes: NodeData[] = result.members.map((x, i) => ({
    id: i,
    name: x.name,
    channel_id: x.channel_id,
  }));
  return nodes;
};

export const nodes = getNodes();

const channel_id2d3id: Map<string, number> = new Map();
nodes.forEach((x) => channel_id2d3id.set(x.channel_id, x.id));
const getD3idfromChannelId = (channel_id: string): number | undefined => {
  const d3id = channel_id2d3id.get(channel_id);
  if (d3id === undefined) return undefined;
  return d3id;
};

const getLinks = (): LinkData[] => {
  const links: LinkData[] = pairs.map((x, i) => ({
    id: i,
    source: getD3idfromChannelId(x.mentions[0].origin_channel) as number,
    source_channel_id: x.mentions[0].origin_channel,
    target: getD3idfromChannelId(x.mentions[0].target_channel) as number,
    target_channel_id: x.mentions[0].target_channel,
    num: x.amount,
  }));
  return links;
};
export const links = getLinks();

export const filterLinksByDegree = (
  links: LinkData[],
  max_degree: number,
  min_degree: number
) => {
  const links_map: Map<number, LinkData[]> = new Map();

  const pushLinkToMapsArray = (
    link: LinkData,
    map: typeof links_map,
    key: number
  ) => {
    const array = map.get(key);
    if (array !== undefined) array.push(link);
    else map.set(key, [link]);
  };
  links.forEach((x) => {
    pushLinkToMapsArray(x, links_map, x.source);
    pushLinkToMapsArray(x, links_map, x.target);
  });

  const omitted_links: Set<LinkData> = new Set();
  links_map.forEach((x) => {
    const sorted_links = x.sort((a, b) => b.num - a.num);
    sorted_links.slice(max_degree).forEach((x) => omitted_links.add(x));
  });

  const selected_links: Set<LinkData> = new Set();
  links_map.forEach((x) => {
    const sorted_links = x.sort((a, b) => b.num - a.num);
    sorted_links.slice(0, min_degree).forEach((x) => selected_links.add(x));
  });

  return links.filter((x) => !omitted_links.has(x) || selected_links.has(x));
};
