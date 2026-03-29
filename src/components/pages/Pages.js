import React from 'react'

import { Header } from "../common/Header"
import {
   BrowserRouter as Router,
   Switch,
   Route,
   
 } from "react-router-dom";
import { Home } from "../home/Home";
import { About } from "./About";
import { Services } from "./Services";
import { Portfolio } from './Portfolio';
import { Testimonials } from './Testimonials';
import { Blog } from './Blog';
import { Contact } from './Contact';
import { Footer } from '../common/Footer';
import { AdminApp } from '../admin/AdminApp';

 const Pages = () => {
  return (
     <> 
     <Router> 
      <Header />
      
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/about' component={About}/>  
        <Route exact path='/services' component={Services}/>
        <Route exact path='/portfolio' component={Portfolio}/>
        <Route exact path='/testimonials' component={Testimonials}/>
        <Route exact path='/blog' component={Blog}/>
        <Route exact path='/contact' component={Contact}/>
        <Route exact path='/admin' component={AdminApp}/>
      </Switch>
      <Footer />
   </Router>
   </>
  )
}

export default Pages;