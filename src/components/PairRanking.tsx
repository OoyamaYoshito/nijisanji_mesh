import React, { FC } from 'react';
import { Member, Mention, ResultJSON } from '../types';
import result_json from '../scraping/TEMP_result.json';
import styled from '@emotion/styled';
import theme from '../style/theme';
import { getNameFromId, pairs } from './DataProcessingUtill';

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

const PairRanking: FC<{}> = () => {
  const pair_components = pairs
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
        <tbody>{pair_components}</tbody>
      </table>
    </StyledRankingRoot>
  );
};

const StyledRankingRoot = styled.div`
  margin: 0 auto;
  padding-top: ${theme.px.grid()};
  max-width: ${theme.px.max_width()};
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
