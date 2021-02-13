import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Posts from './pages/Posts'
import About from './pages/About'
import User from './pages/User'

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/posts/add' component={AddPost} />
          <Route exact path='/posts/:id' component={EditPost} />
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/me' component={Profile} />
          <Route exact path='/about' component={About} />
          <Route exact path='/user/:id' component={User} />
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App
