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

    const handleClose = () => setTodayShow(false);
    const handleShow = () => setTodayShow(true);

    var Assigned = 0
    var Completed = 0

    return (
        <div>
            <div className="MainDash">
                <div className="Dash">
                    <h5 className="heading">Notification</h5>
                    <ul className='notification'>
                        {update[0] ?
                            <li><small>Today is {update[0].Birthday}'s birthday.</small></li>
                            : ""}
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
                        {update ? update[1].presentation.map((item, i) => (
                            <li key={i}> <small><b>Employee:&nbsp;</b>&nbsp;{item.name} &nbsp; <b>Topic:</b>&nbsp;{item.topic}</small></li>
                        )
                        ) : ""}
                    </ul>
                    <u>Meeting</u>
                    <ul>
                        {update ? update[2].meetings.map((item, i) => (
                            <li key={i}> <small><b>Subject:&nbsp;</b>&nbsp;{item.subject} </small></li>
                        )
                        ) : ""}
                    </ul>
                    <u>Proposal</u>
                    <ul>
                        {update ? update[3].proposal.map((item, i) => (
                            <li key={i}> <small><b>Subject:&nbsp;</b>&nbsp;{item.topic} </small></li>
                        )
                        ) : ""}
                    </ul>
                </div>
            </div>
            <div className="Dash3">
                <div className='text_performance'>
                    <h5>Performance</h5>
                </div>
                <div className='bda' onClick={handleShow}>
                    <h6 style={{ marginLeft: 30 }}>This Day</h6>
                    {dept.bda ? dept.bda.map((item) => {
                        const completed = Number(item.completed)
                        const assigned = Number(item.today)
                        Assigned += assigned
                        Completed += completed
                    }) : ""}
                    <ul style={{ paddingTop: 8 }}>
                        <li><small>Assigned : {Assigned}</small></li>
                        <li><small>Completed : {Completed}</small></li>
                    </ul>
                </div>
                <Modal show={showtoday} onHide={handleClose} dialogClassName="modal-90w" centered>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ color: '#bd6b35', marginLeft: 30 }}>Buisness Development Associate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            {dept.bda ? dept.bda.map((item) => (<>
                                <li style={{ paddingTop: 30 }}><b>Name &nbsp;:</b> &nbsp;{item.name}</li>
                                <b>Assigned &nbsp;today &nbsp;:</b> &nbsp;{item.today} &nbsp;&nbsp; <b>Completed </b> &nbsp;: &nbsp;{item.completed}
                            </>
                            )) : ""}
                        </ul>
                    </Modal.Body>
                    <Button className="closeButton" onClick={handleClose}>
                        Close
                    </Button>
                </Modal>
            </div>
        </div>
    )
}