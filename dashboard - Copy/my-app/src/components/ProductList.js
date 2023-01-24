import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

const ProductList = () =>{                           //function to perform loading productlist operation

    const [products ,setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts= async()=>{                      //fetch products from data base on product page 
        let result = await fetch('http://localhost:5000/products',{
           headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
           }
        });
        result = await result.json();
        setProducts(result);
    }
   // console.warn("products" , products);

    const deleteProduct =async (id)=>{                      //delete product from data base
        let result =await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
               }
        });
        result =await result.json();
        if(result){
            getProducts();
        }
    }

    const searchHandle =async (event) =>{                       //use to perform search operation
        let key = event.target.value;
        if(key){
        let result = await fetch(`http://localhost:5000/search/${key}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
               }
        });
        result =await result.json();
        if(result){
            setProducts(result);
        }
    }else{
        getProducts();
    }
    }

    return(
        <div className="product-List">
            <h3>Product List</h3>
            <input className="search-productBox" type="text" placeholder="Search Product"
            onChange={searchHandle}
            />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.length>0 ? products.map((item,index)=>
                <ul key={item._id}>
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li>${item.price}</li>
                    <li>{item.category}</li>
                    <li><button  onClick={()=> deleteProduct(item._id)}>Delete</button>
                    <Link to= {"/update/"+item._id}>Update</Link>
                    </li>
                    
                </ul>
                )
                :
                <h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList;