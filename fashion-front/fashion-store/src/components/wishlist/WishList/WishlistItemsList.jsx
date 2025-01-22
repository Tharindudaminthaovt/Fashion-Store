import { Grid2, Typography, CardMedia, Card, Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { formatYearMonth } from "../../../util/datefunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWishList,
  updateWishListItem,
} from "../../../actions/wishlistactions";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

export const WishlistProductsList = ({ loading, wishlistItems, error }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.updateWishlistItemReducer);
  const { success: deleteSucess } = useSelector(
    (state) => state.deleteWishlistReducer || {}
  );

  const { itemId } = useParams();

  const [showMessage, setShowMessage] = useState(false);
  const [showDltMessage, setShowDltMessage] = useState(false);

  useEffect(() => {
    if (success) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
    console.log(success);
  }, [success, deleteSucess]);

  const handleWishlistClick = (id) => {
    navigate(`/wishlist/${id}`);
  };

  const handleDeleteWishlist = (id) => {
    alert("Wishlist Deleted Successfully!")
    dispatch(deleteWishList(id));
    setShowDltMessage(true);
  };

  const addToWishList = (withlistId) => {
    dispatch(
      updateWishListItem(withlistId, {
        items: [
          {
            item: itemId,
            quantity: 1,
          },
        ],
      })
    );
  };

  const handleAddWishlist = () => {
    navigate("/addwishlist"); // Redirect to a page where users can add a new wishlist
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
          Item added to wishlist
        </Alert>
      )}

      {showMessage && (
        <Alert
          variant="success"
          onClose={() => {
            setShowMessage(false);
            setShowDltMessage(false);
          }}
          dismissible
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1050,
            width: "auto",
          }}
        >
          Wishlist Item Deleted!
        </Alert>
      )}

      {/* Add Wishlist Button centered at the top */}
      <Grid2 container justifyContent="center" sx={{ marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddWishlist}>
          Add Wishlist
        </Button>
      </Grid2>

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
                sx={{ minWidth: "90%", width: "90%" }}
              >
                {wishlistItems ? (
                  wishlistItems.map((wishListItem, index) => {
                    return wishListItem && wishListItem.wishlist ? (
                      <Card
                        id={`all_wishlist_item_${index}`}
                        key={index}
                        elevation={1}
                        sx={{
                          display: "flex",
                          width: "-webkit-fill-available",
                          justifyContent: "space-evenly",
                          alignItems: "center", // Ensures vertical alignment
                          backgroundColor: "#eeeeee",
                          padding: "16px",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                        className="wishlist-card"
                      >
                        <CardMedia
                          id={`all_wishlist_item_media_${index}`}
                          className="wishlist-card-img"
                          component="img"
                          image={wishListItem.wishlist.image}
                        />
                        <Typography
                          id={`all_wishlist_item_name_${index}`}
                          alignContent="center"
                        >
                          {wishListItem.wishlist.name}
                        </Typography>
                        <Typography
                          id={`all_wishlist_item_qty_${index}`}
                          alignContent="center"
                        >
                          {wishListItem.items ? wishListItem.items.length : 0}{" "}
                          items
                        </Typography>
                        <Typography
                          id={`all_wishlist_item_created_at_${index}`}
                          alignContent="center"
                        >
                          {formatYearMonth(wishListItem.wishlist.createdAt)}
                        </Typography>
                        <Box sx={{ display: "flex", gap: "8px" }}>
                          <Button
                            id={`wishlist_edit_btn_${index}`}
                            variant="outlined"
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the Card click
                              handleWishlistClick(wishListItem._id);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            id={`wishlist_delete_btn_${index}`}
                            variant="outlined"
                            color="danger"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteWishlist(wishListItem.wishlist._id);
                            }}
                          >
                            Delete
                          </Button>
                          {itemId && (
                            <Button
                              id={`wishlist_add_btn_${index}`}
                              variant="contained"
                              color="primary"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the Card click
                                addToWishList(wishListItem._id);
                              }}
                            >
                              Add
                            </Button>
                          )}
                        </Box>
                      </Card>
                    ) : (
                      <></>
                    );
                  })
                ) : (
                  <></>
                )}
              </Grid2>
            </>
          ))}
      </Grid2>
    </>
  );
};
