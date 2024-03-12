import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {

    const token = req.headers.authorization || req.cookies;  
    
    if (! token )
    return res.status (400).json({

        message: "No token, authorization denied"

    });
    
    jwt.verify( token, TOKEN_SECRET, (err, user)=> {

        if(err) return res.status(403).json({ message: "invalid token "});

        req.user = user

        next();


    } )

   
}
