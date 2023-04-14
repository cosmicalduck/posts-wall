import React from "react";
import { useDispatch} from "react-redux";
import { filterPosts } from "../features/post/postSlice";

function PostFilter() {

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(filterPosts(e.target.value));
    
  };

  return(
    <div className='d-flex justify-content-center m-5'>
      <input className='form-control w-25' name='filter' type='text' placeholder='Filtrar por nombre' onChange={handleChange}/>
    </div>
  )

}

export default PostFilter;