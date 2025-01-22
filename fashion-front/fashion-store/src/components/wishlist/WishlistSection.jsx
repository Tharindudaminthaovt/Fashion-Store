import { Grid2 } from "@mui/material";
import React from "react";
import { HeaderSection } from "./HeaderSection/HeaderSection";
import { WishlistProductsList } from "./ProductDetailSection/WishlistProductsListSection/WishlistProductsList";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const WishlistSection = () => {
  const { wishlistId } = useParams();

  const wishlistState = useSelector(
    (state) => state.getAllWishlistItemsReducer
  );

  const { loading, wishlistItems, error } = wishlistState;

  return (
    <Grid2
      id="wishlist_item_grid"
      container
      direction="column"
      sx={{ mt: "65px", backgroundColor: "white" }}
    >
      <HeaderSection loading={loading} />
      <WishlistProductsList
        loading={loading}
        wishlistItem={
          wishlistItems && wishlistItems.find((item) => item._id === wishlistId)
        }
        error={error}
      />
    </Grid2>
  );
};

export default WishlistSection;
