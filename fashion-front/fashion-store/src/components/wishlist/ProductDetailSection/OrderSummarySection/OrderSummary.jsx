import { Button, Grid2, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ itemTypes, itemCount, total }) => {
  const navigate = useNavigate()

  const handlePlaceOrder = () => {
    navigate("/payment")
  }

  return (
    <Grid2
      container
      direction="column"
      sx={{
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
        <Typography variant="h4" align="left" mb={2}>
          Order Summary
        </Typography>

        <Typography display="flex" justifyContent="space-between">
          <span>Item Types</span>
          <span>{itemTypes}</span>
        </Typography>
        <Typography display="flex" justifyContent="space-between">
          <span>Item Count</span>
          <span>{itemCount}</span>
        </Typography>

        {/* <Typography display="flex" justifyContent="space-between">
          <span>Discount</span>
          <span>1500</span>
        </Typography> */}
        <Typography display="flex" justifyContent="space-between">
          <span>Total</span>
          <span>LKR {total}/=</span>
        </Typography>
        <Button variant="contained" color="error" sx={{ mt: 2, p: 2 }} onClick={handlePlaceOrder}>
          Checkout
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default OrderSummary;
