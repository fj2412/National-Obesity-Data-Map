import React from 'react'
import { useState } from "react"
import { Form, Button} from 'react-bootstrap'
import axios from 'axios';

const Search = ({ onDataFetched}) => {
  const [stateName, setStateName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/obesity-data/properties/${stateName}`)
      .then((response) => {
        onDataFetched(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
          type='text'
          name='searchbox'
          onChange={(e) => setStateName(e.target.value)}
          value={stateName}
          placeholder='Search States'
          className='mr-sm-2 ml-sm-5'
          ></Form.Control>
          <Button type='submit' className='p-2 mx-2'>Search</Button>
    </Form>
  )
}

export default Search;