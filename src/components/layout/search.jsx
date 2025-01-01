import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { InputBase, List, ListItem, ListItemText, Typography, Paper, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom"; // Import React Router's Link

// Styled Components
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
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
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

const SearchComponent = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter the data based on the search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(query.length > 0); // Show dropdown if there is a query
  };

  const handleResultClick = () => {
    setShowDropdown(false); // Close the dropdown when a result is clicked
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon aria-hidden="true" />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(searchQuery.length > 0)} // Show dropdown on focus
        />
      </Search>
      {showDropdown && (
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1,
            maxHeight: 300,
            overflowY: "auto",
            boxShadow: 3,
          }}
        >
          <List>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <ListItem
                  key={item._id.$oid}
                  component={Link} // Use React Router's Link component
                  to={`/${item.criteria}/${item.route}`} // Dynamically link to the route
                  button
                  onClick={handleResultClick}
                >
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Severity:</strong> {item.severity}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Criteria:</strong> {item.criteria}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No results found" />
              </ListItem>
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchComponent;