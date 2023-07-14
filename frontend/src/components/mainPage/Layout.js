import { Box, CssBaseline, Toolbar } from '@mui/material';
import ResponsiveDrawer from './ResponsiveDrawer';
import SearchBar from './SearchBar';

function Layout({ children, setSearchTerm }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <CssBaseline />
      <SearchBar setSearchTerm={setSearchTerm}/>
      <Box sx={{ display: 'flex', overflow: 'auto'}}>
        <ResponsiveDrawer />
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, maxWidth: '100%', overflowX: 'hidden' }}>
          <Toolbar /> {/* Spacer to shift content below the AppBar */}
          {children}
        </Box>
      </Box>
    </Box>
    
  );
}

export default Layout;
