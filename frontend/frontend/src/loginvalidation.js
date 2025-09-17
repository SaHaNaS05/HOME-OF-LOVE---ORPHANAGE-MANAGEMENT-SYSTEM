function Validation(values){
let error={}
const email_pattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/
//const password_pattern=/^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

if(values.email === ""){
    error.email="Fill correct email"
}
else if (!email_pattern.test(values.email)){
    error.email="Email Didn't match"
}
else{
    error.email=""
}

if(values.password === ""){
    error.password="Fill correct Password"
}
//else if (!password_pattern.test(values.email)){
 //   error.password="Email Didn't match"
//}
else{
    error.password=""
}
return error;
}

export default Validation;