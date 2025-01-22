import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid2, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { placeOrder, getTailorById } from "../../actions/customerorderactions";
import { Alert } from "react-bootstrap";

const PlaceOrderForm = () => {
  const { tailorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);

  const { success, loading, error } = useSelector(
    (state) => state.placeOrderReducer
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: tailor, error: getTailerByIdError } = useSelector(
    (state) => state.placeOrderGetTailorReducer
  );

  useEffect(() => {
    if (!getTailerByIdError) {
      setTimeout(() => {
        //navigate("/place-orders");
      }, 3000);
    }
  }, [getTailerByIdError]);

  useEffect(() => {
    if (success) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        // navigate("/place-orders");
      }, 3000);
    }
    console.log(success);
  }, [success]);

  const onSubmit = (data) => {
    dispatch(
      placeOrder({
        customerName: tailor.name,
        customerEmail: tailor.email,
        order: data.order,
        image: data.image,
        description: data.description,
        tailorId: tailorId,
      })
    );
  };

  useEffect(() => {
    if (tailorId) {
      dispatch(getTailorById(tailorId));
    }
  }, [dispatch, tailorId]);

  //Navigate to another page when the wishlist is added successfully
  useEffect(() => {
    if (success) {
      navigate("/place-orders");
    }
  }, [success, navigate]);

  return (
    <>
      {success && (
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
          Order Placed Successfully
        </Alert>
      )}
      {getTailerByIdError && (
        <Alert
          variant="danger"
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
          {getTailerByIdError}
        </Alert>
      )}
      <Grid2
        container
        id="add_order_grid"
        sx={{
          height: "100vh", // Full viewport height
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          marginTop: "40px",
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
              {/* Order Field */}
              <Grid2 item xs={12}>
                <TextField
                  label="Order"
                  fullWidth
                  {...register("order", { required: "Order is required" })}
                  error={!!errors.order}
                  helperText={errors.order?.message}
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

              {/* Description Field */}
              <Grid2 item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid2>

              {/* Loading, Error, Success Messages */}
              {loading && (
                <Typography id="add_order_loading" pl={1}>
                  Loading...
                </Typography>
              )}
              {error && (
                <Typography id="add_order_error" color="error" pl={1}>
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
                  Add Order
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Grid2>
      </Grid2>
    </>
  );
};

export default PlaceOrderForm;
