import styled from 'styled-components';
import { Layout } from 'antd';

export const StyledLayout = styled(Layout)`
  background: ${({ theme }) => theme.body};
  transition: background 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  .ant-layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ant-layout-header .ant-menu {
    border-bottom: 0;
    height: 64px;
  }
  .ant-layout-header,
  .ant-layout-header .ant-menu {
    transition: background 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
    background: ${({ theme }) => theme.header};
    color: ${({ theme }) => theme.text};
  }
`;
