import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { addToCart } from '../actions/cartactions';
import { deleteFromCart } from '../actions/cartactions';
import { useNavigate } from 'react-router-dom';
export default function Cartscreen() {
  const cartState = useSelector(state => state.cartReducer);
  const cartItems = cartState.cartItems;
  var subtotal = cartItems.reduce((x,item)=>x+item.price,0)
  const dispatch = useDispatch(addToCart)
  const navigate = useNavigate()
  return (
    <div className='cart' >
      <div className='row justify-content-center' style={{marginTop:"90px",marginBottom:"10px"}}>
        <div className='col-md-5'>
          <h2>My Cart</h2>
          {cartItems.map(item => (
            <div key={item._id} className="cartitem"style={{background:"white" }}>
              <div className='text-left m-1 w-100' style={{background:"white" , margin:"30px"}}>
                <p className='white'>{item.name}[{item.varient}]</p>
                <p className='white'>Price : {item.quantity} * {item.varient} = {item.price}</p>
                <div className='d-flex'>
                <p className='white'>Quantity : </p>
                <i className="fa fa-plus-square" aria-hidden="true" onClick={()=>{dispatch(addToCart(item,item.quantity+1,item.varient))}}></i>
                <b>{item.quantity}</b>
                <i className="fa fa-minus-square" aria-hidden="true"onClick={()=>{dispatch(addToCart(item,item.quantity-1,item.varient))}}></i></div>
              </div>
              <div className='m-1 w-100'>
                <img src={item.image} style={{height:'80px',height:'80px'}}/>
              </div>
              <div >
              
              <button className='btn' onClick={()=>{dispatch(deleteFromCart(item))}}>delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className='col-md-4'>

          <h1>subtotal : {subtotal} /LKR</h1>
          <button className='btn' onClick={() => navigate('/payment')}>pay now</button>
        </div>
      </div>
    </div>
  );
}
