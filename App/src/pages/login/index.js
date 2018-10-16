import React,{ Component } from 'react'
import '../../bootstrap/bootstrap.css'
import Users from '../../users'

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            password:'',
        }
    }
    handleSubmit =()=>{
        Users.map(obj=>{
            if(obj.username===this.state.name && obj.password===this.state.password)
            {
                localStorage.setItem('isAuthenticatedQuizUser','true')
                window.location.replace('/')
            }
        })
        if(localStorage.getItem('isAuthenticatedQuizUser')===undefined || localStorage.getItem('isAuthenticatedQuizUser')==='false')
        {
            alert('User not found')
        }
    }
    handleOnchangeUsername =(e)=>{
        this.setState({name:e.target.value})
    }
    handleOnchangePassword =(e)=>{
        this.setState({password:e.target.value})
    }
    render(){
        return(
            <div className="container-fluid">
                <br/>
                <br/>
                <div className="row col-lg-offset-4">
                    <div>
                        <label class="h3 col-form-label" htmlFor="username">
                            Username:
                        </label>
                        <div className="input-group col-lg-4">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                            <input type="text"  value={this.state.name} onChange={this.handleOnchangeUsername} className="form-control input-lg" id="username" required />
                        </div>
                    </div>
                </div>
                <div className="row col-lg-offset-4">
                    <div>
                        <label class="h3 col-form-label" htmlFor="password">
                            Password:
                        </label>
                        <div className="input-group col-lg-4">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                            <input type="password" value={this.state.password} onChange={this.handleOnchangePassword} className="form-control input-lg" id="password" required />
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row col-lg-offset-5 col-sm-offset-3">
                    <div>
                        <input type="submit" className="btn-lg rounded btn-primary" onClick={this.handleSubmit} value="submit" required />
                    </div>
                </div>
            </div>
        )
    }
}
export default App