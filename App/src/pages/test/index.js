import React,{ Component } from 'react'
import '../../bootstrap/bootstrap.css'
import './index.css'
import Button from '../mui-button/Button'

class App extends Component{
    constructor(props) {
        super(props)
        if(localStorage.getItem('isAuthenticated')===undefined){
            localStorage.setItem('isAuthenticated','false')
        }
        this.state = {
            isAuthenticated: localStorage.getItem('isAuthenticated'),
            isTimerStarted:false,
            no_of_questions:3,
            minutes:3,
            x: 0,
            seconds:0,
            currentquestion:0,
            questions:[
                {
                    question:'Which one of the five is least like the other four?',
                    optionA:'Dog',
                    optionB:'Mouse',
                    optionC:'Lion',
                    optionD:'Snake',
                    correctAnswer:'Snake',
                }
                ,
                {
                    question:'Which number should come next in the series?\n'+
                        '1 - 1 - 2 - 3 - 5 - 8 - 13',
                    optionA:'8',
                    optionB:'13',
                    optionC:'21',
                    optionD:'260',
                    correctAnswer:'21',
                }
                ,
                {
                    question:'Which one of the five choices makes the best comparison?\n' +
                    'PEACH is to HCAEP as 46251 is to:',
                    optionA:'26451',
                    optionB:'12654',
                    optionC:'51462',
                    optionD:'15264',
                    correctAnswer:'15264',
                }
            ],
            dropdownOpen: false,
        }
        this.toggle = this.toggle.bind(this);
        //let timearray = this.state.timeRemaining.split(":")
        //this.setState({minutes:,seconds:parseInt(timearray[1])})
        this.timer = null;
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    componentWillMount(){
        /*if(this.state.isAuthenticated==='false'){
            window.location.replace('/login')
        }*/
    }
    componentDidMount(){
        this.handleTimerStart()
    }
    handleTimerStart =()=>{
        this.timer = setInterval(()=>{
            if(this.state.minutes>0 && this.state.seconds==0){
                this.setState({minutes:this.state.minutes-1,seconds:this.state.seconds+60})
            }
            if(this.state.minutes==0 && this.state.seconds==0){
                clearInterval(this.timer)
            }
            if(this.state.seconds>0){
                this.setState({seconds:this.state.seconds-1})
            }
        },1000)
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2 col-lg-offset-10">
                        <h3><i className="glyphicon glyphicon-time"></i>Time Remaining</h3>
                        <h3 className="float-left">
                            {
                                this.state.minutes+":"
                            }
                            {
                                (this.state.seconds<10)?('0'+(this.state.seconds)):(this.state.seconds)
                            }
                        </h3>
                    </div>
                </div>
                <div className="jumbotron table-bordered">
                    <h3 className='col-lg-offset-2'>{this.state.questions[this.state.currentquestion].question}</h3>
                    <hr/>
                    <label className="radioContainer">
                        {this.state.questions[this.state.currentquestion].optionA}
                        <input type="radio" name="selectedOption"  />
                        <span className="checkMark"></span>
                    </label>
                    <label className="radioContainer">
                        {this.state.questions[this.state.currentquestion].optionB}
                        <input type="radio" name="selectedOption" />
                        <span className="checkMark"></span>
                    </label>
                    <label className="radioContainer">
                        {this.state.questions[this.state.currentquestion].optionC}
                        <input type="radio" name="selectedOption" />
                        <span className="checkMark"></span>
                    </label>
                    <label className="radioContainer">
                        {this.state.questions[this.state.currentquestion].optionD}
                        <input type="radio" name="selectedOption" />
                        <span className="checkMark"></span>
                    </label>
                    <hr/>
                    <div className='col-lg-offset-2'>
                    <Button
                        onClick={() => {
                            this.setState({x: this.state.x + 1});
                        }}
                    >
                        {`Submit Answer`}
                    </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
