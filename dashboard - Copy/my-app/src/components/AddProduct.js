import React from 'react';

const AddProduct = ()=>{                        //function to perform add product operation
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [company,setCompany] = React.useState('');
    const [error,setError] = React.useState(false);
    const addProduct = async() => {

        //console.warn(!name);
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        

        //console.warn(name,price,category,company);                  //use to integrate addproduct API
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product',{
        method:"post",
        body:JSON.stringify({name,price,category,company,userId}),
        headers:{
            'Content-Type':'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
    });
    result = await result.json();
    //console.warn(result);
    }


    return(
        <div className='register'>
            <h1>Add Product</h1>
            <input className='inputBox' type='text' placeholder ="Enter Product Name"
            value={name} onChange={(e) => {setName(e.target.value)}}
            />
            {error &&  !name &&<span className='invalid-input'>Enter Valid Name</span>}

            <input className='inputBox' type='text' placeholder ="Enter Product Price"
            value={price} onChange={(e) => {setPrice(e.target.value)}}
            />
            {error &&  !price &&<span className='invalid-input'>Enter Valid Price</span>}

            <input className='inputBox' type='text' placeholder ="Enter Product Category"
            value={category} onChange={(e) => {setCategory(e.target.value)}}
            />
            {error &&  !category &&<span className='invalid-input'>Enter Valid Category</span>}

            <input className='inputBox' type='text' placeholder ="Enter Product Company"
            value={company} onChange={(e) => {setCompany(e.target.value)}}
            />
            {error &&  !company &&<span className='invalid-input'>Enter Valid Company</span>}


            <button className='appbutton' onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;