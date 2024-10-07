import './App.css';
import { Container } from 'react-bootstrap';
import "./api/axiosDefaults";
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { useCurrentUser } from "./contexts/CurrentUserContext";
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import NavBar from './components/NavBar';
import NotExists from './components/NotExists';
import ProfilePage from './pages/profiles/ProfilePage';
import PostsPage from './pages/posts/PostsPage';
import FollowingPostsPage from './pages/posts/FollowingPostsPage';

function App() {

  const currentUser = useCurrentUser();

  return (
    <div className="App">
      <Container>
        <NavBar />
        <Switch>
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/profile" render={() => <ProfilePage/>}/>
          <Route exact path="/new" render={() => <PostsPage/>} />
          <Route exact path="/following" render={() => <FollowingPostsPage/>}/>
          <Route render={() => <NotExists/>} />
        </Switch> 
      </Container>
    </div>
  );
}

export default App;

//nvm install 16 && nvm use 16