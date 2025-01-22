import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid2, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOrderById,
  updateOrderById,
} from "../../actions/customerorderactions";
import { Alert } from "react-bootstrap";

const EditOrderForm = () => {
  const { orderId } = useParams();
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const {
    success: getOrdryByIdSuccess,
    data: order,
    error: getOrderByIdError,
  } = useSelector((state) => state.getOrderByIdReducer);

  const { success, loading, error } = useSelector(
    (state) => state.updateOrderReducer
  );

  useEffect(() => {
    if (success) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    if (!getOrderByIdError) {
      setTimeout(() => {
        navigate("/place-orders");
      }, 3000);
    }
  }, [getOrderByIdError]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (order) {
      setValue("order", order.order);
      setValue("image", order.image);
      setValue("description", order.description);
    }
  }, [order, setValue]);

  const onSubmit = (data) => {
    console.log(data, order);
    dispatch(
      updateOrderById(orderId, {
        customerName: order.name,
        customerEmail: order.email,
        order: data.order,
        image: data.image,
        description: data.description,
        tailorId: order.tailorId,
      })
    );
    setIsUpdateSuccess(true);
  };

  useEffect(() => {
    if (success && isUpdateSuccess) {
      navigate("/place-orders");
    }
  }, [success, navigate, isUpdateSuccess]);

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
          Successfully Updated the order
        </Alert>
      )}

      {getOrderByIdError && (
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
          {getOrderByIdError}
        </Alert>
      )}

      <Grid2
        container
        id="edit_order_grid"
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
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
                  value={watch("order") || ""}
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
                  value={watch("image") || ""}
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
                  value={watch("description") || ""}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid2>

              {/* Loading, Error, Success Messages */}
              {loading && (
                <Typography id="edit_order_loading" pl={1}>
                  Loading...
                </Typography>
              )}
              {error && (
                <Typography id="edit_order_error" color="error" pl={1}>
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
                  disabled={loading}
                >
                  Update Order
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Grid2>
      </Grid2>
    </>
  );
};

export default EditOrderForm;
