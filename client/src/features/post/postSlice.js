import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const postsUrl = '//localhost:3001/posts';

const initialState = {
  entities: [],
  filteredEntities: [],
  status: 'idle', //idle | loaded | succeded | fail
  error: null,
}

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  try{
    const response = await axios.get(postsUrl);
    return [...response.data];

  } catch(err){
    return err.message;
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers:{
    addPost: (state, action) => {
      state.entities.push(action.payload);
      state.filteredEntities = state.entities
    },
    removePost: (state, action) => {
      const postFound = state.entities.find(post => post.id === action.payload);
      if(postFound){
        state.entities.splice(state.entities.indexOf(postFound), 1);
        state.filteredEntities = state.entities;        
      }
    },
    filterPosts: (state, action) => {
      if(action.payload === '' || null) {
        state.filteredEntities = state.entities;

      } else {        
        state.filteredEntities = [...state.entities].filter((post) => post.name.toLowerCase().includes(action.payload.toLowerCase()))
       }      
    }
  },
  extraReducers (builder) {
    builder
    .addCase(fetchPosts.pending, (state,action) =>{
      state.status = 'loading';
    })
    .addCase(fetchPosts.fulfilled, (state,action) => {
      state.status = 'succeded';     
      state.entities = action.payload
      state.filteredEntities = state.entities

    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
  }  
})

export const selectAllPosts = (state) => state.post.entities;

export const { addPost, removePost, filterPosts } = postSlice.actions;
export default postSlice.reducer;