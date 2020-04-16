import React from 'react';
import styled from '@emotion/styled';
import theme from '../style/theme';

export const Menu = () => (
  <MenuRoot>
    <h1>NIJISANJI-MESH</h1>
    <div>
      <a
        href="https://github.com/OoyamaYoshito/nijisanji_mesh"
        target="_blank"
        rel="noopener noreferrer"
      >
        ソースコード
      </a>
    </div>
  </MenuRoot>
);

const MenuRoot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: ${theme.px.grid(0.5)};
  background: rgba(255, 255, 255, 0.7);

  h1 {
    font-size: ${theme.px.font_size(0.8)};
    margin-left: ${theme.px.grid(0.5)};
  }

  div {
    a {
      font-size: ${theme.px.font_size(0.7)};
      margin-left: ${theme.px.grid(0.5)};
    }
  }
`;

export default Menu;
