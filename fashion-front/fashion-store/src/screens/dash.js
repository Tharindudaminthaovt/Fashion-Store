import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Itemcard from '../components/product/itemcard';


import { getAllitems } from '../actions/itemactions';
import Search from '../components/search';

import Carousel from '../components/carousel';
import SideBar from '../components/sidebar';
import CollectionCard from '../components/collectioncard';
import Footer from '../components/footer/footer';
import SearchItems from "../components/shared/searchItems/searchItems";


export default function Dash() {
 



    return (
        <div>
            <div className='row'>

              
                            <div className='m-3' >
                              
                                <SideBar/>
                                {/* <Carousel/> */}
                                {/* <CollectionCard/> */}
                               
                            {/* <Footer/> */}

                        </div>
                    






            </div>
        </div>
    );
}