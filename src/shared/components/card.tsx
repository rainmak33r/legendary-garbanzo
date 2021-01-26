import styled from 'styled-components';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.cardBackground};
  border-color: ${({ theme }) => theme.cardBorder};
  .ant-card-head,
  .ant-card-meta-title,
  .ant-card-meta-description {
    color: ${({ theme }) => theme.text};
  }
`;
