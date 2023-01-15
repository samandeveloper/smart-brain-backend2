//image security
const Clarifai = require('clarifai');
const app = new Clarifai.App({
	apiKey: process.env.API_KEY
});

const handleApiCall = (req,res)=>{
	
app.models.predict(
        {
          id: process.env.CLARIFAI_ID,
          name: process.env.CLARIFAI_NAME,
          version: process.env.CLARIFAI_VERSION,
          type: process.env.CLARIFAI_TYPE,
        }, req.body.input)
	
      .then(data=>{
      	res.json(data);
      })
      .catch(err=>res.status(400).json('unable to work with API'))
    }

        //image 
	const handleImage = (req,res,db)=>{
	const {id} = req.body;
	db('users')
	 .where('id','=',id)
	// .where({id:'id'})
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{res.json(entries[0]);})

.catch(err=>res.status(400).json('unable to get entries'))
}
module.exports={
	handleImage:handleImage,
	handleApiCall:handleApiCall
};
