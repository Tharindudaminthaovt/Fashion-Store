import { Box, CardContent, CardMedia, Grid2, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptOrderById,
  getAllOrders,
} from "../../actions/customerorderactions";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PlaceOrderItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  var userrol

  if (userData) {
    const user = JSON.parse(userData);
    userrol = user.role;
  }else{
    userrol = "user";
  }

  const {
    success: getAllOrdersSuccess,
    loading,
    error,
    data,
  } = useSelector((state) => state.getAllOrdersReducer);

  const { success: acceptSuccess } = useSelector(
    (state) => state.acceptOrderReducer
  );

  const onAccept = (data) => {
    dispatch(acceptOrderById(data));
  };

  const onEdit = (data) => {
    navigate(`/edit-orders/${data}`);
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch, acceptSuccess]);

  return (
    <Grid2 id="all_orders_grid" sx={{ mt: "65px", marginTop: "100px" }}>
      <Grid2
        id="all_wishlist_content"
        container
        justifyContent="center"
        sx={{ paddingBottom: "5px" }}
      >
        {!loading &&
          (error ? (
            <Grid2
              id="all_wishlist_error_grid"
              container
              direction="column"
              sx={{ backgroundColor: "burlywood" }}
            >                                              
              <Typography id="all_wishlist_error_text">
                Something went wrong!
              </Typography>
              <Typography
                id="all_wishlist_error"
                sx={{ backgroundColor: "burlywood" }}
              >
                {error}
              </Typography>
            </Grid2>
          ) : (
            <>
              <Grid2
                id="all_wishlist_item_container"
                container
                spacing={2}
                // sx={{ minWidth: "90%", width: "90%",backgroundColor:'pink' }}
                sx={{backgroundColor:'white'}}
              >
                {data &&
                  data.map((item, index) => {
                    return (
                      <div style={{backgroundColor:'white',padding:'10px'}}>
                      <Card
                        key={index}
                        style={{width: "250px",
                          height:"350px",borderRadius:'5px'}}
                          
                        sx={{
                        
                          margin: "auto",
                          mt: 4,
                          boxShadow: 3,
                          
                        }}
                      >
                        <Box onClick={() => console.log("Show details")}>
                          <CardMedia
                            component="img"
                            height="200px"
                            image={
                              "https://substackcdn.com/image/fetch/w_848,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc5873f69-1bb2-4056-94fa-a4b100d0e428_800x1200.png"
                            }
                            alt={item.name}
                          />
                          <CardContent sx={{backgroundColor:'white',borderRadius:'5px'}}>
                            <Typography>{item.customerName}</Typography>
                            <Typography>{item.customerEmail}</Typography>
                            <Typography>{item.order}</Typography>
                            <Typography>{item._id}</Typography>
                          </CardContent>
                        </Box>
                        <CardContent>
                          <Box display="flex" justifyContent="center" mt={2} >
                            {userrol === "admin" &&
                              (item.accepted ? (
                                <Button
                                  variant="contained"
                                  color="success"
                                  onClick={() => {}}
                                  disabled={true}
                                >
                                  SUCCESS
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => onAccept(item._id)}
                                >
                                  Accept
                                </Button>
                              ))}
                            {userrol === "user" &&
                              (item.accepted ? (
                                <Button
                                  variant="contained"
                                  color="success"
                                  onClick={() => {}}
                                  disabled={true}
                                >
                                  ACCEPTED
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => onEdit(item._id)}
                                >
                                  CHANGE
                                </Button>
                              ))}
                          </Box>
                        </CardContent>
                      </Card>
                      </div>
                    );
                  })}
              </Grid2>
            </>
          ))}
      </Grid2>
    </Grid2>
  );
};

export default PlaceOrderItemList;
