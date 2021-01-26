import { PageHeader } from 'antd';
import styled from 'styled-components';

export const StyledPageHeader = styled(PageHeader)`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  .ant-page-header-heading-title,
  .ant-descriptions-item-content,
  .ant-descriptions-item-label,
  .ant-page-header-back-button {
    color: ${({ theme }) => theme.text};
  }
`;
