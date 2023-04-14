import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { useDeletePostMutation } from '../features/api/apiSlice';
import { removePost } from '../features/post/postSlice';
import { useDispatch } from "react-redux";

function PostCard({ id, postName, description }) {

  const [deletePost] = useDeletePostMutation();

  // const posts = useSelector((state) => state.post.entities);
  // const status = useSelector((state) => state.post.status);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    deletePost(id);
    dispatch(removePost(id));
  };


  return(
    <Col sm={6} md={4}>
      <Card className='m-1'>
        <Card.Body>
          <Card.Title>{ postName }</Card.Title>
          <Card.Text>
            { description }
          </Card.Text>
          <Button variant="danger" onClick={() => handleDelete(id)}>Borrar</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default PostCard;