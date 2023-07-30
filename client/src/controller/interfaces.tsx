export interface FormDataLogin{
    username?:string;
    email?:string;
    password:string;
}
export interface FormDataRegister{
    username?:string;
    email:string;
    password_1:string;
    password_2:string;
}
export interface User{
    username:string;
    email:string;
    phone:string;
    aboutMe:string;
    isOnline:boolean;
    password:string;
    contacts:{
        email:string;
    }[]
  }
  