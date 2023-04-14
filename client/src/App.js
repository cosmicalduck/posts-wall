import './App.css';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostFilter from './components/PostFilter';

function App() {
  return (
    <div className="App">
      <PostForm />
      <PostFilter />
      <PostList />
    </div>
  );
}

export default App;
