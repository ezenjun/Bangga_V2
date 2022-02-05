import React, {useState, useEffect} from 'react'
import axios from 'axios';
import StatusCard from '../../../components/Card/StatusCard';
import Calendar from 'react-awesome-calendar';
import BaseCard from '../../../components/Card/BaseCard'
import './main.css';
import reserv_list from '../../../assets/JSON/reservation.json';
import { Link } from 'react-router-dom';



const events = [{
    id: 1,
    color: '#44B6D1',
    from: '2022-01-01T18:00:00+00:00',
    to: '2022-01-05T19:00:00+00:00',
    title: '산장 3명'
}, {
    id: 2,
    color: '#080083',
    from: '2022-01-08T13:00:00+00:00',
    to: '2022-01-12T14:00:00+00:00',
    title: '유메노이에 5명'
}, {
    id: 3,
    color: 'orange',
    from: '2022-01-26T13:00:00+00:00',
    to: '2022-01-27T14:00:00+00:00',
    title: 'This is also another event'
},
];

const Main = () => {
    const [reservation_list, setDailyReservList] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    const fetchDailyReservationList =() => {
        try {
          setDailyReservList(null);
          const response = axios.post(
            'http://3.219.192.160:3000/manage_rsv/today',{
            user: 1
        }
          );
          setDailyReservList(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          // setError(e);
        }
        // setLoading(false);
    };
    
    useEffect(() => {
        fetchDailyReservationList();
    }, []);

    console.log("reservationList",reservation_list)
    

    // const [StatusCard, setStatusCard] = useState(null);
    // // const [loading, setLoading] = useState(false);
    // // const [error, setError] = useState(null);  
    // const fetchStatusCard = async () => {
    //     try {
    //       // 요청이 시작 할 때에는 error 와 users 를 초기화하고
    //     //   setError(null);
    //       setStatusCard(null);
    //       // loading 상태를 true 로 바꿉니다.
    //     //   setLoading(true);
    //       const response = await axios.get(
    //         ''
    //       );
    //       setStatusCard(response.data); // 데이터는 response.data 안에 들어있습니다.
    //     } catch (e) {
    //       setError(e);
    //     }
    //     setLoading(false);
    // };
    
    //   useEffect(() => {
    //     fetchStatusCard();
    //   }, []);

    // const [calendarEvents, setCalendarEvents] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);  
    // const fetchCalendarEvents = async () => {
    //     try {
    //       // 요청이 시작 할 때에는 error 와 users 를 초기화하고
    //     //   setError(null);
    //     setCalendarEvents(null);
    //       // loading 상태를 true 로 바꿉니다.
    //     //   setLoading(true);
    //       const response = await axios.get(
    //         ''
    //       );
    //       setCalendarEvents(response.data); // 데이터는 response.data 안에 들어있습니다.
    //     } catch (e) {
    //       setError(e);
    //     }
    //     setLoading(false);
    // };
    
    // useEffect(() => {
    //     // fetchDailyReservationList();
    //     fetchStatusCard();
    //     fetchCalendarEvents();
    // }, []);

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
                            <Calendar events={events} />
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
