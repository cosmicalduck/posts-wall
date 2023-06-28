import React, { useEffect } from "react";
import { fetchPosts } from "../features/post/postSlice";
import { useGetPostsQuery } from "../features/api/apiSlice";
import { useSelector } from "react-redux";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import PostCard from "./PostCard";

function PostList() {


  const { error, isLoading, } = useGetPostsQuery();
  const filteredEntities = useSelector((state) => state.post.filteredEntities);


  if (isLoading) return (
    <center>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando..</span>
      </Spinner>
    </center>

  )
  else if (error) return <div>Error: {error.message}</div>

  return (
    <Container className='post-list'>
      <Row className='mt-2'>
        {
          filteredEntities.map((post) => {
            return (
              <PostCard
                key={post.id}
                id={post.id}
                postName={post.name}
                description={post.description}
              />
            )
          })
        }
      </Row>
    </Container>
  )
}

export default PostList;