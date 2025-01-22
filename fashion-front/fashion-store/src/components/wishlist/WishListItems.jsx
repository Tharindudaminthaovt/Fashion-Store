import { Grid2 } from "@mui/material";
import React, { useEffect } from "react";
import { HeaderTitleSection } from "./HeaderSection/HeaderTitleSection";
import { WishlistProductsList } from "./WishList/WishlistItemsList";
import { useDispatch, useSelector } from "react-redux";
import { getAllWishlistItems } from "../../actions/wishlistactions";

const WishlistItems = () => {
  const dispatch = useDispatch();
  const { success: addItemToWishListSuccess } = useSelector(
    (state) => state.updateWishlistItemReducer
  );

  const wishlistState = useSelector(
    (state) => state.getAllWishlistItemsReducer
  );

  const { success: deleteSuccess } = useSelector(
    (state) => state.deleteWishlistReducer
  );

  const { loading, wishlistItems, error } = wishlistState;

  useEffect(() => {
    dispatch(getAllWishlistItems());
  }, [dispatch, addItemToWishListSuccess, deleteSuccess]);

  return (
    <Grid2 id="all_wishlist_grid" sx={{ mt: "65px" }}>
      <HeaderTitleSection loading={loading} />
      <WishlistProductsList
        loading={loading}
        wishlistItems={wishlistItems}
        error={error}
      />
    </Grid2>
  );
};

export default WishlistItems;
