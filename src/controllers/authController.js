import {apiError } from "../utils/apiError.js";
import {prisma} from "../config/db.config.js";



const registerUser = async(req,res)=>{


    // 1) Get user details
    // 2) Validate required fields
    // 3) Check if user already exists
    // 4) Create user in DB
    // 5) Remove password + refreshToken from response
    // 6) Confirm user created
    // 7) Send response

    // i} get user details from frontend
    const {name, email, password} = req.body;

    // ii} validate the user details
    if(!name || !email || !password){
        throw new apiError("all details are required", 400);
    }

    // iii} check if user already exists
    const existedUser = await prisma.user.findUnique({
        where: {email : email}
    })

    if(existedUser){
        throw new apiError("user already exists", 400);
    }

    // iv} create user in DB
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password
        }
    });


}


export {registerUser};