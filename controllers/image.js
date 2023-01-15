//image security
const Clarifai = require('clarifai');
const app = new Clarifai.App({
// apiKey: '5811f725850a45738d35b52dfbd00b7f'
apiKey: process.env.API_KEY
});

const handleApiCall = (req,res)=>{
	
app.models.predict(
        {
          id: 'face-detection',
          name: 'face-detection',
          version: "45fb9a671625463fa646c3523a3087d5",
          type: 'visual-detector',
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
