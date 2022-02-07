import { Box, IconButton, Stack, SvgIconTypeMap, Typography, styled } from "@mui/material";
import { DefaultTheme } from "@mui/private-theming";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type Stack_navItemProps = {
  theme?: DefaultTheme;
  collapsed: boolean;
  active?: boolean;
};

const Stack_navItem = styled(Stack, {
  shouldForwardProp: (p) => p !== "collapsed" && p !== "active",
})<Stack_navItemProps>((p) => ({
  justifyContent: "left",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#ffffff10",
  },
  "&:active": {
    opacity: "1",
  },
  transition: "400ms ease",
  margin: p.theme.spacing(0.5, 0),
  borderRadius: p.theme.spacing(1),
  padding: 0,
  height: p.collapsed ? "2.5rem" : "auto",
  backgroundColor: p.active ? "#ffffff10" : "transparent",
}));

export const NavItem = (props: {
  children?: React.ReactNode;
  collapsed: boolean;
  icon:
    | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
      })
    | string;
  onClick?: () => void;
  active?: boolean;
}) => {
  return (
    <Stack_navItem
      direction="row"
      onClick={props.onClick}
      active={props.active}
      collapsed={props.collapsed}
    >
      {typeof props.icon === "string" ? (
        <IconButton>
          <Typography color="primary">{props.icon}</Typography>
        </IconButton>
      ) : (
        <IconButton color="primary">{<props.icon />}</IconButton>
      )}

      <Box sx={{ opacity: props.collapsed ? 0 : 1, transition: "opacity 100ms ease-out" }}>
        {props.children}
      </Box>
    </Stack_navItem>
  );
};
