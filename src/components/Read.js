import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Route, Routes,Link } from 'react-router-dom';
import { Icon, Label, Menu, Table,Button } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import ModeExample from './ModeExample';
import swal from "sweetalert";
export default function Read () {
    const [APIdata, setAPIdata] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        axios.get('https://63a56b292a73744b008d66ef.mockapi.io/fakedata')
        .then((response)=>{
            setAPIdata(response.data);
        })
       
    }, []);

    const showToastMessage = () => {
        toast.error('Deleted Completely !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const setData =(data)=>{
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox);
    }
    const onDelete =(id)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`https://63a56b292a73744b008d66ef.mockapi.io/fakedata/${id}`)
        .then( ()=>{
            getData();
            
        })
              swal("Poof! Your Item has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
        

    }
    // const onDelete =(id)=>{
    //     axios.delete(`https://63a56b292a73744b008d66ef.mockapi.io/fakedata/${id}`)
    //     .then( ()=>{
    //         getData();
            
    //     })

    // }
    const getData =()=> {
        axios.get('https://63a56b292a73744b008d66ef.mockapi.io/fakedata')
        .then((getData)=> {
            setAPIdata(getData.data)
            //showToastMessage();
           
        })
    }
    return(
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Link to ='/create'>
                        <Button color='green'>Add New Record</Button>
                        </Link>
                    </Table.Row>
                </Table.Header>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Checked</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                    
                    APIdata.map((data)=>{
                        return(
                           
                            
                    <Table.Row key={data.id}>
                        <Table.Cell >{data.id}</Table.Cell>
                        <Table.Cell >{data.firstName}</Table.Cell>
                        <Table.Cell>{data.lastName}</Table.Cell>
                        <Table.Cell>{data.checkbox? 'Checked' : 'Unchecked'}</Table.Cell>
                         <Table.Cell>
                                
                                <Link to = "/update"> 
                                <Button primary onClick={() =>setData(data)}>Edit</Button>
                                  </Link>
                        </Table.Cell>
                        <Table.Cell>
                            <Button color='red' onClick={() => onDelete(data.id)}>Delete</Button>
                            
                        </Table.Cell>
                        
                    </Table.Row>
      )})}
                        
                </Table.Body>
            </Table>
        </div>

    )
}

