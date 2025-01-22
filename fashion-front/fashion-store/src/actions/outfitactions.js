import axios from 'axios';



export const fetchOutfits = async (token) => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/outfit/outfit', {
      headers: {
        Authorization: `Bearer ${token}`, // Send the token as Authorization header
      },
    });
    console.log("Fetched outfits data:", response.data); // Log the response to check data
    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching user outfits:', error); // Log the error
    throw new Error("Failed to fetch outfits");
  }
};


export const postOutfit = async (outfitData) => {
  try {
    // Retrieve the token from local storage (or another secure storage method)
    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:5000/api/outfit/outfit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(outfitData),
    });

    if (!response.ok) {
      throw new Error(`Failed to post outfit: ${response.statusText}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error posting outfit:", error); // Log the error
    throw error; // Re-throw the error for further handling
  }
};
