import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
        navigate(`/search/${keyword}`)
    } else {
        navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} style ={{display:'flex'}}>
      <Form.Control 
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
        style ={{marginRight:'10px'}}
      ></Form.Control>
      <Button type='submit' variant='outline-dark' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox