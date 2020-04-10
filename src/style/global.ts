import { css } from '@emotion/core';
import theme from './theme';
import mix from 'mix-color';

export const global_styles = css`
  body {
    color: ${theme.colors.text};
    font-size: ${theme.px.font_size()};
    font-family: 游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro',
      'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック',
      'MS PGothic', sans-serif;
    background: ${theme.colors.base};
    a {
      color: ${theme.colors.accent};

      &:visited {
        color: ${mix(theme.colors.accent, '#000', 0.4)};
      }
    }
  }
`;

export default global_styles;
