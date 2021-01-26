import React, { useEffect, useState } from 'react';
import { Button, Menu } from 'antd';
import { Route, useHistory, Switch } from 'react-router-dom';
import { APP_ROUTES } from './routes/app.routes';
import { APP_URLS } from './routes/app.urls';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { ThemeNames } from './app.constants';
import { theme } from './theme';
import { BulbFilled, BulbOutlined } from '@ant-design/icons';
import { useLocalStorage } from './shared/hooks';
import { StyledLayout } from './shared/components';

const LS_THEME_KEY = 'isDark';

export function App() {
  const history = useHistory();
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
  const [isDark, setIsDark] = useState(getLocalStorageItem(LS_THEME_KEY));
  const themeToggler = () => setIsDark((prev) => !prev);
  const selectedTheme = isDark
    ? theme[ThemeNames.dark]
    : theme[ThemeNames.light];

  const handleClick = ({ key }) => {
    history.push(key);
  };

  useEffect(() => {
    setLocalStorageItem(LS_THEME_KEY, isDark);
  }, [isDark, setLocalStorageItem]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <StyledLayout style={{ height: '100%' }}>
        <StyledLayout.Header>
          <Menu
            mode="horizontal"
            onClick={handleClick}
            defaultSelectedKeys={[window.location.pathname]}
          >
            <Menu.Item key={APP_URLS.home}>Home</Menu.Item>
            <Menu.Item key={APP_URLS.shelves}>Shelves</Menu.Item>
            <Menu.Item key={APP_URLS.shelvesWithReviews}>
              Shelves with reviews
            </Menu.Item>
          </Menu>

          <Button shape="circle" onClick={themeToggler}>
            {isDark ? <BulbOutlined /> : <BulbFilled />}
          </Button>
        </StyledLayout.Header>

        <StyledLayout.Content style={{ padding: '1rem' }}>
          <Switch>
            {APP_ROUTES.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Switch>
        </StyledLayout.Content>
      </StyledLayout>
    </ThemeProvider>
  );
}

export default App;
