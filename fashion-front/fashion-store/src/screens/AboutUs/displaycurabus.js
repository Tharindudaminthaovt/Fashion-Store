import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAboutUsAction } from "../../actions/currentabusactions";

const CurrentAboutUs = () => {
  const dispatch = useDispatch();
  const currentAboutUs = useSelector((state) => state.currentAboutUsReducer?.currentAboutUs || null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentAboutUs = async () => {
      try {
        console.log("Dispatching getCurrentAboutUsAction...");

        // Dispatching the action to fetch the current About Us
        await dispatch(getCurrentAboutUsAction());
      } catch (err) {
        setError(err.message || "Failed to fetch the current About Us.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentAboutUs();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center" style={{ marginTop: "100px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger" style={{ marginTop: "100px" }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center" >
      <div
        className="container mt-5 p-4 shadow"
        style={{ marginTop: "100px",position:'static' }}
      >
        <h2 className="mb-4 mt-4 ">Current About Us</h2>
        <hr/>
        {currentAboutUs ? (
          <div className="about-us-details">
            <h3 className="text-primary">{currentAboutUs.title}</h3>
            <p className="text-muted">{currentAboutUs.description}</p>
            <p>{currentAboutUs.content}</p>
            {currentAboutUs.image && (
              <img
                src={currentAboutUs.image}
                alt={currentAboutUs.title}
                style={{
                  width: "100%",
                  height: "auto",
                  marginTop: "15px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
        ) : (
          <p className="text-warning">No current About Us entry is available.</p>
        )}
      </div>
    </div>
  );
};

export default CurrentAboutUs;
