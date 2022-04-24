import './App.css'

import Navbar from './components/Navbar'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import Home component
import Home from "./components/Home";
// import About component
import CinemaRoom from './components/CinemaRoom'
// import ContactUs component
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
    <Router>
      <Switch>
        {/* This route is for home component 
        with exact path "/", in component props 
        we passes the imported component*/}
        <Route exact path="/" component={Home} />
          
        <Route path="/cinemaRoom" component={CinemaRoom} />
          
          
        {/* If any route mismatches the upper 
        route endpoints then, redirect triggers 
        and redirects app to home component with to="/" */}
        <Redirect to="/" />
      </Switch>
    </Router>
  </>
  )
}

export default App;
