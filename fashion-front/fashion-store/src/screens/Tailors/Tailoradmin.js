import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  getAlltailors, deleteTailorById } from '../../actions/tailoractions';
import io from 'socket.io-client';

const AdminTailorShowcase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = io('http://localhost:5000');

  const { tailors, loading, error } = useSelector((state) => state.tailors);
  const [socketTailors, setSocketTailors] = useState([]);

  useEffect(() => {
    dispatch(getAlltailors());

    socket.on('createTailor', (newTailor) => {
      dispatch({ type: 'CREATE_TAILOR', payload: newTailor });
    });

    socket.on('updateTailor', (updatedTailor) => {
      dispatch({ type: 'UPDATE_TAILOR', payload: updatedTailor });
    });

    socket.on('deleteTailor', (deletedTailor) => {
      dispatch({ type: 'DELETE_TAILOR', payload: deletedTailor._id });
    });

    return () => {
      socket.off('createTailor');
      socket.off('updateTailor');
      socket.off('deleteTailor');
    };
  }, [dispatch]);

  const handleUpdate = (id) => {
    navigate(`/tailorupdate/${id}`);
  };

  const handleCreateNew = () => {
    navigate('/tailor');
  };

  const deleteTailor = async (id) => {
    if (window.confirm('Are you sure you want to delete this tailor?')) {
      try {
        await dispatch(deleteTailorById(id)); // Assuming deleteTailorById returns a promise
        alert('Tailor deleted successfully!');
      } catch (error) {
        alert('Failed to delete the tailor. Please try again.');
      }
    }
  };

  const combinedTailors = [
    ...tailors,
    ...socketTailors.filter(
      (socketTailor) => !tailors.some((tailor) => tailor._id === socketTailor._id)
    ),
  ];

  return (
    <div className="bg-blue-900 min-h-screen p-5 relative">
      <h1 className="text-center text-white text-3xl font-bold mb-6" style={{marginTop:'80px'}}>Manage Tailors</h1>
      <div className="absolute top-5 right-5">
        <button
          onClick={handleCreateNew}
          className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700"
          style={{marginBottom:'30px',marginTop:'80px'}}
        >
          Create New Tailor
        </button>
      </div>
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div  style={{justifyItems:'center'}}>
          {combinedTailors.map((tailor) => (
            <div key={tailor._id} className="bg-white p-4 rounded-lg shadow-lg "  style={{width:'80%',marginBottom:'20px',borderRadius:'10px',justifyItems:'center'}}>
              <img
              height="200px"
                src={tailor.image}
                alt="Tailor"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center" >
                {tailor.name}
              </h2>
              <p className="text-gray-600 text-sm text-display">
                <strong>Email:</strong> {tailor.email}
              </p>
              <p className="text-gray-600 text-sm text-display">
                <strong>Category:</strong> {tailor.category}
              </p>
              <p className="text-gray-600 text-sm text-display">
                <strong>Description:</strong> {tailor.description}
              </p>
              <p className="text-gray-600 text-sm text-display">
                <strong>Specialty:</strong> {tailor.speciality}
              </p>
              <p className="text-gray-600 text-sm text-display">
                <strong>Target Market:</strong> {tailor.targetmarket}
              </p>
              <p className="text-gray-600 text-sm text-display">
                <strong>Rating:</strong>{' '}
                <span className="font-bold text-green-500">{tailor.rating}/5</span>
              </p>
              <div className="action-buttons flex justify-between mt-4 ">
                <button
                  onClick={() => deleteTailor(tailor._id)}
                  className="px-4 py-2 bg-red-600  rounded hover:bg-red-700 text-xs"
               style={{backgroundColor:'#0e0e0eda',color:'white'}}
               >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(tailor._id)}
                  className="px-4 py-2 bg-blue-600  rounded hover:bg-blue-700 text-xs"
               style={{marginLeft:"30px",backgroundColor:'#0e0e0eda',color:'white'}}
               >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTailorShowcase;