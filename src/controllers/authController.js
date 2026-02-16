import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { prisma } from "../config/db.config.js";
import bcrypt from "bcrypt";



const registerUser = async(req,res)=>{


    // 1) Get user details
    // 2) Validate required fields
    // 3) Check if user already exists
    // 4) hash the password
    // 5) Create user in DB
    // 6) Remove password + refreshToken from response
    // 7) Confirm user created
    // 8) Send response

    //debugging logs
//     if (!req.body) {
//   return res.status(400).json({ message: "Body missing" });
//     }

    // i} get user details from frontend
    const {name, email, password} = req.body;

    //debugging logs
    // console.log("EMAIL VALUE:", email);
    // console.log("EMAIL TYPE:", typeof email);

    // ii} validate the user details
    if(!name || !email || !password){
        throw new apiError(400, "all details are required");
    }

    // iii} check if user already exists
    const existedUser = await prisma.user.findFirst({
        where: {email: email},
    })

    if(existedUser){
        throw new apiError(400, "user already exists");
    }

    // iv} hash the password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);


    // iv} create user in DB
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password : hashpassword
        }
    });

    // viii} send response
    return res.status(201).json(
    new apiResponse(201, "user created successfully", user)
    );


}


export {registerUser};
