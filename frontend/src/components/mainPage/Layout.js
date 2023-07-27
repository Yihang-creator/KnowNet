import { Box, CssBaseline, Toolbar } from '@mui/material';
import ResponsiveDrawer from './ResponsiveDrawer';
import SearchBar from './SearchBar';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <CssBaseline />
      <SearchBar/>
      <Box sx={{ display: 'flex', overflow: 'auto'}}>
        <ResponsiveDrawer />
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, maxWidth: '100%', overflowX: 'hidden' }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Box>
    
  );
}

export default Layout;
