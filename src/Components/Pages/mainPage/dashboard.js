import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [update, setUpdate] = useState("")
    const [present,setpresent] = useState("")
    const [Absent,setabsent] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3001/dashboard").then((response) => {
            setUpdate(response.data[0].update);
        }).catch((err) => console.log(err))


        axios.get("http://localhost:3001/user").then((response) => {
            const present = response.data.filter((item) =>item.status === "present");
            const absent = response.data.filter(function(filteredInput){
                return !present.find(function(input){
                    return input.name ===filteredInput.name;
                });
            });
            console.log(absent)
            setabsent(absent.length)
            setpresent(present.length)
        })
            .catch((err) => console.log(err))
    }, [])


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
            <div className="Dash3">Helllo Dash</div>
        </div>
    )
}