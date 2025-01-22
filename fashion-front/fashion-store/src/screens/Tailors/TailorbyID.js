import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { getTailorById, updateTailor } from '../../actions/tailoractions';

const SingleTailorPage = () => {
  const { id } = useParams();
  const [tailor, setTailor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch(); // Initialize dispatch
  
  /*const { loading: updateLoading, success, error: updateError } = useSelector(
    (state) => state.updateTailor
  );*/
  useEffect(() => {
    console.log('Extracted ID from URL:', id);
    const fetchTailor = async () => {
      try {
        const data = await getTailorById(id);
        if (data) {
          setTailor(data);
        } else {
          setError('Tailor not found');
        }
      } catch (err) {
        setError('Error fetching tailor details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTailor();
    }
  }, [id]);

  useEffect(() => {
    const ws = new WebSocket('ws://your-websocket-server-url');
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connection established');
      ws.send(JSON.stringify({ type: 'subscribe', tailorId: id }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('WebSocket message received:', message);

      if (message.type === 'update' && message.tailorId === id) {
        setTailor((prev) => {
          const updated = { ...prev, ...message.data };
          console.log('Updated tailor state:', updated);
          return updated;
        });
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [id]);

  const handleSave = async () => {
    try {
      if (tailor) {
        dispatch(updateTailor(id, tailor)); // Use dispatch with updateTailor action
        setSuccess(true);

        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: 'update', tailorId: id, data: tailor }));
        }
        alert('Tailor details updated successfully!');
      }
    } catch (err) {
      setError('Error updating tailor details.');
      alert('Failed to update tailor details. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-700 text-xl p-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center text-lg p-5">{error}</div>;
  }

  return (
<div className=" min-h-screen p-8" style={{ marginTop: "150px" }}>
  {success && (
    <p className="bg-green-100 text-green-700 p-3 rounded-lg text-center mb-5">
      Details updated successfully!
    </p>
  )}
  <div className="bg-white shadow-lg p-8 rounded-lg max-w-3xl mx-auto" style={{width:'80%',borderRadius:'10px',marginBottom:'50px'}}>
   
    <h2 className="text-xl font-bold text-center mb-8" style={{paddingTop:'30px'}}>Tailor Details</h2>
    <img
      src={tailor.image}
      height="200px"
      alt="Tailor"
      className="w-full h-64 object-cover rounded-lg mb-4 flex items-center"
      placeholder=""
    />
    <div className="mb-4  items-center"> {/* Increased space between fields */}
      {/* Name Field */}
      <div className="mb-4 flex items-center">
        
        <input
          type="text"
          value={tailor.name}
          onChange={(e) => setTailor({ ...tailor, name: e.target.value })}
          className="border border-gray-300 rounded-lg flex-grow p-3 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter name"
        />
      </div>

      {/* Email Field */}
      <div className="mb-4 flex items-center">
       
        <input
          type="email"
          value={tailor.email}
          onChange={(e) => setTailor({ ...tailor, email: e.target.value })}
          className="border border-gray-300 rounded-lg flex-grow p-3 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email"
        />
      </div>

      {/* Category Field */}
      <div className="mb-4 flex items-center">
        
        <input
          type="text"
          value={tailor.category}
          onChange={(e) => setTailor({ ...tailor, category: e.target.value })}
          className="border border-gray-300 rounded-lg flex-grow p-3 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter category"
        />
      </div>

      {/* Description Field */}
      <div className="mb-4 flex items-center">
      
        <textarea
          value={tailor.description}
          onChange={(e) => setTailor({ ...tailor, description: e.target.value })}
          className="flex-grow px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          style={{ height: "2.5rem" }} // Ensures the height matches input fields
          placeholder="Enter description"
        />
      </div>
      <div className="mb-4 flex items-center">
        
        <input
          type="text"
          value={tailor.speciality}
          onChange={(e) => setTailor({ ...tailor, speciality: e.target.value })}
          className="border border-gray-300 rounded-lg flex-grow p-3 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter category"
        />
      </div>
      <div className="mb-4 flex items-center">
        
        <input
          type="text"
          value={tailor.targetmarget}
          onChange={(e) => setTailor({ ...tailor, targetmarget: e.target.value })}
          className="border border-gray-300 rounded-lg flex-grow p-3 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter category"
        />
      </div>
      <div className="mb-4 flex items-center">
        
        <input
          type="text"
          value={tailor.image}
          onChange={(e) => setTailor({ ...tailor, image: e.target.value })}
          className="border border-gray-300 rounded-lg flex-grow p-3 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter category"
        />
      </div>
    </div>
    {/* Button with spacing */}
    <div className="mt-8"> {/* Margin added above button */}
      <button
        onClick={handleSave}
        className="w-full bg-blue-500 font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        style={{margin:'30px 10px',backgroundColor:'#0e0e0eda',width:'200px',borderRadius:'5px',color:'white'}}

     >
        Save
      </button>
    </div>
  </div>
</div>
  );
};

export default SingleTailorPage;