import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  InputBase,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const StyledSearchBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  padding: theme.spacing(0.5, 2),
  gap: theme.spacing(1),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  fontSize: "1rem",
  color: theme.palette.text.primary,
}));

const StyledDropdown = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 1,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
}));

const SearchComponent = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(query.length > 0);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowDropdown(false);
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <StyledSearchBar>
        <SearchIcon color="action" />
        <StyledInputBase
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(searchQuery.length > 0)}
          aria-label="Search"
        />
        {searchQuery && (
          <IconButton onClick={handleClearSearch} size="small">
            <ClearIcon />
          </IconButton>
        )}
      </StyledSearchBar>

      <AnimatePresence>
        {showDropdown && (
          <StyledDropdown
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <List>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <ListItem
                    key={item._id.$oid}
                    component={Link}
                    to={`/${item.criteria}/${item.route}`}
                    button
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
                // Fallback Message for No Results
                <ListItem>
                  <ListItemText
                    primary="No results found"
                    primaryTypographyProps={{
                      align: "center",
                      color: "textSecondary",
                      fontWeight: "bold",
                    }}
                  />
                </ListItem>
              )}
            </List>
          </StyledDropdown>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SearchComponent;