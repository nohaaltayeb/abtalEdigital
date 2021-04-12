const jwt=require('jsonwebtoken');
module.exports={
	verify:async function (req,res,next){
	try{
		if(!req.headers["auth"]){
			throw "3eb kda";
		}
		let token=req.headers['auth'].split('Bearer ');
		console.log(token);
		token=token[1];
		console.log(token);
		let tokenData=await jwt.verify(token,'noha');	
		req.tokenData=tokenData;
		next();
	}
	catch(error){
		console.log(error);
		next(error);
	}
	
}
}
