import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import Dropdown from './Dropdown';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSearchContext } from './searchContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const IconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '37ch',
      // '&:focus': {
      //   width: '50ch',
      // },
    },
  },
}));

export default function SearchBar() {
  const {
    setSearchTerm,
    setSearchByTag,
    setLocalSearchTerm,
    setChecked,
    localSearchTerm,
    checked,
  } = useSearchContext();
  const navigate = useNavigate();

  const handleSearch = (searchTerm, setSearchTerm, checked, setSearchByTag) => {
    setSearchTerm(searchTerm);
    setSearchByTag(checked);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchByTag(false);
    setLocalSearchTerm('');
    setChecked(false);
  };

  const handleTagChange = (event) => {
    setChecked(event.target.checked);
  };

  const onKeyup = (e) => {
    if (e.keyCode === 13) {
      handleSearch(localSearchTerm, setSearchTerm, checked, setSearchByTag);
      navigate('/');
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'black',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Toolbar>
          <img src={'/images/ae.png'} className="z-40 w-40" alt="" />
          <div className="mx-screen">
            <Search>
              <Link to="/">
                <IconButton
                  size="large"
                  aria-label="search"
                  color="inherit"
                  onClick={() =>
                    handleSearch(
                      localSearchTerm,
                      setSearchTerm,
                      checked,
                      setSearchByTag,
                    )
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <IconWrapper>
                    <SearchIcon />
                  </IconWrapper>
                </IconButton>
              </Link>

              <StyledInputBase
                placeholder="Search…"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}
                onKeyUp={onKeyup}
              />
              <IconButton
                size="large"
                aria-label="search"
                color="inherit"
                onClick={() => clearSearch()}
                style={{ cursor: 'pointer' }}
              >
                <IconWrapper>
                  <ClearIcon />
                </IconWrapper>
              </IconButton>
            </Search>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleTagChange}
                sx={{
                  color: 'white',
                  '&.Mui-checked': {
                    color: 'orange',
                  },
                  marginLeft: '30px',
                }}
              />
            }
            label="Search By Tag"
          />
        </Toolbar>
        <div className="mr-5">
          <Dropdown />
        </div>
      </AppBar>
    </Box>
  );
}
