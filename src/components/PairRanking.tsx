import React, { FC } from 'react';
import { Member, Mention, ResultJSON } from '../types';
import result_json from '../scraping/TEMP_result.json';
import styled from '@emotion/styled';
import theme from '../style/theme';

const result: ResultJSON = result_json;
const id2member: Map<string, Member> = new Map();
result.members.forEach((x) => id2member.set(x.channel_id, x));
const getNameFromId = (id: string): string | undefined => {
  const member = id2member.get(id);
  if (member === undefined) return undefined;
  return member.name;
};

const YoutubeChannelLink: FC<{ id: string; text?: string }> = ({
  id,
  text,
}) => (
  <a
    href={`https://www.youtube.com/channel/${id}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {text}
  </a>
);

const Pair: FC<{
  rank: number;
  mentions: [Mention, Mention];
  amount: number;
}> = ({ rank, mentions, amount }) => (
  <StyledPair>
    <td className="rank">{rank + 1}</td>
    <td className="pair">
      <span className="names">
        <YoutubeChannelLink
          id={mentions[0].origin_channel}
          text={getNameFromId(mentions[0].origin_channel)}
        />
        ×
        <YoutubeChannelLink
          id={mentions[0].target_channel}
          text={getNameFromId(mentions[0].target_channel)}
        />
      </span>
      ーmentions→: {mentions[0].comment_num}
      <br />
      ←mentionsー: {mentions[1].comment_num}
    </td>
    <td className="amount">{amount}</td>
  </StyledPair>
);

const StyledPair = styled.tr`
  border-bottom: 1px solid ${theme.colors.border};

  .rank {
    padding: ${theme.px.grid()};
    text-align: center;
  }
  .pair {
    padding: ${theme.px.grid()};

    .names {
      display: block;
      font-size: ${theme.px.font_size(1.5)};
    }
  }
  .amount {
    padding: ${theme.px.grid()};
    text-align: right;
  }
`;

const isNijisanjiChannelId = (id: string): boolean => id2member.has(id);

const PairRanking: FC<{}> = () => {
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
      return { mentions: x, amount };
    })
    .sort((x, y) => y.amount - x.amount)
    .filter((_, i) => i < 100)
    .map((x, i) => (
      <Pair
        rank={i}
        mentions={x.mentions as [Mention, Mention]}
        amount={x.amount}
        key={x.mentions[0].origin_channel + x.mentions[0].target_channel}
      />
    ));

  return (
    <StyledRankingRoot>
      <h2>ペアランキング</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>pair</th>
            <th>amount</th>
          </tr>
        </thead>
        <tbody>{pairs}</tbody>
      </table>
    </StyledRankingRoot>
  );
};

const StyledRankingRoot = styled.div`
  margin: 0 auto;
  max-width: ${theme.px.max_width()};
  h2 {
  }

  table {
    margin: ${theme.px.grid()} auto 0;
    border-collapse: collapse;

    thead {
      tr {
        border-bottom: 3px solid ${theme.colors.border};
        th {
          padding: ${theme.px.grid()};
        }
      }
    }
  }
`;

export default PairRanking;
