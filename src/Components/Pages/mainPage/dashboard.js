import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Dashboard() {
    const [dept, setDept] = useState("")
    const [update, setUpdate] = useState("")
    const [present, setpresent] = useState("")
    const [Absent, setabsent] = useState("")
    const [showtoday, setTodayShow] = useState(false);
    const [showMonth, setMonthShow] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/dashboard").then((response) => {
            setUpdate(response.data[0].update);
        }).catch((err) => console.log(err))


        axios.get("http://localhost:3001/user").then((response) => {
            const present = response.data.filter((item) => item.status === "present");
            const absent = response.data.filter(function (filteredInput) {
                return !present.find(function (input) {
                    return input.name === filteredInput.name;
                });
            });
            setabsent(absent.length)
            setpresent(present.length)
        }).catch((err) => console.log(err))

        axios.get("http://localhost:3001/dashboard").then((response) => {
            setDept(response.data[0])
            console.log(response.data[0])
        }).catch((err) => console.log(err))
    }, [])
//Handler for Today Modal
    const handleClose = () => setTodayShow(false);
    const handleShow = () => setTodayShow(true);
//Handler for Month Modal
const handleCloseMonth = () => setMonthShow(false);
const handleShowMonth = () => setMonthShow(true);
//Global Variable for calculation 
    var Assigned = 0
    var Completed = 0
    var MonthAssgined =0 ;
    var MonthAchieved =0 ;
//Current Month
const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var monthNumber = new Date().getMonth()
var Month =monthName[monthNumber]


    return (
        <div>
            <div className="MainDash">
                <div className="Dash">
                    <h5 className="heading">Notification</h5>
                    <ul className='notification'>
                        {update[0] ?<li><small>Today is {update[0].Birthday}'s birthday.</small></li>: ""}
                    </ul>
                    <h6 className="Subheading">Today's Status</h6>
                    <ul className='notification'>
                        <li><small>Total employee present : &nbsp; {present}  </small></li>
                        <li><small>Total employee absent : &nbsp; {Absent}  </small></li>
                    </ul>
                </div>
                <div className="Dash2">
                    <h5 className="heading">Today's Update</h5>
                    <u>Presentation</u>
                    <ul>
                        {update ? update[1].presentation.map((item, i) => (<li key={i}> <small><b>Employee:&nbsp;</b>&nbsp;{item.name} &nbsp; <b>Topic:</b>&nbsp;{item.topic}</small></li>)) : ""}
                    </ul>
                    <u>Meeting</u>
                    <ul>
                        {update ? update[2].meetings.map((item, i) => ( <li key={i}> <small><b>Subject:&nbsp;</b>&nbsp;{item.subject} </small></li>)) : ""}
                    </ul>
                    <u>Proposal</u>
                    <ul>
                        {update ? update[3].proposal.map((item, i) => (<li key={i}> <small><b>Subject:&nbsp;</b>&nbsp;{item.topic} </small></li> )) : ""}
                    </ul>
                </div>
            </div>
            <div className="Dash3">
                <div className='text_performance'>
                    <h5>Performance</h5>
                    <p><small>"We need to schedule a meeting with client today!"<b> <br></br>- B D Team</b></small></p>
                </div>

                <div className='bda' onClick={handleShow}>
                    <h6 style={{ marginLeft: 30,display:'inline'}}>This Day</h6>&nbsp; &nbsp;
                    {dept.bda ? dept.bda.map((item) => {const completed = Number(item.completed) 
                              const assigned = Number(item.today)
                              Assigned += assigned
                              Completed += completed}) : ""}
                               {Assigned>=Completed?<i class="fa-solid fa-arrow-down" style={{color:'#f56f61'}}></i>:<i class="fa-solid fa-arrow-up" style={{color:'green'}}></i>}
                    <ul style={{ paddingTop: 8 }}>
                        <li><small>Assigned : {Assigned}</small></li>
                        <li><small>Completed : {Completed}</small></li>
                    </ul>
                </div>

                <div className='bda_Month' onClick={handleShowMonth}>
                    <h6 style={{ marginLeft: 16 ,display:'inline'}}>This Month</h6>&nbsp; &nbsp;
                    {dept.bda ? dept.bda.map((item) => {
                        const monthCompleted = Number(item.achieved) 
                              const Month = Number(item.assigned)
                              MonthAssgined += Month
                              MonthAchieved += monthCompleted}) : ""}
                    {MonthAssgined>=MonthAchieved?<i class="fa-solid fa-arrow-down" style={{color:'#f56f61'}}></i>:<i class="fa-solid fa-arrow-up" style={{color:'green'}}></i>}
                    <ul style={{ paddingTop: 8 }}>
                        <li><small>Assigned : {MonthAssgined}</small></li>
                        <li><small>Completed : {MonthAchieved}</small></li>
                    </ul>
                </div>
                {/* Modal for today*/}
                <Modal show={showtoday} onHide={handleClose} dialogClassName="modal-90w" centered>
                        <Modal.Header closeButton>
                        <Modal.Title style={{ color: '#bd6b35', marginLeft: 30 }}>Buisness Development Associate</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <ul> {dept.bda ? dept.bda.map((item,i) => (<> <li key={i} style={{ paddingTop: 30 }}><b>Name &nbsp;:</b> &nbsp;{item.name}</li><b>Assigned &nbsp;today &nbsp;:</b> &nbsp;{item.today} &nbsp;&nbsp; <b>Completed </b> &nbsp;: &nbsp;{item.completed}</>)) : ""}</ul>
                        </Modal.Body>
                        <Button className="closeButton" onClick={handleClose}>
                        Close
                       </Button>
                </Modal>

               { /* Modal for Month*/}
                <Modal show={showMonth} onHide={handleCloseMonth} dialogClassName="modal-90w" centered>
                        <Modal.Header closeButton>
                        <Modal.Title style={{ color: '#bd6b35', marginLeft: 30 }}>Buisness Development Associate</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5 style={{color:'#bd6b35',marginLeft:180}}> {Month}</h5>
                        <ul> {dept.bda ? dept.bda.map((item,i) => (<> <li key={i} style={{ paddingTop: 20 }}><b>Name &nbsp;:</b> &nbsp;{item.name}</li><b>Assigned &nbsp;this month &nbsp;:</b> &nbsp;{item.assigned} &nbsp;&nbsp; <b>Completed </b> &nbsp;: &nbsp;{item.achieved}</>)) : ""}</ul>
                        </Modal.Body>
                        <Button className="closeButton" onClick={handleCloseMonth}>
                        Close
                       </Button>
                </Modal>
            </div>
        </div>
    )
}