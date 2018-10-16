import React,{ Component } from 'react'
import '../../bootstrap/bootstrap.css'

class App extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="container-fluid">
                <div>
                <div className="row col-lg-6 col-lg-offset-2">
                    <label class="h3 col-form-label" htmlFor="username">
                        Username:
                    </label>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                        <input type="text" className="form-control input-lg" id="username" required />
                    </div>
                </div>
                <div className="row col-lg-6 col-lg-offset-2">
                    <label class="h3 col-form-label" htmlFor="password">
                        Password:
                    </label>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                        <input type="password" className="form-control input-lg" id="password" required />
                    </div>
                </div>
            </div>
                <div className='row margin-top-200'>
                    <input type="submit" className="btn-lg rounded btn-primary" value="submit" required />
                </div>
            </div>

        )
    }
}
export default App