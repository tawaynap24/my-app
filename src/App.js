//Library
import { BrowserRouter as Router, Redirect, Route, useParams } from 'react-router-dom'
import React, {useContext }  from 'react'
import './App.css'
//Components
import SignIn from './contents/SignIn'
import SignUp from './contents/SignUp'
import { AuthProvider } from './components/Auth'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
//Contents
import Home from './contents/Home'
import About from './contents/About'
import Event from './contents/Event'
import Contact from './contents/Contact'
import Profile from './contents/Profile'
import Detail from './contents/Detail'
import Reserve from './contents/Reserve'
import Admin from './contents/Admin'
import AdminEvent from './contents/Admin-event'
import AdminCheck from './contents/Admin-check'
import Uploadd from './contents/Test'


function App() {


  return (
      <AuthProvider>
        <Router>
              <Navbar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/About">
                <About />
              </Route>
              <Route exact path="/event">
                <Event />
              </Route>
              <Route exact path="/contact">
                <Contact />
              </Route>
              <Route exact path="/sign-in">
                <SignIn />
              </Route>
              <Route exact path="/sign-up">
                <SignUp />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/detail">
                <Detail />
              </Route>
              <Route exact path="/detail/:id">
                <Detail />
              </Route>
              <Route exact path="/reserve/:id/:slotnum">
                <Reserve />
              </Route>
              <Route exact path="/admin">
                {/* {(currentUser != "admin@admin.com") ? <Redirect to="/" /> : <Redirect to="/admin"/>} */}
                <Admin />
              </Route>
              <Route exact path="/admin-event">
                <AdminEvent/>
              </Route>
              <Route exact path="/admin-check">
                <AdminCheck/>
              </Route>
              <Route exact path="/test">
                <Uploadd/>
              </Route>
              <Footer />
        </Router>
      </AuthProvider>
  );
}

export default App;
