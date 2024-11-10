import React, { useState } from "react";
import "./styles.css";
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  IconButton,
  Typography,
  CssBaseline,
  Drawer,
  Box,
  Toolbar,
  List,
  Divider,
  AppBar as MuiAppBar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./components/pages/Home";
import Search from "./components/layout/search";
import Clickables from "./components/pages/Criteria/Clickables/Clickables";
import Context from "./components/pages/Criteria/Context/Context";
import Carousels from "./components/pages/Criteria/Carousels/Carousels";
import Forms from "./components/pages/Criteria/Forms/Forms";
import Document from "./components/pages/Criteria/Document/Document";
import Errors from "./components/pages/Criteria/Errors/Errors";
import Graphics from "./components/pages/Criteria/Graphics/Graphics";
import Keyboard from "./components/pages/Criteria/Keyboard/Keyboard";
import Navigation from "./components/pages/Criteria/Navigation/Navigation";
import Readability from "./components/pages/Criteria/Readability/Readability";
import Headings from "./components/pages/Criteria/Headings/Headings";
import Tables from "./components/pages/Criteria/Tables/Tables";
import KeyboardRoutes from "./components/pages/Criteria/Keyboard/KbruleRoutes";
import FormruleRoutes from "./components/pages/Criteria/Forms/rules/FormruleRoutes";
import ClickableruleRoutes from "./components/pages/Criteria/Clickables/rules/ClickableruleRoutes";
import AllRulesWithRoutes from "./components/pages/Criteria/AllRulesLinks";
import ListRoutes from "./routes/routes";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 3),
  ...theme.mixins.toolbar,
}));

export default function App() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{ pr: 3 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{
              marginRight: 3,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard - {capitalizeFirstLetter(pathnames.join(" / "))}
          </Typography>
          <IconButton color="inherit">
            <Search />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            ...(open && {
              width: (theme) => theme.spacing(9),
              overflowX: "hidden",
              transition: (theme) =>
                theme.transitions.create("width", {
                  easing: theme.transitions.easing.easeIn,
                  duration: theme.transitions.duration.leavingScreen,
                }),
            }),
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          padding: (theme) => theme.spacing(3),
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Routes>
            <Route index element={<Home navigate={navigate} title="Home" />} />
            <Route path="/rules/*" element={<ListRoutes />} />
            <Route path="/*" element={<AllRulesWithRoutes navigate={navigate} />} />
            <Route
              path="/clickables"
              element={<Clickables navigate={navigate} title="Clickables" />}
            />
            <Route
              path="/context"
              element={<Context navigate={navigate} title="Context" />}
            />
            <Route
              path="/headings"
              element={<Headings navigate={navigate} title="Headings" />}
            />
            <Route
              path="/document"
              element={<Document navigate={navigate} title="Document" />}
            />
            <Route
              path="/errors"
              element={<Errors navigate={navigate} title="Errors" />}
            />
            <Route
              path="/forms"
              element={<Forms navigate={navigate} title="Forms" />}
            />
            <Route
              path="/graphics"
              element={<Graphics navigate={navigate} title="Graphics" />}
            />
            <Route
              path="/keyboard"
              element={<Keyboard navigate={navigate} title="Keyboard" />}
            />
            {KeyboardRoutes}
            {FormruleRoutes}
            {ClickableruleRoutes}
            <Route
              path="/navigation"
              element={<Navigation navigate={navigate} title="Navigation" />}
            />
            <Route
              path="/readability"
              element={<Readability navigate={navigate} title="Readability" />}
            />
            <Route
              path="/tables"
              element={<Tables navigate={navigate} title="Tables" />}
            />
          </Routes>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
