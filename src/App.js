import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


import Register from "./components/Register"
import SignIn from "./components/SignIn"
import Home from "./components/Home"
import CinemaRoom from './components/CinemaRoom'
import About from "./components/About"
import Movies from "./components/Movies"
import Admin from "./components/Admin"
import Screenings from './components/Screenings';

import User from "./components/User"
// Import ContactUs component
function App() {
  return (
    
    
    // <div className="App">
    //       <h1>PERFECT MOVIES</h1>
    //   <Navbar/>
    //   <header className="App-header">
    //     <img src="https://www.pngkit.com/png/full/259-2597127_cool-drinks-pepsi-max-no-background.png" className="App-logo" alt="logo" />
    //   </header>
    // <CinemaRoom/>
    // </div>
    <>
    {/* This is the alias of BrowserRouter i.e. Router */}
    <Navbar/>
    
    <Router>
      <Switch>
        {/* This route is for home component 
        with exact path "/", in component props 
        we passes the imported component*/}
        <Route exact path="/" component={Home} />
          
        <Route path="/CinemaRoom" component={CinemaRoom} />
        
        <Route path="/Screenings" component={Screenings} />

        <Route path="/SignIn" component={SignIn} />

        <Route path="/Movies" component={Movies} />

        <Route path="/Register" component={Register} />

        <Route path="/User" component={User} />
        
        <Route path="/About" component={About} />

        <Route path="/Admin" component={Admin} />
          
        {/* If any route mismatches the upper 
        route endpoints then, redirect triggers 
        and redirects app to home component with to="/" */}
        <Redirect to="/" />
      </Switch>
    </Router>
    <Footer/>
  </>
  )
}

export default App;
