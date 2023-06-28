import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const initialState = {
  entities: [],
  filteredEntities: [],
  status: 'idle', //idle | loaded | succeded | fail
  error: null,
}

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  try {
    const response = await axios.get(postsUrl);
    return [...response.data];

  } catch (err) {
    return err.message;
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.entities.push(action.payload);
      state.filteredEntities = state.entities
    },
    removePost: (state, action) => {
      const postFound = state.entities.find(post => post.id === action.payload);
      if (postFound) {
        state.entities.splice(state.entities.indexOf(postFound), 1);
        state.filteredEntities = state.entities;
      }
    },
    filterPosts: (state, action) => {
      if (action.payload === '' || null) {
        state.filteredEntities = state.entities;

      } else {
        state.filteredEntities = [...state.entities].filter((post) => post.name.toLowerCase().includes(action.payload.toLowerCase()))
      }
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        apiSlice.endpoints.getPosts.matchFulfilled,
        (state, { payload }) => {
          state.entities = payload;
          state.filteredEntities = state.entities;
        }
      )
  }
})


export const { addPost, removePost, filterPosts } = postSlice.actions;
export default postSlice.reducer;