import React from "react";
import Itemcard from "./itemcard";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { postProductData } from "../../actions/itemactions";
import { useDispatch } from "react-redux";

function ProductForm() {
  const dispatch = useDispatch(); // Hook to access the dispatch function
  const [variants, setVariants] = useState([{ variant: "", price: "" }]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState("");
  const [targetmarket, setTargetmarket] = useState("");

  // Handler to update variant and price values
  const handleChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  // Handler to add a new variant-price pair
  const addVariant = () => {
    setVariants([...variants, { variant: "", price: "" }]);
  };

  // Handler to remove a variant-price pair
  const removeVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  // Submit the form data
  const handleSubmit = async(e) => {
    e.preventDefault();

    const prices = {};
    variants.forEach((variant) => {
      if (variant.variant && variant.price) {
        prices[variant.variant] = parseFloat(variant.price);
      }
    });

    const formData = {
      name,
      variants: variants.map((v) => v.variant),
      prices,
      description,
      targetmarket,
      category,
      collection,
      image
    };

    console.log("Variants and prices:", variants);
    console.log("Form data to be dispatched:", formData);
    try {
      // Dispatch the action with the form data
      await dispatch(postProductData(formData)); // Assuming postProductData returns a promise
      alert("Product data submitted successfully!");
    } catch (error) {
      alert("Failed to submit product data. Please try again.");
    }
  };

  return (
    // TODO: Add a image URL section to this form.
    <form
      onSubmit={handleSubmit}
      style={{
        paddingTop: "80px",
        marginTop:'100px',
        width: "600px",
        marginLeft: "510px",
        backgroundColor: "white",
        // backgroundColor:"#363636",
        color:"white",
        paddingLeft: "20px",
        paddingRight: "20px",
        borderRadius: "20px",
      }}
    >
      <div className="form-group">
        {/* <label htmlFor="name">Name</label> */}
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control"
          id="name"
          placeholder="Enter name"
        />
      </div>
      <div className="form-group">
        {/* <label htmlFor="category">Category</label> */}
        <input
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="form-control"
          id="category"
          placeholder="Category"
        />
      </div>

      <div className="form-group">
        {/* <label htmlFor="category">Category</label> */}
        <input
          type="text"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="form-control"
          id="image"
          placeholder="Image"
        />
      </div>


      <div className="form-group">
        {/* <label htmlFor="description">Description</label> */}
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-control"
          id="description"
          placeholder="Description"
        />
      </div>
      <div className="form-group">
        {/* <label htmlFor="collection">Collection</label> */}
        <input
          type="text"
          name="collection"
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          required
          className="form-control"
          id="collection"
          placeholder="Collection"
        />
      </div>
      <div className="form-group">
        {/* <label htmlFor="targetmarket">Target Market</label> */}
        <input
          type="text"
          name="targetmarket"
          value={targetmarket}
          onChange={(e) => setTargetmarket(e.target.value)}
          required
          className="form-control"
          id="targetmarket"
          placeholder="Target Market"
        />
      </div>

      {variants.map((item, index) => (
        <div
          key={index}
          className="form-control-variant-price"
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent:'space-between',
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <input
            className="form-control"
            style={{ width: "150px" ,border:"1px solid #363636"}}
            type="text"
            placeholder="Variant (e.g., Color, Size)"
            value={item.variant}
            onChange={(e) => handleChange(index, "variant", e.target.value)}
            required
          />
          <input
            className="form-control"
            style={{ width: "150px", marginLeft: "20px",border:"1px solid #363636" }}
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleChange(index, "price", e.target.value)}
            required
          />
          {variants.length > 1 && (
            <button
              type="button"
              className="btn btn-danger"
              style={{width:'100px'}}
              onClick={() => removeVariant(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
<div style={{display:"flex",justifyContent:"space-between"}}>
      <button
        type="button"
        className="btn btn-primary"
        onClick={addVariant}
        style={{ marginTop: "30px",height:'37.6px' }}
      >
        Add Another Variant
      </button>

      <button
        style={{ marginTop: "30px", marginBottom: "30px" ,width:'173.25px'}}
        type="submit"
        className="btn btn-primary"
      >
        Submit
      </button>
      </div>
    </form>
  );
}

export default ProductForm;
