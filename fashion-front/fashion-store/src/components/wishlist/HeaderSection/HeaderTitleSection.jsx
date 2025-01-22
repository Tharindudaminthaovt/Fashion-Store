import { Grid2, Typography } from "@mui/material";
import React from "react";

export const HeaderTitleSection = ({ loading }) => {
  return (
    <>
      {loading ? (
        <Typography id="all_wishlist_loading" pl={1}>
          loading...
        </Typography>
      ) : (
        <Grid2
          id="all_wishlist_heading_container"
          container
          sx={{ padding: "16px", textAlign: "left" }}
          direction="column"
        >
          <Typography id="all_wishlist_heading" variant="h4">
            {/* Wishlist */}
          </Typography>
        </Grid2>
      )}
    </>
  );
};
