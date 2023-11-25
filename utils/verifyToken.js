import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.accessToken

    if(!token){
        return res.status(401).json({
            success:false,
            message: "You are not Authorized.",      
        })
    }
    // if token exist then verify
    if(token){
        jwt.verify(token, process.env.JWT_KEY, (err, user)=>{
            if(err){
                return res.status(401).json({
                    success:false,
                    message: "Invalid token.",      
                })
            }
        req.user = user
        next()
        })
    
    }
}

// verify user
export const verifyUser = (req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        if(req.user.id === req.params.id || req.user.role === "admin"){
            next()
        }else{
            return res.status(401).json({
                success:false,
                message: "You are not authenticated."
            })
        }
    })

}

// verify admin
export const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        if(req.user.role === "admin"){
            next()
        }else{
           return res.status(401).json({
                success:false,
                message: "You are not authorize."
            })
        }
    })

}