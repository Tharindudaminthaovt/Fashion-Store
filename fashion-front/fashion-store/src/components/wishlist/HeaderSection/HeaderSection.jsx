import { Grid2, Typography } from "@mui/material";
import React from "react";

export const HeaderSection = ({ loading }) => {
  return (
    <>
      {loading ? (
        <Typography id="wishlist_item_loading" pl={1}>
          loading...
        </Typography>
      ) : (
        <Grid2
          id="wishlist_item_heading_container"
          container
          sx={{ padding: "16px", textAlign: "left" }}
          direction="column"
        >
          <Typography id="wishlist_item_heading" variant="h4">
            Wishlist
          </Typography>
        </Grid2>
      )}
    </>
  );
};
