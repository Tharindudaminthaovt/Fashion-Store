import { Button, Grid2, Typography } from "@mui/material";
import React from "react";

const SearchItems = () => {
  return (
    <Grid2
      container
      direction="column"
      sx={{
        width: "30%",
        pr: "5%",
        backgroundColor: "pink",
      }}
    >
      <Grid2
        container
        direction="column"
        sx={{
          backgroundColor: "#eeeeee",
          padding: "24px",
          width: "max-content",
        }}
      >
        {/* //TODO: REFACTOR THIS CARD CAUSE IT ADJUSTS ACCORDING TO THGE DETAILS INSIDE THE CARD */}
        <Typography variant="h4" align="left" mb={2}>
          {/* Order Summary */}
          Search Itemssiy
        </Typography>

        <Typography display="flex" justifyContent="space-between">
          <span>Subtotal</span>
          <span>1500</span>
        </Typography>
        <Typography display="flex" justifyContent="space-between">
          <span>Delivery fee</span>
          <span>1500</span>
        </Typography>
        <Typography display="flex" justifyContent="space-between">
          <span>Discount</span>
          <span>1500</span>
        </Typography>
        <Typography display="flex" justifyContent="space-between">
          <span>Total</span>
          <span>1500</span>
        </Typography>
        <Button variant="contained" color="error" sx={{ mt: 2, p: 2 }}>
          Checkout
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default SearchItems;
