import "./App.css";
import styles from "./styles/app.module.css";
import "./api/axiosDefaults";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import NavBar from "./components/NavBar";
import NotExists from "./components/NotExists";
import ProfilePage from "./pages/profiles/ProfilePage";
import PostsPage from "./pages/posts/PostsPage";
import FollowingPostsPage from "./pages/posts/FollowingPostsPage";
import AddPost from "./pages/posts/AddPost";
import PostDetail from "./pages/posts/PostDetail";
import PostEdit from "./pages/posts/PostEdit";
import CollectionPage from "./pages/collection/CollectionPage";
import AddCollectionItem from "./pages/collection/AddCollectionItem";
import EditCollectionItem from "./pages/collection/EditCollectionItem";
import EditProfile from "./pages/profiles/EditProfile";
import Popular from "./pages/posts/Popular";
import Followers from "./pages/Followers/Followers";

function App() {

  return (
    <div className="App">
      <NavBar />
      <div className={styles.content}>
        <Switch>
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <EditProfile />}
          />
          <Route exact path="/" render={() => <PostsPage />} />
          <Route
            exact
            path="/following"
            render={() => <FollowingPostsPage />}
          />
          <Route exact path="/addpost" render={() => <AddPost />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEdit />} />
          <Route exact path="/posts/popular" render={() => <Popular />} />
          <Route
            exact
            path="/followers/:id"
            render={() => <Followers following={false} />}
          />
          <Route
            exact
            path="/following/:id"
            render={() => <Followers following={true} />}
          />
          <Route
            exact
            path="/collection/:id"
            render={() => <CollectionPage />}
          />
          <Route
            exact
            path="/collection/:id/add"
            render={() => <AddCollectionItem />}
          />
          <Route
            exact
            path="/collection/item/:id"
            render={() => <EditCollectionItem />}
          />
          <Route render={() => <NotExists />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

//nvm install 16 && nvm use 16
