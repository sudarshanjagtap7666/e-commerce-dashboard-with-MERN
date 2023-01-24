const express = require('express');
require('./db/config');
const User = require("./db/User");
const app = express();
const products = require("./db/Product");
const cors = require('cors');
const Product = require('./db/Product');
const { restart } = require('nodemon');
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';


app.use(express.json());

app.use(cors({origin: true , credentials: true}))

app.post("/register", async (req, resp)=>{              //API for register new user
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{            //apply JWT token on register API
        if(err){
            resp.send({result:'somthing went wrong,please try after some time'});
        }
        resp.send({result, auth : token})
    })
});

app.post("/login", async(req , resp)=>{                 //API for login user
    console.log(req.body)
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{              //apply JWT token on login API
                if(err){
                    resp.send({result:'somthing went wrong,please try after some time'});
                }
                resp.send({user, auth : token})
            })
            
        }else{
            resp.send({result:'no user found'})
        }
    }else{
        resp.send({result:'no user found'})
    }
})

app.post("/add-product",verifyToken, async (req , resp)=>{    //Api for add product
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/products",verifyToken,async (req , resp)=>{    //API for product list
    let products = await Product.find();
    if(products.length>0){
        resp.send(products)
    }
    else{
        resp.send({result: "No Products Found"});
    }
})

app.delete("/product/:id",verifyToken ,async (req , resp)=>{    //API for delete product  
    const result =await Product.deleteOne({_id:req.params.id});
    resp.send(result);
});

app.get("/product/:id",verifyToken, async (req , resp)=>{         //API for get data of single product from product list to update product
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"No record found"})
    }
})

app.put("/product/:id",verifyToken , async(req, resp)=>{        //API for update product information from data base 
    let result = await Product.updateOne(
        {_id: req.params.id},
        {
            $set : req.body
        }
    )
    resp.send(result);
});

app.get("/search/:key",verifyToken, async(req , resp)=>{        //API for perform the search operation
    let result = await Product.find({
        "$or":[
        {name:{$regex:req.params.key}},
        {company:{$regex:req.params.key}},
        {category:{$regex:req.params.key}}
        ]
    });
    resp.send(result);
})


function verifyToken(req ,resp, next){
    let token = req.headers['authorization'];
   if(token){
    token = token.split(' ')[1];
    console.warn("middleware called", token);
    Jwt.verify(token, jwtKey, (err, vallid)=>{
        if(err){
            resp.status(401).send({result : "please provid vallid token with header"})

        }else{
            next();
        }
    })
   }else{
    resp.status(403).send({result : "please add token with header"})

   }
   
    
}

app.listen(5000);