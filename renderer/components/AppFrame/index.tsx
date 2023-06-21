import {
  AccountCircle,
  Close,
  ContactEmergency,
  Forum,
  LibraryBooks,
  MenuBook,
  Menu as MenuIcon,
  Search,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, ReactNode, useState } from "react";
import Location from "../Location";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import UserDrawer from "./UserDrawer";

export type local = {
  text: string;
  href: string;
  iconName: string;
};

type appFrameProps = {
  children?: ReactNode;
  location?: local[];
  title?: string;
  outsideContent?: ReactNode;
  loading?: boolean;
  closeLoading?: () => void;
  showAlert?: boolean;
  alerMessage?: string;
  closeAlert?: () => void;
  bottonAction?: ReactNode[];
};

const listApp = [
  {
    title: "Permissões",
    url: "/permissoes",
  },
];

const listUser = [
  {
    title: "Nome Permissão",
    url: "/login",
  },
];

const AppFrame: FC<appFrameProps> = ({ ...props }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setUserOpen(!userOpen);
            }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "inline-block",
            px: [1],
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Typography variant="button">MENU DA APLICAÇÃO</Typography>
            <IconButton onClick={toggleDrawer}>
              <Close />
            </IconButton>
          </Box>
        </Toolbar>
        <Divider />
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <Tooltip title={"Aventuras"} placement="right">
            <ListItemButton
              onClick={() => {
                router.push("/adventure");
              }}
            >
              <ListItemIcon>
                <MenuBook />
              </ListItemIcon>
              <ListItemText primary={"Aventuras"} />
            </ListItemButton>
          </Tooltip>

          <Tooltip title={"Personagems"} placement="right">
            <ListItemButton
              onClick={() => {
                router.push("/characters/management/new");
              }}
            >
              <ListItemIcon>
                <ContactEmergency />
              </ListItemIcon>
              <ListItemText primary={"Personagens"} />
            </ListItemButton>
          </Tooltip>

          <Tooltip title={"Busca"} placement="right">
            <ListItemButton>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary={"Busca"} />
            </ListItemButton>
          </Tooltip>

          <Tooltip title={"Livros"} placement="right">
            <ListItemButton>
              <ListItemIcon>
                <LibraryBooks />
              </ListItemIcon>
              <ListItemText primary={"Livros"} />
            </ListItemButton>
          </Tooltip>

          <Tooltip title={"Forum"} placement="right">
            <ListItemButton>
              <ListItemIcon>
                <Forum />
              </ListItemIcon>
              <ListItemText primary={"Forum"} />
            </ListItemButton>
          </Tooltip>
        </List>
      </Drawer>

      <UserDrawer
        PaperProps={{
          sx: {
            background: (theme) => theme.palette.primary.light,
          },
        }}
        variant="permanent"
        open={userOpen}
        anchor="right"
      >
        <Toolbar
          sx={{
            display: "block",
            width: "100%",
            px: [1],
          }}
        >
          {/* <Box
            sx={{
              width: "100%",
              height: "65px",
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          ></Box> */}
          <List>
            <ListItemButton
              onClick={() => {
                router.push("/profile");
              }}
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItemButton>
          </List>
        </Toolbar>
      </UserDrawer>

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.secondary.main,
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={1} alignItems="center">
            {props.location && props.location.length > 0 && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Location location={props.location} />
              </Grid>
            )}

            {props.title && (
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <Typography
                  variant="h4"
                  sx={{ color: (theme) => theme.palette.primary.light }}
                >
                  <strong>{props.title}</strong>
                </Typography>
              </Grid>
            )}

            {props.outsideContent && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                {props.outsideContent}
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {props.children}
            </Grid>
            {props.bottonAction && props.bottonAction.length > 0 && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  component="main"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  {props.bottonAction.map(
                    (itenBottonAction) => itenBottonAction
                  )}
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      <Snackbar
        open={props.showAlert}
        autoHideDuration={6000}
        onClose={props.closeAlert}
        message={props.alerMessage}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={props.closeAlert}
            >
              <Close fontSize="small" />
            </IconButton>
          </>
        }
      />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loading ? props.loading : false}
        onClick={() => {
          props.closeLoading && props.closeLoading();
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default AppFrame;
