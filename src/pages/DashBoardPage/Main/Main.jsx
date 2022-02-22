import React, {useState, useEffect} from 'react'
import axios from 'axios';
import StatusCard from '../../../components/Card/StatusCard';
import Calendar from 'react-awesome-calendar';
import BaseCard from '../../../components/Card/BaseCard'
import './main.css';
import reserv_list from '../../../assets/JSON/reservation.json';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';


const colors=['#44B6D1','#080083','green','orange'];

// const events = [{
//     id: 1,
//     color: colors[0],
//     from: '2022-01-01T18:00:00+00:00',
//     to: '2022-01-05T19:00:00+00:00',
//     title: '산장 3명'
// }, {
//     id: 2,
//     color: 'pink',
//     from: '2022-03-01T19:54:00.000Z',
//     to: '2022-03-10T19:54:00.000Z',
//     title: '유메노이에 5명'
// }, {
//     id: 3,
//     color: 'orange',
//     from: '2022-01-26T13:00:00+00:00',
//     to: '2022-01-27T14:00:00+00:00',
//     title: 'This is also another event'
// },
// ];

const Main = () => {
    const [reservation_list, setDailyReservList] = useState(null);
    const [calendar_list, setCalendarList] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    const fetchDailyReservationList = async() => {
        try {
          setDailyReservList(null);
          const response = await axios.post(
            'http://3.219.192.160:3000/manage_rsv/today',{
            user: 1
        }
          );
          setDailyReservList(response.data); // 데이터는 response.data 안에 들어있습니다.
          console.log("daily",response.data);
        } catch (e) {
          // setError(e);
        }
        // setLoading(false);
    };
    const fetchCalendarList =async() => {
        try {
            setCalendarList(null);
            const response = await axios.post(
            'http://3.219.192.160:3000/manage_rsv/calendar',{
            user: 1
        }
          );
          setCalendarList(response.data); // 데이터는 response.data 안에 들어있습니다.
          console.log("response",response.data);
          console.log("calendar",calendar_list);
        } catch (e) {
            console.log(e);
          // setError(e);
        }
        // setLoading(false);
    };
    
    useEffect(() => {
        fetchDailyReservationList();
        fetchCalendarList();
    }, []);

    // id: 3,
    // color: 'orange',
    // from: '2022-01-26T13:00:00+00:00',
    // to: '2022-01-27T14:00:00+00:00',
    // title: 'This is also another event'
    const eventData=[];
    if(calendar_list){
        calendar_list.map((item,index)=>{
            var id="";
            id = item.id;
            eventData.push({
                id : item.id,
                from : item.from,
                to : item.to,
                title : item.displayName +' '+item.bookingPeople+'명',
                color : colors[id%4],
            })
        }
        )
    }
    console.log("eventData",eventData);

    console.log("reservationList",reservation_list)

    return (
        <div className="dashboardWrapper">
            <div className="dashboard">
                <div className="statCards">
                    <StatusCard label="당월 기준 매출" data="10000" measure="원"></StatusCard>
                    <StatusCard label="당월 기준 예약" data="77" measure="건"></StatusCard>
                    <StatusCard label="당월 기준 이용" data="67" measure="건"></StatusCard>
                    <StatusCard className="lastCard "label="당월 기준 취소" data="8" measure="%"></StatusCard>
                </div>
                <div className="bottom">
                    <div className="left">
                        <div className="calendar">
                            {calendar_list?<Calendar events={eventData} />:
                            // <div className="spinner">
                                <Spin size="large"/>
                            // </div>
                            }
                        </div>
                        
                    </div>
                    <div className="right">
                        <div className="title">
                            당일 예약 리스트
                        </div>
                        <div className="date">
                            총 {reservation_list?<span class="appcolor">{reservation_list.length}</span>:<span class="appcolor">0</span>} 개의 일정
                        </div>
                        <div className="dailyList">
                            {reservation_list?
                                reservation_list.map((item, index)=>(
                                    <Link to={`manage_rsv/:${item.id}`}>
                                        <BaseCard marginBottom="10px">
                                            <div className="cardLeft">
                                                <div className="platform">예약 플랫폼</div>
                                                <div className="space_name">공간이름</div>
                                                <div className="reservation_name">예약자명</div>
                                                <div className="check_in">체크인 일정</div>
                                                <div className="check_out">체크아웃 일정</div>
                                            </div>
                                            <div className="cardRight">
                                                <div className="platform">스페이스클라우드</div>
                                                <div className="space_name appcolor">{item.displayName}</div>
                                                <div className="reservation_name">{item.bookerName}</div>
                                                <div className="check_in">{item.checkIn}</div>
                                                <div className="check_out">{item.checkOut}</div>
                                            </div>
                                        </BaseCard>
                                    </Link>
                                )):<div class="appcolor">당일 예약이 없습니다!</div>
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
