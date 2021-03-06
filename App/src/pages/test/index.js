import React,{ Component } from 'react'
import '../../bootstrap/bootstrap.css'
import './index.css'
import Button from '../mui-button/Button'
import { Pie } from 'react-chartjs-2'
import correct from '../../assets/correct.gif'
import incorrect from '../../assets/incorrect.gif'

class App extends Component{
    constructor(props) {
        super(props)
        if(localStorage.getItem('isAuthenticatedQuizUser')===undefined){
            localStorage.setItem('isAuthenticatedQuizUser','false')
        }
        this.state = {
            isAuthenticatedQuizUser: localStorage.getItem('isAuthenticatedQuizUser'),
            isTimerStarted: false,
            no_of_questions: 6,
            minutes: 1,
            x: 0,
            seconds: 0,
            score: 0,
            responseTemp:'',
            quizSubmitted: false,
            currentquestion: 0,
            questions: [
                {
                    question: 'Which one of the five is least like the other four?',
                    optionA: 'Dog',
                    optionB: 'Mouse',
                    optionC: 'Lion',
                    optionD: 'Snake',
                    correctAnswer: 'Snake',
                }
                ,
                {
                    question: 'Which number should come next in the series?\n' +
                    '1 - 1 - 2 - 3 - 5 - 8 - 13',
                    optionA: '8',
                    optionB: '13',
                    optionC: '21',
                    optionD: '260',
                    correctAnswer: '21',
                }
                ,
                {
                    question: 'Which one of the five choices makes the best comparison?\n' +
                    'PEACH is to HCAEP as 46251 is to:',
                    optionA: '26451',
                    optionB: '12654',
                    optionC: '51462',
                    optionD: '15264',
                    correctAnswer: '15264',
                },
                {
                    question: 'Which truck is produced by the Ford Motor Company?',
                    optionA: 'RAV4',
                    optionB: 'Silverado 1500',
                    optionC: 'CR-V',
                    optionD: 'F-150',
                    correctAnswer: 'F-150',
                },
                {
                    question: 'What temperature is the same in Celsius and Fahrenheit?',
                    optionA: '0&deg',
                    optionB: '+40&deg',
                    optionC: '-40&deg',
                    optionD: '+100&deg',
                    correctAnswer: '-40&deg',
                },
                {
                    question: 'Which of these antagonist characters was created by novelist J.K. Rowling?',
                    optionA: 'Professor Moriaty',
                    optionB: 'Lord Vordemort',
                    optionC: 'Lord Farqaad',
                    optionD: 'Darth Valder',
                    correctAnswer: 'Lord Vordemort',
                }
            ],
            responses:[
            ],
        }
        this.timer = null;
        this.correct = false;
        this.incorrect = false;
        this.timer2 = null;
        this.animationTime = 0;
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    componentWillUnmount(){

    }
    handleSubmitAnswer =()=>{
        if(this.state.responseTemp===this.state.questions[this.state.currentquestion].correctAnswer)
        {
            this.correct = true
            let newObj = {
                optionsMarked:this.state.responseTemp,
                attemptSuccess:true,
            }
            this.setState({score:this.state.score+1,responses:[...this.state.responses,newObj]})
        }
        else{
            this.incorrect = true
            let newObj = {
                optionsMarked:this.state.responseTemp,
                attemptSuccess:false,
            }
            this.setState({responses:[...this.state.responses,newObj]})
        }
        if(this.state.currentquestion<this.state.no_of_questions-1) {
            this.setState({currentquestion: this.state.currentquestion + 1})
        }
        this.timer2 = setInterval(()=>{
            if(this.animationTime<1) {
                this.incorrect = false
                this.correct = false
            }
            else{
                clearInterval(this.timer2)
                this.animationTime = 0
                this.incorrect = false
                this.correct = false
            }
            this.animationTime = this.animationTime+1
        },1000)
    }
    handleSubmitQuiz =()=>{
        if(this.state.responseTemp===this.state.questions[this.state.currentquestion].correctAnswer)
        {
            let newObj = {
                optionsMarked:this.state.responseTemp,
                attemptSuccess:true,
            }
            this.setState({score:this.state.score+1,responses:[...this.state.responses,newObj]},
                ()=>{
                    this.setState({
                        data : {
                            labels: [
                                'Correct',
                                'Incorrect',
                            ],
                            datasets: [{
                                data: [
                                    this.state.score,
                                    this.state.no_of_questions-this.state.score,
                                ],
                                backgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                ],
                                hoverBackgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                ]
                            }]
                        },

                        options : {
                            maintainAspectRatio: false,
                            responsive: false,
                            legend: {
                                position: 'left',
                                labels: {
                                    boxWidth: 10
                                }
                            }
                        },})
                })
        }
        else{
            let newObj = {
                optionsMarked:this.state.responseTemp,
                attemptSuccess:false,
            }
            this.setState({responses:[...this.state.responses,newObj]},
                ()=>{
                    this.setState({
                        data : {
                            labels: [
                                'Correct',
                                'Incorrect',
                            ],
                            datasets: [{
                                data: [
                                    this.state.score,
                                    this.state.no_of_questions-this.state.score,
                                ],
                                backgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                ],
                                hoverBackgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                ]
                            }]
                        },

                        options : {
                            maintainAspectRatio: false,
                            responsive: false,
                            legend: {
                                position: 'left',
                                labels: {
                                    boxWidth: 10
                                }
                            }
                        },})
                })
        }
        clearInterval(this.timer)
        this.setState({quizSubmitted:true})
    }
    checkAnswer =(e)=>{
        let itemval=e.target.value
        this.setState({responseTemp:itemval})
        //console.log('itemval')
    }
    componentWillMount(){
        if(this.state.isAuthenticatedQuizUser==='false'){
            window.location.replace('/login')
        }
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
                this.handleSubmitQuiz()
            }
            if(this.state.seconds>0){
                this.setState({seconds:this.state.seconds-1})
            }
        },1000)
    }
    render(){
        return(
            <div>
            {(!this.state.quizSubmitted)?
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2">
                    <input type='button' value='Logout' className='btn-lg btn-primary' onClick={()=>{localStorage.setItem('isAuthenticatedQuizUser','false');this.setState({isAuthenticatedQuizUser:'false'});window.location.replace('/login')}} />
                </div>
                <div className="col-lg-2 col-lg-offset-8">
                    <h3><i className="glyphicon glyphicon-time"></i>Time Remaining</h3>
                    <h3 className="float-left">
                        {
                            this.state.minutes + ":"
                        }
                        {
                            (this.state.seconds < 10) ? ('0' + (this.state.seconds)) : (this.state.seconds)
                        }
                    </h3>
                </div>
            </div>
            <div className="jumbotron table-bordered">
                <h3 className='col-lg-offset-2'>{this.state.questions[this.state.currentquestion].question}</h3>
                <hr/>
                <label className="radioContainer">
                    {this.state.questions[this.state.currentquestion].optionA}
                    <input type="radio" name="selectedOption"
                           value={this.state.questions[this.state.currentquestion].optionA}
                           onClick={this.checkAnswer}/>
                    <span className="checkMark"></span>
                </label>
                <label className="radioContainer">
                    {this.state.questions[this.state.currentquestion].optionB}
                    <input type="radio" name="selectedOption"
                           value={this.state.questions[this.state.currentquestion].optionB}
                           onClick={this.checkAnswer}/>
                    <span className="checkMark"></span>
                </label>
                <label className="radioContainer">
                    {this.state.questions[this.state.currentquestion].optionC}
                    <input type="radio" name="selectedOption"
                           value={this.state.questions[this.state.currentquestion].optionC}
                           onClick={this.checkAnswer}/>
                    <span className="checkMark"></span>
                </label>
                <label className="radioContainer">
                    {this.state.questions[this.state.currentquestion].optionD}
                    <input type="radio" name="selectedOption"
                           value={this.state.questions[this.state.currentquestion].optionD}
                           onClick={this.checkAnswer}/>
                    <span className="checkMark"></span>
                </label>
                <hr/>
                <div className='col-lg-offset-2'>
                    {
                        (this.state.currentquestion!==this.state.no_of_questions-1) ? <Button
                            onClick={() => {
                                this.setState({x: this.state.x + 1});
                                this.handleSubmitAnswer();
                            }}
                        >
                            {`Submit Answer`}
                        </Button> : null
                    }
                    {
                        (this.state.currentquestion===this.state.no_of_questions-1) ? <Button
                            onClick={() => {
                                this.setState({x: this.state.x + 1});
                                this.handleSubmitQuiz();
                            }}
                        >
                            {`Submit Quiz`}
                        </Button> : null
                    }
                    {(this.correct) ?
                        <img src={correct} height={40} width={40}
                             style={{marginTop: '-40px', marginLeft: '20px'}}/> : null
                    }
                    {(this.incorrect) ?
                        <img src={incorrect} height={40} width={40}
                             style={{marginTop: '-40px', marginLeft: '20px'}}/> : null
                    }
                </div>
            </div>
            </div>:null
        }
                {
                    (this.state.quizSubmitted)?<div className='container-fluid'>
                        <br/>
                        <div className="col-lg-2 col-lg-offset-10">
                            <input type='button' value='Logout' className='btn-lg btn-primary' onClick={()=>{localStorage.setItem('isAuthenticatedQuizUser','false');this.setState({isAuthenticatedQuizUser:'false'});window.location.replace('/login')}} />
                        </div>
                        <div className='jumbotron row'>
                            <div className='col-lg-2'>
                            <h1 className='text-center'>Score</h1>
                            <br/>
                            <h1 className='text-center'>{this.state.score}</h1>
                            </div>
                            <div className='col-lg-4 col-lg-offset-4'>
                                <Pie data={this.state.data} options={this.state.options} />
                            </div>
                    </div>
                    </div>:null
                }
                {   (this.state.quizSubmitted)?
                    <div>
                        {
                            this.state.questions.map((sublist, index) => {
                                return (
                                    <div className='text-center'>
                                    <h3>{index+1}. {sublist.question}</h3>
                                        <br/>
                                    <h4>Correct Answer: {sublist.correctAnswer}</h4>
                                        <br/>
                                        {(this.state.responses[index]!==undefined)?
                                            <h4>You Marked: {this.state.responses[index].optionsMarked}</h4>:<h4>You Marked: None</h4>
                                        }
                                        <br/>
                                    </div>
                                )
                            })
                        }
                    </div>:null
                }
            </div>
        )
    }
}

export default App
