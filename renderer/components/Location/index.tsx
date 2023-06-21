import { Breadcrumbs, Icon, Link } from "@mui/material";
import { FC } from "react";
import { locationProps } from "./types";

const Location: FC<locationProps> = ({ ...props }) => {
  return (
    <Breadcrumbs
      separator={<Icon sx={{ fontSize: 8 }}>circle</Icon>}
      sx={{ color: (theme) => theme.palette.primary.light }}
    >
      {props.location &&
        props.location.map((local, index) => (
          <Link
            key={`breadcrumbs-ident-${index.toString()}`}
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              color: (theme) => theme.palette.primary.light,
            }}
            href={local.href}
          >
            <Icon sx={{ mr: 0.5 }} fontSize="inherit">
              {local.iconName}
            </Icon>
            {local.text}
          </Link>
        ))}
    </Breadcrumbs>
  );
};

export default Location;
