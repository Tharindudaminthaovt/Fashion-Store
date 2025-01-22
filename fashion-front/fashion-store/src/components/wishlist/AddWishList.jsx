import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid2, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addWishList } from "../../actions/wishlistactions";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const AddWishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, loading, error } = useSelector(
    (state) => state.addWishlistReducer
  );
  const [showMessage, setShowMessage] = useState(false);

  const userData = localStorage.getItem("user");
  var userid;

  if (userData) {
    const user = JSON.parse(userData);
    userid = user._id;
  } else {
    userid = null;
  }

  useEffect(() => {
    if (success) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        dispatch({ type: "ADD_WISHLIST_DEFAULT" });
        navigate("/wishlist");
      }, 3000);
    }
    console.log(success);
  }, [success]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      addWishList({
        user: userid,
        name: data.name,
        notes: data.notes,
        image: data.image,
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
          {"Wishlist Created Successfully!"}
        </Alert>
      )}
      <Grid2
        container
        id="add_wishlist_grid"
        sx={{
          height: "100vh", // Make the container take full viewport height
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
        }}
      >
        <Grid2
          item
          xs={12}
          sx={{
            width: "600px",
            padding: "20px",
            borderRadius: "20px",
            backgroundColor: "white",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid2 container spacing={2} direction="column">
              {/* Name Field */}
              <Grid2 item xs={12}>
                <TextField
                  label="Name"
                  fullWidth
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid2>

              {/* Notes Field */}
              <Grid2 item xs={12}>
                <TextField
                  label="Notes"
                  fullWidth
                  {...register("notes", { required: "Notes are required" })}
                  error={!!errors.notes}
                  helperText={errors.notes?.message}
                />
              </Grid2>

              {/* Image URL Field */}
              <Grid2 item xs={12}>
                <TextField
                  label="Image URL"
                  fullWidth
                  {...register("image", { required: "Image URL is required" })}
                  error={!!errors.image}
                  helperText={errors.image?.message}
                />
              </Grid2>

              {/* Loading, Error, Success Messages */}
              {loading && (
                <Typography id="all_wishlist_loading" pl={1}>
                  Loading...
                </Typography>
              )}
              {error && (
                <Typography id="all_wishlist_error" color="error" pl={1}>
                  {error}
                </Typography>
              )}

              {/* Submit Button */}
              <Grid2 item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading} // Disable button while loading
                >
                  Add to Wishlist
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Grid2>
      </Grid2>
    </>
  );
};

export default AddWishlist;
