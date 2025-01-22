import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { posttailorData } from "../../actions/tailoractions";

function TailorForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [targetmarket, setTargetmarket] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  // Access state from Redux store
  const { loading, success, error } = useSelector((state) => state.postTailor);

  const handleSubmit =async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      category,
      description,
      speciality,
      targetmarket,
      image,
      rating,
    };

    console.log("Form data:", formData);

    try {
      // Dispatch action to post data
      await dispatch(posttailorData(formData)); // Assuming posttailorData returns a promise
      alert("Tailor data submitted successfully!");
    } catch (error) {
      alert("Failed to submit tailor data. Please try again.");
    }
  };

  return (
<form
  onSubmit={handleSubmit}
  className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
  style={{ marginTop: "100px",width:'60%',borderRadius:'10px',marginBottom:'50px' }}
>
  <h2 className="text-xl font-bold text-center mb-6" style={{marginBottom:'40px',paddingTop:'30px'}}>Tailor Form</h2>
  {loading && <p className="text-blue-500">Submitting...</p>}
  {success && <p className="text-green-500">Submitted successfully!</p>}
  {error && <p className="text-red-500">Error: {error}</p>}

  {/* Name Field */}
  <div className="mb-4 flex items-center">
   
    <input
      type="text"
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
      className="flex-grow px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
      placeholder="Enter name"
    />
  </div>

  {/* Email Field */}
  <div className="mb-4 flex items-center">

    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="flex-grow px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
      placeholder="Enter email"
    />
  </div>

  {/* Category Field */}
  <div className="mb-4 flex items-center">
   
    <input
      id="category"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      required
      className="flex-grow px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
      placeholder="Enter category"
    />
  </div>

  {/* Description Field */}
  <div className="mb-4 flex items-center">
 
  <textarea
    id="description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
    className="flex-grow px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
    style={{ height: "2.5rem" }} // Ensures the height matches input fields
    placeholder="Enter description"
  ></textarea>
</div>


  {/* Speciality Field */}
  <div className="mb-4 flex items-center">
   
    <input
      id="speciality"
      value={speciality}
      onChange={(e) => setSpeciality(e.target.value)}
      className="flex-grow px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
      placeholder="Enter speciality"
    />
  </div>

  {/* Target Market Field */}
  <div className="mb-4 flex items-center">
 
    <input
      id="targetmarket"
      value={targetmarket}
      onChange={(e) => setTargetmarket(e.target.value)}
      className="flex-grow px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
      placeholder="Enter target market"
    />
  </div>

  {/* Image URL Field */}
  <div className="mb-4 flex items-center">
  
    <input
      id="image"
      value={image}
      onChange={(e) => setImage(e.target.value)}
      required
      className="flex-grow px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
      placeholder="Enter image URL"
    />
  </div>

  {/* Rating Field */}
  <div className="mb-4 ">
    <label
      htmlFor="rating"
      className="block text-sm font-medium text-gray-700 mr-4"
    >
      Rating
    </label>
    <input
      type="number"
      id="rating"
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      className="flex-grow px-4 py-2  rounded-md focus:ring focus:ring-blue-300"
      placeholder="Enter rating"
      min="0"
      max="5"
      style={{marginLeft:'10px',border:"1px solid #363636",borderRadius:'5px'}}
    />
  </div>

  <button
    type="submit"
    className="w-full  font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
  style={{margin:'30px 10px',backgroundColor:'#0e0e0eda',width:'200px',borderRadius:'5px',color:'white'}}
  >
    Submit
  </button>
</form>
  );
}

export default TailorForm;