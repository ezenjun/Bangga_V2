import React from 'react'
// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// import myEventsList from '../../assets/JSONdata/myEventsList'
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import './calendar.css'

// const localizer = momentLocalizer(moment)

// const ReservationCalendar = props => {
//     return (
//         <div className="calendar">
//             <Calendar
//             localizer={localizer}
//             events={myEventsList}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: "100%" }}
//             />
//         </div>
//     )
// }

// export default ReservationCalendar

import { Calendar, Badge } from 'antd';

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}


const ReservationCalendar = props => {
    return (
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender}/>
    )
}

export default ReservationCalendar