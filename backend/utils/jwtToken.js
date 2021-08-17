// create and send JWT in cookie
const sendToken = (user, res)=>{

    //create a JWT 
    const token = user.getJwtToken();

    // options cookie  
    const options = {
        expires: new Date(
            Date.now()+ process.env.COOKIE_EXPIRES_TIME * 24 * 60* 60* 1000
        ),
        httpOnly: true
    }

    res.cookie('token',token, options).json({
        status:'success',
        user,
        token
    })
}

module.exports = sendToken;