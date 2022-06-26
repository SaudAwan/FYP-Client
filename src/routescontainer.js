import React from 'react'
import Login from './login/loginComponent'
import {BrowserRouter, Router, Route,Redirect} from "react-router-dom"
import {jwtVerifier} from './login/api'
import history from './utils/history'
import CEODashboard from './ceo-dashboard/js/app/Ceo'
import EmployeeDashboard from './employee-dashboard/js/app/employeedashboard'
import BookEvent from './bookEvent'

class RoutesContainer extends React.Component{
    state={
        login:null,
        userDetails:null,
        uuid:null,
        loginError:null
    }
    componentDidMount=async()=>{
        const token=window.localStorage.getItem('EvenezyToken')
        await jwtVerifier({token})
        .then((res)=>{
            if(res.userDetails){
                this.userDetailsHandler(res.userDetails)
                // history.push('/')
            } else{
                if (!window.location.pathname.includes('booking'))  history.push('/login');
            }
        })
    }
    loginError=(loginError)=>{
        this.setState({loginError})
    }

    componentDidUpdate=async(prevProps,prevState)=>{
        if(prevState.userDetails != this.state.userDetails && !window.location.pathname.includes('login')){
            history.push('/')
        } else {
            history.push('/login')
        }
    }

    userDetailsHandler=(userDetails)=>{
        this.setState({userDetails})
    }

    render(){
        const{userDetails}=this.state
        console.log(userDetails)
        if(!userDetails){
            return (
                <BrowserRouter>
                    <Router history={history}>
                    <Route path="/login" 
                            render={ (props) => <Login {...props} 
                            loginError={this.loginError}
                            userDetailsHandler={this.userDetailsHandler}/>}/>
                        <Route path="/events/:id/booking" exact
                            component={BookEvent}
                            />
                    </Router>
                </BrowserRouter>
                        
            )
        }
        else if(userDetails.is_admin){
            return(
                <BrowserRouter>
                    <Router history={history}>
                        <Route path='/' render= { (props) => <CEODashboard {...props} CEODetails={userDetails} setUserDetails={this.userDetailsHandler}/>}/>  
                        <Route path="/events/:id/booking" exact
                         component={BookEvent}
                        />      
                    </Router>
                </BrowserRouter>
            )
        }
        else if (!userDetails.is_admin){
            return(
                <BrowserRouter>
                    <Router history={history}>
                        <Route path='/' render= { (props) => <EmployeeDashboard {...props} employeeDetails={userDetails} setUserDetails={this.userDetailsHandler}/>}/>
                        <Route path="/events/:id/booking" exact
                         component={BookEvent}
                        />
                    </Router>
                </BrowserRouter>
            )
        } return <div>Hi there</div>
    }
}
export default RoutesContainer