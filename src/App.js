import './App.css';
import { Container } from 'react-bootstrap';
import "./api/axiosDefaults";
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';

function App() {
  return (
    <div className="App">
      <Container>
        <Switch>
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
        </Switch> 
      </Container>
    </div>
  );
}

export default App;

//nvm install 16 && nvm use 16