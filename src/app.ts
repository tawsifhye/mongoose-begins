import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { Schema, model } from 'mongoose';


const app: Application = express();

//using cors
app.use(cors());

//parse data

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req:Request, res:Response) => {
  
  // inserting test  data in DB

  // step:1 creating interface 
  interface IUser{
    id: string;
    role: 'student';
    password: string;
    name: {
      firstName: string;
      middleName?: string;
      lastName: string;
    };
    dataOfBirth?: string;
    gender: 'male'|'female';
    email: string;
    contactNo: string;
    presentAddress: string;
    permanentAddress: string;
  }

  //step:2 create a schema corresponding to document interface 

  const userSchema = new Schema<IUser>({
    id:{
      type:String, 
      required:true,
      unique: true
    },
    role:{
      type: String,
      required: true,
    },
    password:{
      type:String,
      required: true
    },
    name: { 
      firstName:{
        type: String,
        required: true
      },
      middleName:{
        type:String
      },
      lastName:{
        type:String,
        required: true
      }
    },
    dataOfBirth:{
      type: String,
    },
    gender:{
      type: String,
      enum:['male', 'female'],
      required: true
    },
    email:{
      type: String,
      required: true
    },
    contactNo: {
      type: String,
      required: true
    },
    presentAddress:{
      type: String,
      required: true
    },
    permanentAddress:{
      type: String,
      required: true
    } 

  });
  
  // step:3 create a model
  
  const User = model<IUser>('User', userSchema);

  const createUserToDB = async() =>{
    const user = new User({
      id: '777',
      role: 'student',
      password: '123456',
      name: {
        firstName: 'John',
        lastName: 'Doe',
      },
      dataOfBirth: '01/06/1998',
      gender: 'male',
      email: 'abc@testmail.com',
      contactNo: '0911111',
      presentAddress: 'New York',
      permanentAddress: 'Miami',
    });
  
    await user.save();
  }
  createUserToDB();
  
    // res.send('Hello World!')
  });
   


  export default app;