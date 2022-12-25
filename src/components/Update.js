import React,{useState, useEffect} from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from 'react-hook-form'

export default function Update ()  {
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [checkbox, setCheckbox] = useState(false)
const [id, setID] = useState(null);

// const updateAPIdata =()=>{
//     axios.put("https://63a56b292a73744b008d66ef.mockapi.io/fakedata/${id}",{
//         firstName,lastName,checkbox
//     })
// }
//destructure use form elements
const {register,handleSubmit,formState: {errors} } = useForm();

const showToastMessage = () => {
    toast.success('Updated Successfully !', {
        position: toast.POSITION.TOP_RIGHT
    });
};
const navigate = useNavigate();
const updateAPIData = () => {
    axios.put(`https://63a56b292a73744b008d66ef.mockapi.io/fakedata/${id}`, {
        firstName,
         lastName,
         checkbox
	}).then(()=>{
        showToastMessage();
        navigate('/')
    })
}
    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setFirstName(localStorage.getItem('First Name'))
        setLastName(localStorage.getItem('Last Name'))
        setCheckbox(localStorage.getItem('Checkbox Value'))
    }, [])

return(
    <div>
  <Form className='create-form' onSubmit={handleSubmit(updateAPIData)}>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' value={firstName} {...register("firstName", {required:true, maxLength:10,minLength:3})}
      onChange={(e) => setFirstName(e.target.value)}/>
    </Form.Field>
    {errors.firstName && <p style={{color:'red'}}>Please Check First Name</p>}
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' value={lastName} {...register("lastName",{required:true, maxLength:10, minLength:3})}
      onChange={(e) => setLastName(e.target.value)}/>
    </Form.Field>
    {errors.lastName && <p style={{color:'red'}}>Please Check the Last Name</p>}
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' checked={checkbox} onChange={(e) => setCheckbox(!checkbox)}/>
    </Form.Field>
    <Button type='submit' primary>Update</Button>
  </Form>
  </div>
)
}

