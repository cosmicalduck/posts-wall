import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/post/postSlice";
import { useCreatePostMutation } from "../features/api/apiSlice";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function PostForm() {

  const [post, setPost] = useState({
    name: '',
    description: ''
  });

  const [validated, setValidated] = useState(false);

  const [createPost] = useCreatePostMutation();

  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    const description = e.target.elements.description.value.trim();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      alert('Por favor rellene todos los campos para poder crear un post.');
    } else {
      dispatch(addPost({
        ...post,
      })
      );

      createPost({
        name,
        description
      });
    }

    setValidated(true);

  };

  return (
    <div className='d-flex justify-content-center m-5'>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col}>
            <Form.Control required name='name' type='text' placeholder='Nombre del post' onChange={handleChange} />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese un nombre.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control required as="textarea" className="form-control mr-2" name='description' placeholder='Escriba aquí la descripción del post' onChange={handleChange} />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese una descripción.
            </Form.Control.Feedback>
          </Form.Group>
          <Col>
            <Button type="submit" className="btn btn-light">Crear post</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )

}

export default PostForm;
