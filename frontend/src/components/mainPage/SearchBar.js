import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import Dropdown from "./Dropdown";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSearchContext } from "./searchContext";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const handleSearch = (searchTerm, setSearchTerm, checked, setSearchByTag) => {
  setSearchTerm(searchTerm);
  setSearchByTag(checked);
};

export default function SearchBar() {
  const [localSearchTerm, setLocalSearchTerm] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const { setSearchTerm, setSearchByTag } = useSearchContext();
  const navigate = useNavigate();

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
          backgroundColor: "black",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <img src={"/images/ae.png"} className="z-40 w-40" alt="" />
          <Search>
            <IconButton
              size="large"
              aria-label="search"
              color="inherit"
              onClick={() => handleSearch(localSearchTerm, setSearchTerm, checked, setSearchByTag)}
              style={{ cursor: "pointer" }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
            </IconButton>
            <StyledInputBase
              placeholder="Search…"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              inputProps={{ "aria-label": "search" }}
              onKeyUp={onKeyup}
            />
          </Search>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleTagChange}
                sx={{
                  color: 'white',
                  '& .MuiSvgIcon-root': {
                    backgroundColor: 'grey',
                    borderRadius: '50%'
                  },
                  '&.Mui-checked': {
                    color: 'orange',
                  },
                  marginLeft: '30px'
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
