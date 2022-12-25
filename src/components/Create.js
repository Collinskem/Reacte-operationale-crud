import React,{useState} from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";


export default function Create ()  {
    //initialize the state
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [checkbox, setCheckbox] = useState(false)
//validation package react hook form
const { register, handleSubmit, formState: { errors } } = useForm();
const onSubmit =(data)=>{
    console.log(data)
}

const navigate = useNavigate();

//toast notification function
const showToastMessage = () => {
    toast.success('Record Added Successfully !', {
        position: toast.POSITION.TOP_RIGHT
    });
};
const postData =()=>{
    axios.post("https://63a56b292a73744b008d66ef.mockapi.io/fakedata",{
        firstName,lastName,checkbox
    }).then(()=> {
        showToastMessage();
        navigate('/')
    })
}
return(
    <div>
  <Form className='create-form' onSubmit={handleSubmit(postData)}>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name'  {...register("firstName",{required:true, maxLength:10, minLength:3})}
      onChange={(e) => setFirstName(e.target.value)}/>
    </Form.Field>
    {errors.firstName && <p style={{color: 'red'}}>Check First Name</p>}
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' {...register("lastName",{required:true, maxLength:10, minLength:3})}
      onChange={(e) => setLastName(e.target.value)} />
    </Form.Field>
    {errors.lastName && <p style={{color: 'red'}}>Check last Name</p>}
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setCheckbox(!checkbox)}/>
    </Form.Field>
    <Button type='submit' color='green'>Submit</Button>
  </Form>
  </div>
)
}

