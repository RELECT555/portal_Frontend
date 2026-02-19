import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { NAV_ITEMS } from '@/lib/constants';
import { useUiStore } from '@/stores';

export const MobileSidebar: React.FC = () => {
  const location = useLocation();
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUiStore((s) => s.setSidebarOpen);

  const handleClose = (): void => {
    setSidebarOpen(false);
  };

  return (
    <Drawer anchor="left" open={sidebarOpen} onClose={handleClose}>
      <Box sx={{ width: 280, pt: 2 }}>
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography variant="h3" color="primary" fontWeight={700}>
            Я.МЕДИПАЛ.
          </Typography>
        </Box>
        <Divider />
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={handleClose}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
