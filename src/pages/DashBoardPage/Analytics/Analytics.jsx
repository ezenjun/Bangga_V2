import React, {useState,useEffect} from 'react';
import axios from 'axios';
import BaseCard from '../../../components/Card/BaseCard'
import Chart from "react-apexcharts";
import click from '../../../assets/icon/click.png';
import money from '../../../assets/icon/money.png';
import clipboard from '../../../assets/icon/clipboard.png';
import close from '../../../assets/icon/close.png';
import DropDown from '../../../components/DropDown/DropDown'
import { Spin } from 'antd';
import './Analytics.css'


const Analytics = () => {
    const label=["매출","예약건수","이용건수","취소건수"]
    const iconid=["moneyIcon","clickIcon","clipIcon","closeIcon"]
    const icon=[money, click, clipboard, close]
    

    const [activeIndex, setActiveIndex]=useState(0);
    const [selectedRange, setSelectedRange]=useState("1주간");
    const [selectedSpace, setSelectedSpace]=useState("전체공간");

    const analyticsData = [{
        "id":"kakao1929",
        "spaceName":"전체공간",
        "range":"주간",
        "period":["2018-09-19", "2018-09-20", "2018-09-21", "2018-09-22", "2018-09-23", "2018-09-24", "2018-09-25"],
        "total_payments":[89,3,12,154,5,1,25],
        "total_reservations":[12,56,12,154,65,1,45], 
        "total_reservation_finish":[12,3,12,74,5,1,25],
        "total_reservation_cancel":[12,3,54,154,5,1,32],
        "avg_payments":34000,
        "avg_reservations":20,
        "avg_reservation_finish":18,
        "avg_reservation_cancel":3,
        "change_payments":20,
        "change_reservations":10,
        "change_reservation_finish":29,
        "change_reservation_cancel":10,
        "increase_payments":true,
        "increase_reservations":true,
        "increase_reservation_finish":false,
        "increase_reservation_cancel":true,
    },
    {
        "id":"kakao1929",
        "spaceName":"유메노이에",
        "range":"주간",
        "period":["2018-09-19", "2018-09-20", "2018-09-21", "2018-09-22", "2018-09-23", "2018-09-24", "2018-09-25"],
        "total_payments":[12,3,12,154,5,1,25],
        "total_reservations":[12,35,12,16,33,26,25], 
        "total_reservation_finish":[11,33,12,154,5,1,25],
        "total_reservation_cancel":[1,3,2,5,2,1,0],
        "avg_payments":788000,
        "avg_reservations":30,
        "avg_reservation_finish":29,
        "avg_reservation_cancel":2,
        "change_payments":20,
        "change_reservations":10,
        "change_reservation_finish":29,
        "change_reservation_cancel":10,
        "increase_payments":true,
        "increase_reservations":true,
        "increase_reservation_finish":false,
        "increase_reservation_cancel":true,
    },
    {
        "id":"kakao1929",
        "spaceName":"유메노이에",
        "range":"월간",
        "period":["2022-01-01", "2022-01-08", "2022-01-15","2022-01-22", "2022-01-30"],
        "total_payments":[300000,250000,450000,320000,550000],
        "total_reservations":[30,23,34,50,60], 
        "total_reservation_finish":[30,23,34,50,60],
        "total_reservation_cancel":[2,3,2,6,1],
        "avg_payments":30000,
        "avg_reservations":30,
        "avg_reservation_finish":29,
        "avg_reservation_cancel":2,
        "change_payments":20,
        "change_reservations":10,
        "change_reservation_finish":29,
        "change_reservation_cancel":10,
        "increase_payments":true,
        "increase_reservations":true,
        "increase_reservation_finish":false,
        "increase_reservation_cancel":true,
    },

    {
        "id":"kakao1929",
        "spaceName":"산장",
        "range":"분기",
        "period":["2021-10", "2021-11", "2021-12"],
        "total_payments":[12,7,16],
        "total_reservations":[12,7,12], 
        "total_reservation_finish":[12,6,5],
        "total_reservation_cancel":[12,3,28],
        "avg_payments":30000,
        "avg_reservations":30,
        "avg_reservation_finish":29,
        "avg_reservation_cancel":2,
        "change_payments":20,
        "change_reservations":10,
        "change_reservation_finish":29,
        "change_reservation_cancel":10,
        "increase_payments":true,
        "increase_reservations":true,
        "increase_reservation_finish":false,
        "increase_reservation_cancel":true,
    },
    {
        "id":"kakao1929",
        "spaceName":"수작",
        "range":"전체",
        "period":["2021-10", "2021-11", "2021-12","2022-01"],
        "total_payments":[32,3,12,154],
        "total_reservations":[12,3,41,114], 
        "total_reservation_finish":[12,3,12,24],
        "total_reservation_cancel":[12,25,12,154],
        "avg_payments":30000,
        "avg_reservations":30,
        "avg_reservation_finish":29,
        "avg_reservation_cancel":2,
        "change_payments":20,
        "change_reservations":10,
        "change_reservation_finish":29,
        "change_reservation_cancel":10,
        "increase_payments":false,
        "increase_reservations":true,
        "increase_reservation_finish":false,
        "increase_reservation_cancel":false,
    }]

    const [analytics_list, setAnalyticsList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchAnalyticsList = async () => {
        try {
          setError(null);
          setAnalyticsList(null);
          setLoading(true);
          const response = await axios.post(
            'http://3.219.192.160:3000/analytics',{
            user: 1
          }
          );
          console.log("아날리틱스 리퀘스트",response.data);
          setAnalyticsList(response.data); 
        } catch (e) {
          setError(e);
          console.log('error');
          console.log(e);
        }
        setLoading(false);
    };
    
    useEffect(() => {
        fetchAnalyticsList();
    }, []);
    console.log("아날리틱스 리퀘스트",analytics_list);
    const data=[];
    const avgData=[];
    const changeData=[];
    const increase=[];
    // if (analytics_list!==null) {
    //     analytics_list.map((item)=>{
    //         if(item.spaceName === selectedSpace && item.range===selectedRange){
    //             avgData[0]= item.avg_payments;
    //             avgData[1]= item.avg_reservations;
    //             avgData[2]= item.avg_reservation_finish;
    //             avgData[3]= item.avg_reservation_cancel;
    //             changeData[0]=item.change_payments;
    //             changeData[1]=item.change_reservation_finish;
    //             changeData[2]=item.change_payments;
    //             changeData[3]=item.change_reservation_cancel;
    //             increase[0]=item.increase_payments;
    //             increase[1]=item.increase_reservation_finish;
    //             increase[2]=item.increase_payments;
    //             increase[3]=item.increase_reservation_cancel;
    //         }
    //     })
    // }

    const tabClickHandler=(index)=>{
        setActiveIndex(index);
    };

    if (!analytics_list) 
        return (
        <div className="reservation">
            <div className="rsvtop_loading">
                <div className="label">
                    <p>통계관리 </p>
                </div>
                <div className="spinner">
                    <Spin size="large"/>
                </div>
                
            </div>
            
        </div>
    ) ;
    return (
        <div className="wrapper">
            <div className="AnalyticsChart">
                <div className="dropDown">
                    <div className="label">
                        <div className='labelText'>통계관리</div>
                        <div className="drop_layout">
                            <DropDown items={['1주간', '1달간', '전체기간']} selected={selectedRange} setSelected={setSelectedRange}/>
                            <DropDown items={['전체공간', '애오개애호', '7층카페', '내펜션이짱']} selected={selectedSpace} setSelected={setSelectedSpace}/>
                        </div>
                    </div>
                </div>
                <div className="tab">
                    <ul className='tabs'>
                        {label.map((item, index)=>{
                            return <li className={activeIndex===index ? "is-active" : ""} key={index} onClick={()=>tabClickHandler(index)}> 
                                        <div className="analyticsInfo">
                                            <div className="analyticsLabel">
                                                {item}
                                            </div>
                                            <div className="analyticsData">
                                                {/* {avgData[index]} */}
                                            </div>
                                            <div className="change">
                                                {/* {changeData[index]}%
                                                {increase[index] ? ' 증가' : ' 감소'} */}
                                            </div>
                                        </div>
                                        <div className="IconBackground" >
                                            <img className="Icon" id={iconid[index]} src={icon[index]} alt="" />
                                        </div>
                                    </li>
                        })}
                    </ul>
                </div>
                <div className='charts'>
                    <div className="chartContent">
                        <BaseCard height="100%" width="100%">
                            <div className="chart" >
                                {analytics_list.map((item,index)=>{
                                    if(item.spaceName === selectedSpace &&item.range &&item.range===selectedRange){
                                        data[0]= item.total_payments;
                                        data[1]= item.total_reservations;
                                        data[2]= item.total_reservation_finish;
                                        data[3]= item.total_reservation_cancel;
                                        console.log("item.period",item.period);
                                        return (
                                            <Chart key={index}
                                                options={{
                                                    colors: ['#080083', '#00BBFF'],
                                                    dataLabels: {enabled: false},
                                                    stroke: {curve: 'smooth'},
                                                    xaxis: {type: 'datetime',categories: item.period,  tickPlacement: 'on',axisTicks:{show: false}},
                                                    tooltip: {x: {format: 'yyyy/MM/dd'},
                                                    tickPlacement: 'on',
                                                    legend: {show: false,}},
                                                    fill: {type: 'gradient'}
                                                }} 
                                                series={[{name: label[activeIndex], data: data[activeIndex]}]} 
                                                type="area" 
                                                width={'100%'} 
                                                height={'100%'}
                                            />
                                        )
                                    }
                                }
                                )}
                                
                            </div>
                        </BaseCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics
