import React,{ Component } from 'react'
import '../bootstrap/bootstrap.css'

class App extends Component{
    constructor(props) {
        super(props)
        if(localStorage.getItem('isAuthenticatedQuizUser')===undefined){
            localStorage.setItem('isAuthenticatedQuizUser','false')
        }
        this.state = {
            isAuthenticatedQuizUser: localStorage.getItem('isAuthenticatedQuizUser'),
            isTimerStarted:false,
            timeRemaining:'3:00',
            no_of_questions:3,

        }
    }
    componentWillMount(){
        if(this.state.isAuthenticatedQuizUser==='false'){
            window.location.replace('/login')
        }
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2">
                        <input type='button' value='Logout' className='btn-lg btn-primary' onClick={()=>{localStorage.setItem('isAuthenticatedQuizUser','false');this.setState({isAuthenticatedQuizUser:'false'});window.location.replace('/login')}} />
                    </div>
                    <div className="col-lg-2 col-lg-offset-10">
                        <h3><i className="glyphicon glyphicon-time"></i>Time Remaining</h3>
                        <h3 className="float-left">
                            {
                                this.state.timeRemaining
                            }
                        </h3>
                    </div>
                </div>
                <div className="col-lg-7 col-lg-offset-2 table-bordered">
                    <h3 className="col-lg-offset-5">Instructions</h3>
                    <p className="h4">1.The quiz contains {this.state.no_of_questions} questions.</p>
                    <p className="h4">2.All the questions are mandatory in order to complete this test.</p>
                    <p className="h4">3. Each question will have four options.</p>
                    <p className="h4">4. You are required to choose from one correct option.</p>
                    <hr/>
                    <input type="button" value="Start Test" onClick={()=>{window.location.replace('/test')}} className="h4 btn-lg btn-primary rounded col-lg-offset-5" />
                </div>
            </div>
        )
    }
}
export default App