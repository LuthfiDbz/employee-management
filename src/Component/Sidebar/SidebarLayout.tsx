// src/components/SidebarLayout.tsx
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    Toolbar,
    Tooltip,
    Typography,
  } from '@mui/material';
  import DashboardIcon from '@mui/icons-material/Dashboard';
  import SettingsIcon from '@mui/icons-material/Settings';
  import GroupIcon from '@mui/icons-material/Group';
  import { useNavigate, useLocation } from 'react-router-dom';
  import React from 'react';
  import Logo from '../../Assets/logo.png'
  import Avatar from '../../Assets/avatar.jpg'
import { AccountCircle } from '@mui/icons-material';
  
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
          <Toolbar sx={{display: 'flex', justifyContent: "space-between"}}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", py: 0 }}>
                <img
                    src={Logo}
                    alt="App Logo"
                    style={{ width: 65, height: 65}}
                />
                <Typography variant="h6" noWrap className='text-white text-pri'>
                  Managely Crew
                </Typography>
            </Box>
            <Box>
              <Tooltip title="Open settings">
                <IconButton 
                  // onClick={handleOpenUserMenu} 
                  sx={{ p: 0 }}
                >
                  <img src={Avatar} alt=""  className='rounded-full' width={45} height={45}/>
                  {/* <AccountCircle fontSize='large' color="secondary" /> */}
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                </IconButton>
              </Tooltip>
              {/* <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu> */}
            </Box>
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
                  '&.Mui-selected .MuiListItemIcon-root .MuiSvgIcon-root': {
                    color: '#FDD000', // warna icon saat hover
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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} className='bg-light h-fit'>
          <Toolbar />
          {children}
        </Box>
      </Box>
    );
  };
  
  export default SidebarLayout;
  