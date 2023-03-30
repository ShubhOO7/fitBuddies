const Cart = require("../model/Cart");


const addToCart = async(req, res, next) => {
    // console.log("In cart Db");
        // console.log(req.body);
        
        const { name, EmailUsed, price , description , count , id , img ,link } = req.body;
        
        if (!name || !EmailUsed || !price || !id || !img) {
            // console.log(email);
            res.status(422).json({ error: "Error while updating the Cart" });
            return ;
        }
        try {
            const preuser = await Cart.findOne({email : EmailUsed });;
            // console.log(preuser.list[0].items[0].count);
            let k = 0 ;
            if (preuser) {
                // console.log("preuserKaEmail : " + email);
                // console.log(req.body);
                const preuserKaID = await Cart.findOne({email : EmailUsed , list : {$elemMatch: {id : id } }});
                // console.log("preuserKaID");
                // console.log(preuserKaID);
                if(!preuserKaID){
                    const filter = { email: EmailUsed };
                    const update = {
                      $push: {
                        list: {
                          id: id,
                          items: {
                            name: name ,
                            price: price,
                            description: description,
                            quantity: count + 1,
                            img: img ,
                            link : link 
                          }
                        }
                      }
                    }

                    const a = Cart.findOneAndUpdate(filter, update, { new: true }).then((result) => {
                        // console.log(result);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                    // console.log(a);

                }else{
                    const query = { email: EmailUsed , 'list.id': id  };
                    const update = { $inc: { 'list.$.items.$[item].quantity': 1 } };
                    const options = { arrayFilters: [{ 'item.name': name }] };

                    const b = await Cart.findOneAndUpdate(query, update , options);
                    // console.log(b);
                }
                
            } else {
                const finalCart = new Cart({
                    email : EmailUsed,
                    list : [
                      {
                        id : id,
                        items: [
                          { name : name , description : description , quantity : 1, price : price , img : img , link : link},
                        ]
                      },
                    ]
                  });
                const storeData = await finalCart.save();

                res.status(201).json({ status: 201, storeData })
            }
    
        } catch (error) {
            console.log(error);
            res.status(422).json(error);
            console.log("add cart catch block error");
        }
}
const updateCart = async(req, res, next) => {
    // console.log("In cart Db");
        // console.log(req.body);
        const email = req.body.EmailUsed;
        const newList = req.body.ProductToDeleted;
        // console.log(newList[0].id);

        if (!email || !newList[0].id) {
            res.status(422).json({ error: "Error while updating the Cart" })
        }else{
            const cart = await Cart.findOneAndUpdate(
                { email: email },
                { $pull: { list: { id: newList[0].id} } },
                { new: true } // Return the updated cart
              );
            res.status(201).json({status:201 , message: "Updated Successfully"});
        }
}
const getCart = async (req, res) => {
    // console.log(req.body);
    try {
       const cartValid = await Cart.find({email : "abc@gmail.com"});
        if(cartValid){
            // console.log(cartValid);
            res.status(201).json({status:201,cartValid})
        }
    } catch (error) {
        res.status(401).json(error);
        console.log(error);
        console.log("catch block");
    }
}

const deleteFromCart = async (req, res) => {
// console.log(req.body);
    try {
        const cartValid = await Cart.deleteOne({email : "abc@gmail.com"});
         if(cartValid){
             res.status(201).json({status:201,cartValid})
         }
     } catch (error) {
         res.status(401).json(error);
         console.log(error);
         console.log("delete cart catch block");
     }
}
exports.addToCart = addToCart ;
exports.getCart = getCart ;
exports.updateCart = updateCart ;
exports.DeleteFromCart = deleteFromCart ;