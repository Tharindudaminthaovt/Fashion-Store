import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAlltailors } from '../../actions/tailoractions'; // Replace with your action to fetch all tailors
import io from 'socket.io-client';

const TailorShowcase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tailors, loading, error } = useSelector((state) => state.tailors); // Adjust state path if needed
  const socket = io('http://localhost:5000');
  const [socketTailors, setSocketTailors] = useState([]);

  useEffect(() => {
    // Dispatch the action to fetch all tailors
    dispatch(getAlltailors());

    // Socket setup
    socket.on('createTailor', (newTailor) => {
      dispatch({ type: 'CREATE_TAILOR', payload: newTailor });
    });

    socket.on('updateTailor', (updatedTailor) => {
      dispatch({ type: 'UPDATE_TAILOR', payload: updatedTailor });
    });

    socket.on('deleteTailor', (deletedTailor) => {
      dispatch({ type: 'DELETE_TAILOR', payload: deletedTailor._id });
    });

    // Cleanup socket listeners on unmount
    return () => {
      socket.off('createTailor');
      socket.off('updateTailor');
      socket.off('deleteTailor');
    };
  }, [dispatch]);

  const combinedTailors = [
    ...tailors,
    ...socketTailors.filter(
      (socketTailor) => !tailors.some((tailor) => tailor._id === socketTailor._id)
    ),
  ];

  return (
    <div className="bg-blue-900 min-h-screen p-5" >
      <h1 className="text-center text-white text-3xl font-bold mb-6" style={{marginTop:'50px'}}>Meet Our Tailors</h1>
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div style={{justifyItems:'center',marginTop:'50px'}}>
          {combinedTailors.map((tailor) => (
            <div key={tailor._id} className="bg-white p-4 rounded-lg shadow-lg"  style={{width:'80%',marginBottom:'20px',borderRadius:'10px',justifyItems:'center',backgroundColor:'green'}}>
              <img
              height="200px"
                src={tailor.image}
                alt="Tailor"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">{tailor.name}</h2>
              <p className="text-gray-600 text-sm " style={{display:'flex',justifyContent:'space-between',textAlign:'start',width:"40%",border:'1px solid #363636',borderRadius:'5px',padding:'5px'}}>
                <strong style={{marginRight:'70px'}}>Email:</strong> {tailor.email}
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
              <button style={{backgroundColor:"#313130",color:'white',width:'120px',padding:'4px',borderRadius:'5px'}} onClick={() => navigate(`/place-order/${tailor._id}`)}>Create Order</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TailorShowcase;
