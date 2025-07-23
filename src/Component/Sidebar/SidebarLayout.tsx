// src/components/SidebarLayout.tsx
import {
    AppBar,
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
  } from '@mui/material';
  import DashboardIcon from '@mui/icons-material/Dashboard';
  import SettingsIcon from '@mui/icons-material/Settings';
  import GroupIcon from '@mui/icons-material/Group';
  import { useNavigate, useLocation } from 'react-router-dom';
  import React from 'react';
  import Logo from '../../Assets/logo.png'
  
  const drawerWidth = 240;
  
  interface SidebarLayoutProps {
    children: React.ReactNode;
  }

  interface MenuItemsProps {
    text: string;
    icon: React.ReactNode;
    path: string;
  }
  
  const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const menuItems: MenuItemsProps[] = [
      { text: 'Dashboard', icon: <DashboardIcon className='text-dark' />, path: '/' },
      { text: 'Employee', icon: <GroupIcon className='text-dark' />, path: '/employee' },
    ];
  
    return (
      <Box sx={{ display: 'flex' }} className="h-[100vh]">
        {/* AppBar */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} className='!bg-dark'>
          <Toolbar>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 0 }}>
                <img
                    src={Logo}
                    alt="App Logo"
                    style={{ width: 65, height: 65}}
                />
            </Box>
            <Typography variant="h6" noWrap className='text-white text-pri'>
              Managely Crew
            </Typography>
          </Toolbar>
        </AppBar>
  
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: '#E6EEF3', // warna selected
                    color: '#0F0F10',           // warna teks saat selected
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: '#E6EEF3', // hover saat selected
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
  
        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} className='bg-light'>
          <Toolbar />
          {children}
        </Box>
      </Box>
    );
  };
  
  export default SidebarLayout;
  