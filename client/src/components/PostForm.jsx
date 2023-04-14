import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/post/postSlice";
import { useCreatePostMutation } from "../features/api/apiSlice";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function PostForm(){

  const[post, setPost] = useState({
    name: '',
    description: ''
  });

  const [createPost] = useCreatePostMutation();
  
  const dispatch = useDispatch();
  

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    const description = e.target.elements.description.value.trim(); 
    
    dispatch(addPost({
      ...post,
      })
    );

    createPost({ 
      name,
      description
    });

  };

  return(
    <div className='d-flex justify-content-center m-5'>
      <form className="post-form" onSubmit={handleSubmit}>
        <Row>
          <Col>
            <input className="form-control" name='name' type='text' placeholder='Nombre del post' onChange={handleChange}/>
          </Col>
          <Col>
            <textarea className="form-control mr-2" name='description' placeholder='Escriba aquí la descripción del post' onChange={handleChange}/>
          </Col>
          <Col>
            <Button type="button" className="btn btn-light">Crear post</Button>
          </Col>
        </Row>
      </form>
    </div>
  )

}

export default PostForm;