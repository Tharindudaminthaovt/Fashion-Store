import { Button, Grid2, Typography, TextField, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import img1 from "../../../../images/img1.jpg";
import ProductFeatureSelector from "./ProducFeatureSelector.jsx/ProductFeatureSelector";
import OrderSummary from "../OrderSummarySection/OrderSummary";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllitems } from "../../../../actions/itemactions";
import SearchItems from "../../../../components/shared/searchItems/searchItems";
import { formatYearMonth } from "../../../../util/datefunctions";
import {
  updateWishList,
  updateWishListItem,
  getAllWishlistItems,
  deleteWishListItem,
} from "../../../../actions/wishlistactions";
import { Alert } from "react-bootstrap";

export const WishlistProductsList = ({ loading, wishlistItem, error }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { success: updateSuccess, error: updateError } = useSelector(
    (state) => state.updateWishlistReducer
  );
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState(null);

  const { success } = useSelector((state) => state.updateWishlistItemReducer);

  const { success: deleteSuccess } = useSelector(
    (state) => state.deleteWishlistItemReducer
  );

  useEffect(() => {
    if (success) {
      setMessageType("added");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  }, [success]);

  useEffect(() => {
    if (deleteSuccess) {
      setMessageType("deleted");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false)
        
      }, 3000);
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      setMessageType("updated");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  }, [updateSuccess]);

  useEffect(() => {
    dispatch(getAllWishlistItems());
  }, [dispatch, success, deleteSuccess]);

  useEffect(() => {
    dispatch(getAllitems());
  }, [dispatch]);
  useEffect(() => {
    if (wishlistItem) {
      setValue("name", wishlistItem.wishlist.name);
      setValue("notes", wishlistItem.wishlist.notes);
      setValue("createdAt", wishlistItem.wishlist.createdAt);
    }
  }, [wishlistItem, setValue]);

  const onSubmit = (data) => {
    dispatch(
      updateWishList(wishlistItem.wishlist._id, {
        name: data.name,
        notes: data.notes,
      })
    );
  };

  const searchItemsHandler = (result) => {
    console.log(result);
    dispatch(
      updateWishListItem(wishlistItem._id, {
        items: [
          {
            item: result._id,
            quantity: 1,
            notes: wishlistItem.notes,
            rating: result.rating,
          },
        ],
      })
    );
  };

  const getTotal = (items) => {
    return items.reduce((total, product) => {
      if (
        !product ||
        !product.item ||
        !product.item.prices ||
        !product.item.variants
      ) {
        return total + 0;
      }
      const price = product.item.prices[product.item.variants[0]];
      const quantity = product.quantity; // Get quantity
      return total + price * quantity; // Add to total
    }, 0); // Start with a total of 0
  };

  const getItemCount = (items) => {
    return items.reduce((count, product) => {
      return count + product.quantity; // Add to total
    }, 0); // Start with a total of 0
  };

  const handleDeleteItem = (product_id) => {
    console.log("Delete item:", product_id);

    dispatch(
      deleteWishListItem(wishlistItem._id, {
        removeItemId: product_id,
      })
    );
  };

  return (
    <>
      {showMessage && (
        <Alert
          variant="success"
          onClose={() => setShowMessage(false)}
          dismissible
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1050,
            width: "auto",
          }}
        >
          {messageType === "added" && "Added Wishlist Item to the Cart!"}
          {messageType === "deleted" && "Item Removed From the Cart"}
          {messageType === "updated" && "Wishlist Updated Successfully"}
        </Alert>
      )}
      <Grid2 container justifyContent="center" sx={{ paddingBottom: "5px" }}>
        {loading ? (
          <Typography variant="h5">Loading...</Typography>
        ) : error || updateError ? (
          <Grid2
            container
            direction="column"
            sx={{ backgroundColor: "burlywood", p: 2 }}
          >
            <Typography variant="h6">Something went wrong!</Typography>
            <Typography>{error || updateError}</Typography>
          </Grid2>
        ) : (
          <>
            <Grid2 container spacing={2} sx={{ width: "60%" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    label="Name"
                    variant="outlined"
                    {...register("name", { required: true })}
                    disabled={loading}
                    error={!!errors.name}
                    helperText={errors.name && "This field is required"}
                  />
                  <TextField
                    label="Notes"
                    variant="outlined"
                    {...register("notes", { required: true })}
                    disabled={loading}
                    error={!!errors.notes}
                    helperText={errors.notes && "This field is required"}
                  />
                  <TextField
                    label="Created At"
                    variant="outlined"
                    value={
                      wishlistItem &&
                      formatYearMonth(wishlistItem.wishlist.createdAt)
                    }
                    readOnly
                    sx={{
                      backgroundColor: "#f5f5f5",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#f5f5f5",
                        borderColor: "#d3d3d3",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#888",
                      },
                      "& .MuiInputBase-root.Mui-disabled": {
                        WebkitTextFillColor: "#000",
                      },
                    }}
                    disabled
                  />
                </Box>

                <Box
                  sx={{
                    height: "400px", // Set the height of the scrolling container
                    overflowY: "auto", // Enable vertical scrolling
                    display: "flex",
                    flexDirection: "column", // Stack items vertically
                    gap: 2, // Space between items
                    padding: "16px 0", // Padding for the scrolling container
                    backgroundColor: "#f9f9f9",
                    borderRadius: "10px",
                    boxShadow: 3,
                  }}
                  id="box-container"
                >
                  {wishlistItem &&
                    wishlistItem.items?.map((product, index) => (
                      <Grid2
                        container
                        key={index}
                        sx={{
                          width: "100%",
                          justifyContent: "space-evenly",
                          backgroundColor: "#eeeeee",
                          p: 2,
                          m: "16px 2% 16px 0",
                          borderRadius: "10px",
                          cursor: "pointer",
                          boxShadow: 3,
                        }}
                      >
                        <img src={product.image} alt="product" height="150px" />
                        <ProductFeatureSelector product={product} />
                        <Typography align="center">
                          {product.item?.name}
                        </Typography>
                        <Typography align="center">
                          {product.rating} ★
                        </Typography>
                        <Typography align="center">
                          {product.quantity} items
                        </Typography>
                        <Typography align="center">
                          LKR{" "}
                          {!product ||
                          !product.item ||
                          !product.item.prices ||
                          !product.item.variants
                            ? 0
                            : product.item.prices[product.item.variants[0]]}
                          /=
                        </Typography>
                        {/* Delete Button */}
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteItem(product.item?._id)}
                          sx={{ marginTop: "auto" }} // Align button at the bottom
                        >
                          Delete
                        </Button>
                      </Grid2>
                    ))}
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  sx={{ marginTop: 2 }}
                >
                  Save
                </Button>
              </form>
            </Grid2>

            {/* RIGHT-SIDE-ORDER_SUMMARY-SECTION */}
            <Grid2 container direction="column" gap={2}>
              {/* Scrollable Box for SearchItems */}
              <Box
                sx={{
                  maxHeight: "200px", // Maximum height for the SearchItems section
                  height: "200px",
                  width: "390px",
                  overflowY: "auto", // Enable vertical scrolling
                  padding: "0 16px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "10px",
                  boxShadow: 3,
                }}
              >
                <div>{<SearchItems onSelect={searchItemsHandler} />}</div>
              </Box>

              <Box
                sx={{
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "10px",
                  boxShadow: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <OrderSummary
                  itemTypes={wishlistItem ? wishlistItem.items.length : 0}
                  itemCount={
                    wishlistItem ? getItemCount(wishlistItem.items) : 0
                  }
                  total={wishlistItem ? getTotal(wishlistItem.items) : 0}
                />
              </Box>
            </Grid2>
          </>
        )}
      </Grid2>
    </>
  );
};
