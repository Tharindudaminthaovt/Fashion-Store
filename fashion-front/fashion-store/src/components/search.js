import React, { useState } from 'react';
import axios from 'axios';
import Itemcard from './product/itemcard';
import { useNavigate } from 'react-router-dom';
import 'animate.css';

export default function Search() {
    const [category, setCategory] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [value, setValue] = useState('');

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError('');

            // Send a GET request to the search endpoint with the category as a query parameter
            //const response = await axios.get(`http://localhost:5000/api/items/search?category=${category}`);
            //setItems(response.data);

            
            
                navigate(`http://localhost:5000/api/items/search-results/${category}`);
        
            setLoading(false);
        } catch (err) {
            setError('Something went wrong. Please try again.');
            setLoading(false);
        }
    };
    const handleClick = ( ) => {
        navigate('/')
    }

    return (
        <div className="container-dash" style={{width:'100%',justifyContent:'center',display:'flex'}}>

            
            {/* <div className="d-flex m-0 " > */}
                {/* <input
                style={{width:"700px", height:"50px", marginTop:"50px", marginLeft:"170px"}}
                    type="text"
                    className="form-control w-50"
                    placeholder="Search by category..."
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button className="btn btn-primary ml-2 custom-margin" 
                style={{marginLeft:"10px", height:"50px", marginTop:"50px"}}
                onClick={handleSearch}>
                    Search
                </button> */}
            

          
               
        {/* </div> */}
        <h2 className='lete  animate__animated animate__pulse' style={{fontWeight:"400",background:'#363636',cursor:'pointer',borderRadius:'6px',padding:'50px'}} onClick={handleClick}>Explore Latest Items</h2>
        </div>
    );
}
