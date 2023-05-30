const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT= 3001;

const { Vonage } = require('@vonage/server-sdk');

const cors = require('cors')
var corsOptions = {
   origin: '*',
   optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// to parse the body of the request which is sent from the frontend
app.use(bodyParser.json())

const vonage = new Vonage({
  apiKey: "b597b402",
  apiSecret: "NzzOrQD1dLOHffwr"
});

mongoose.connect('mongodb+srv://jammal:bombom@cluster0.gufyvhg.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const itemSchema =mongoose.Schema( { name:String,  
    description:String,
    mobile: Number,})

const Item = mongoose.model('Item',itemSchema);

const validateNumber = async (number) => {
    const resp = await vonage.numberInsights.basicLookup(number);
    return resp
}
app.post('/validate', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(await validateNumber(req.body.number));
});

app.post('/add', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

   const isValid= await validateNumber(req.body.mobile)

   if(isValid.status_message==='Success'){
    const addedItem = await Item.create({
        name:req.body.name,
        description:req.body.description,  
        mobile:req.body.mobile,
    })
    res.json('Item added');  
   }
   else{
         res.json('Invalid Number')
   }
    
});

app.post('/update', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let valid = false;
    const isValid= await validateNumber(req.body.updatedMobile)
    if(isValid.status_message==='Success'){
     valid = true
    }
    console.log(req.body)
    if(req.body.updatedName.length>0){
        const updatedItem = await Item.updateOne({_id:req.body.id},{
            name:req.body.updatedName,
            description:req.body.updatedDescription, 
            mobile:req.body.updatedMobile,
        })
    }
   
            if(valid){
                res.json('Item updated'); 
            } 
            else{
                        res.json('Invalid Number')
            }
});

app.delete('/delete', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
   const deletedItem = await Item.deleteOne({_id:req.body.id}).exec()
    res.json('Item deleted');  
});

app.get('/all-items', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
   const items = await Item.find().exec()
    res.json(items);  
});
app.listen(PORT || process.env.PORT, () => {
    console.log('server started '+PORT);
});