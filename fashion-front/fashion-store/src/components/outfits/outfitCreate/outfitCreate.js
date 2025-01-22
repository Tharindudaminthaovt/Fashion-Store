import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import "../outfits.scss";
import Item from "../../shared/item/item";
import { useDispatch, useSelector } from "react-redux";
import { createOutfit, updateOutfit } from "../../../actions/outfitsActions";
import { useNavigate } from "react-router-dom";

const OutfitCreate = ({
  selectedItems,
  wantToHideEmptyBoxes = false,
  editItem = null,
}) => {
  const {
    register,
    handleSubmit,
    setValue, // Allows setting default values programmatically
    formState: { errors },
  } = useForm();
  const [fselectedItems, setfSelectedItems] = useState(selectedItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, loading, error } = useSelector(
    (state) => state.outfitReducer
  );
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (success) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate("/outfits");
      }, 3000);
    }
    console.log(success);
  }, [success]);

  useEffect(() => {
    if (!error) {
      setTimeout(() => {
        //navigate("/outfits");
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    setfSelectedItems(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    if (editItem) {
      setValue("name", editItem.name || "");
      setValue("occasion", editItem.occasion || "");
      setValue("description", editItem.description || "");
    }
  }, [editItem, setValue]);

  const onSubmit = (data) => {
    if (editItem == null) {
      console.log(fselectedItems);
      const outfitData = {
        ...data,
        items: fselectedItems.map((item) => ({
          itemName: item.name,
          itemId: item._id,
          itemImage: item.image,
        })),
      };

      dispatch(createOutfit(outfitData));
    } else {
      const outfitData = {
        ...data,
        items: editItem.items.map((item) => ({
          itemName: item.name,
          itemId: item._id,
          itemImage: item.image,
        })),
      };

      dispatch(updateOutfit(editItem._id, outfitData));
    }
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
          {!wantToHideEmptyBoxes
            ? "Outfit created successfully!"
            : "Outfit updated successfully!"}
        </Alert>
      )}

      {error && (
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
          {error}
        </Alert>
      )}

      {loading && (
        <div className="spinner-overlay">
          <Spinner
            animation="border"
            variant="light"
            role="status"
            className="spinner-size"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      <Form onSubmit={handleSubmit(onSubmit)} id="OutfitCreate">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            {...register("name", { required: "Name is required" })}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Occasion</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter occasion"
            {...register("occasion", { required: "Occasion is required" })}
            isInvalid={!!errors.occasion}
          />
          <Form.Control.Feedback type="invalid">
            {errors.occasion?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            {...register("description", {
              required: "Description is required",
            })}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Grid area */}
        {!wantToHideEmptyBoxes && (
          <div className="grid-container d-flex">
            {[...Array(6)].map((_, index) => (
              <div className="box" key={index}>
                {/* Display the item if available for the current box index */}
                {fselectedItems[index] && <Item item={fselectedItems[index]} />}
              </div>
            ))}

            {/* Handle additional selected items beyond the 6th box */}
            {fselectedItems.slice(6).map((item, index) => (
              <div className="box" key={index + 6}>
                <Item item={item} />
              </div>
            ))}
          </div>
        )}

        {editItem !== null && (
          <div className="grid-container d-flex">
            {editItem.items.map((item, index) => {
              var it = {
                _id: item.itemId,
                name: item.itemName,
                image: item.itemImage,
              };
              return (
                <div className="box" key={index}>
                  <Item item={it} />
                </div>
              );
            })}
          </div>
        )}

        <Button variant="primary" type="submit" className="mt-3">
          {!wantToHideEmptyBoxes ? "Save Outfit" : "Update Outfit"}
        </Button>
      </Form>
    </>
  );
};

export default OutfitCreate;
