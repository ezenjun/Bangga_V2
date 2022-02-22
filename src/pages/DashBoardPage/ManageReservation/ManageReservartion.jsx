import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import './manageReservation.css';
import Table from '../../../components/Table/Table';
import reservationList from '../../../assets/JSON/reservation.json'
// import { Modal, Button } from 'antd';
import Modal from '../../../components/Modal/Modal'
import FormInput from '../../../components/FormInput/FormInput';
import { Spin } from 'antd';


const customerTableHead = [
    '예약상태',
    '예약 플랫폼',
    '공간 이름',
    '예약자명',
    '예약일정',
    '예약요청일',
    '예약인원',
    '연락처',
    '결제상태',
    '결제방식',
    '결제금액'
]



const ManageReservartion = () => {

    const [values, setValues]= useState({
        platform:"스페이스클라우드",
        reservation_checkIn:"",
        reservation_checkOut:"",
        reservation_request_date:"",
        bookerName:"",
        bookerCall:"",
        bookingPeople:"",
        payStatus:"결제완료",
        payType:"신용카드",
        payPrice:"",
        payFinish:"-",
        returnPrice:0,
        returnDate:"-",
        returnWhy:null,
    })

    ///////////////////////////////////Axios////////////////////////////////////////////// 
    const [reserv_list, setReservList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    


    const handleSubmit=(e)=>{
        e.preventDefault();
        postNewReservation();
        console.log("최종 전달할 values: ",values);
        closeModal();
        fetchReservationList();
    }

    const fetchReservationList = async () => {
        try {
          setError(null);
          setReservList(null);
          setLoading(true);
          const response = await axios.post(
            'http://3.219.192.160:3000/manage_rsv',{
                //보내고자 하는 데이터 
            user: 1
          }
          );
          console.log(response.data);
          setReservList(response.data); 
        } catch (e) {
          setError(e);
          console.log('error');
          console.log(e);
        }
        setLoading(false);
    };
    const postNewReservation = async () => {
        try {
          setError(null);
          setReservList(null);
          setLoading(true);
          const response = await axios.post(
            'http://3.219.192.160:3000/manage_rsv/create',{
                //보내고자 하는 데이터 
            values,
            space_id:2,
            user:1,
          }
          );
          console.log(response.data);
        //setReservList(response.data); 
        } catch (e) {
          setError(e);
          console.log('error');
          console.log(e);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchReservationList();
    }, []);

    ///////////////////////////////////Axios End////////////////////////////////////////////// 

    const inputs =[
        {
            id: 1, 
            select: true,
            name:"platform",
            type:"text",
            placeholder:"예약 플랫폼을 입력하세요", 
            errorMessage:"*필수 입력 사항입니다.",
            label:"예약 플랫폼",
            required: true,
            options:[
                '스페이스클라우드', '에어비엔비', '네이버예약'
            ]
        },
        {
            id: 2, 
            select: true,
            name:"space",
            type:"text",
            placeholder:"예약 공간의 이름을 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"예약 공간",            
            required: true,
            options:[
                '유메노이에', '카멜레온', '수작', '산장'
            ]
        },
        {
            id: 3, 
            select: false,
            name:"bookerName",
            type:"text",
            placeholder:"예약자명을 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"예약자명",
            required: true,
        },
        {
            id: 4, 
            select: false,
            name:"bookerCall",
            type:"text",
            placeholder:"예약자 연락처를 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"예약자 연락처",
            required: true,
        },
        {
            id: 5, 
            select: false,
            name:"reservation_checkIn",
            type:"datetime-local",
            placeholder:"체크인 시간을 선택하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"체크인 시간",
            required: true,
        },
        {
            id: 6, 
            select: false,
            name:"reservation_checkOut",
            type:"datetime-local",
            placeholder:"체크아웃 시간을 선택하세요",
            errorMessage:"*체크인 시간보다 빠를 수 없습니다.",
            label:"체크아웃 시간",
            required: true,
        },
        {
            id: 7, 
            select: false,
            name:"reservation_request_date",
            type:"date",
            placeholder:"예약생성일을 선택하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"예약생성일"
,            required: true,
        },
        {
            id: 8, 
            select: false,
            name:"bookingPeople",
            type:"text",
            placeholder:"예약 인원을 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"예약 인원",
            required: true,
        },
        
        {
            id: 9, 
            select: true,
            name:"payStatus",
            type:"text",
            placeholder:"결제 상태를 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"결제 상태",
            required: true,
            options:[
                '결제완료', '미결제', '환불/취소',
            ]
        },
    ]

    const payComplete = [
        {
            id: 10, 
            select: true,
            name:"payType",
            type:"text",
            placeholder:"결제 방식을 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"결제 방식",
            required: true,
            options:[
                '신용카드', '계좌이체', '네이버페이','카카오페이'
            ]
        },
        {
            id: 11, 
            select: false,
            name:"payPrice",
            type:"text",
            placeholder:"결제 금액을 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"결제 금액",
            required: true,
        }
    ]

    const payIncomplete = [
        {
            id: 10, 
            select: false,
            name:"payPrice",
            type:"text",
            placeholder:"결제 예정 금액을 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"결제 예정 금액",
            required: true,
        }
    ]

    const refundCancel = [
        {
            id: 10, 
            select: true,
            name:"payType",
            type:"text",
            placeholder:"결제 방식을 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"결제 방식",
            required: true,
            options:[
                '신용카드', '계좌이체', '네이버페이','카카오페이'
            ]
        },
        {
            id: 11, 
            select: false,
            name:"payPrice",
            type:"text",
            placeholder:"결제 금액을 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"결제 금액",
            required: true,
        },
        {
            id: 12, 
            select: false,
            name:"returnPrice",
            type:"text",
            placeholder:"환불 금액을 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"환불 금액",
            required: true,
        },
        {
            id: 13, 
            select: false,
            name:"returnWhy",
            type:"text",
            placeholder:"환불 사유를 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"환불 사유",
            required: true,
        },
        
    ]

    const onChange= (e)=>{
        setValues({...values,[e.target.name]: e.target.value});
        console.log(values);
    }

    let paymentInput;
    if(values['payStatus']==="결제완료"){
        paymentInput = payComplete.map((input)=>(
            <FormInput 
                key={input.id} 
                select={input.select} 
                {...input} 
                value={values[input.name]}
                errorMessage={input.errorMessage} 
                options={input.options} 
                onChange={onChange}
            >
            </FormInput>
        ))
    }else if(values['payStatus']==="미결제"){
        paymentInput = payIncomplete.map((input)=>(
            <FormInput 
                key={input.id} 
                select={input.select} 
                {...input} 
                value={values[input.name]}
                errorMessage={input.errorMessage} 
                options={input.options} 
                onChange={onChange}
            >
            </FormInput>
        ))
    }
    else{//환불/취소
        paymentInput = refundCancel.map((input)=>(
            <FormInput 
                key={input.id} 
                select={input.select} 
                {...input} 
                value={values[input.name]}
                errorMessage={input.errorMessage} 
                options={input.options} 
                onChange={onChange}
            >
            </FormInput>
        ))
    }

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    
    // console.log(values);

    ///////////////////////Row Click Handler/////////////////////////////////////////////
    const navigate = useNavigate();
    const handleRowClick = (index) => {
        navigate(`./${index}`);
    }  
    ///////////////////////Row Click Handler/////////////////////////////////////////////

    const reservationStatus = (status) =>{
        if(status === "예약완료"){
            return <div className="complete">
                예약완료
            </div>
        }else if(status === "이용완료"){
            return <div className="checkouted">
                이용완료
            </div>
        }else if(status === "예약대기"){
            return <div className="pending">
                예약대기
            </div>
        }else{
            return <div className="refund">
                예약취소    
            </div>
        }
    }
    const renderHead = (item,index) => <th key={index}>{item}</th>
    const renderBody = (item,index) => (
            <tr className="tablerow" key={index} onClick={()=> handleRowClick(item.id)}>
                    {item.status!=null ? <td>{reservationStatus(item.status)}</td> : <td>-</td> }
                    {item.platform!=null ? <td>{item.platform}</td> : <td>스페이스클라우드</td> }
                    {item.displayName!=null ? <td>{item.displayName}</td> : <td>-</td> }
                    {item.bookerName!=null ? <td>{item.bookerName}</td> : <td>-</td> }
                    {item.checkIn!=null && item.checkOut!=null? <td>{item.checkIn} ~ {item.checkOut}</td> : <td>-</td> }
                    {item.created!=null ? <td>{item.created}</td> : <td>-</td> }
                    {item.bookingPeople!=null ? <td>{item.bookingPeople}</td> : <td>-</td> }
                    {item.bookerCall!=null ? <td>{item.bookerCall}</td> : <td>-</td> }
                    {item.payStatus!=null ? <td>{item.payStatus}</td> : <td>-</td> }
                    {item.payType!=null ? <td>{item.payType}</td> : <td>-</td> }
                    {item.payPrice!=null ? <td className='payment'>{item.payPrice}원</td> : <td>-</td> }
            </tr>
    )
    if (!reserv_list) 
        return (
            <div className="reservation">
                <div className="rsvtop_loading">
                    <div className="label">
                        <p>예약현황 </p>
                    </div>
                    <div className="spinner">
                        <Spin size="large"/>
                    </div>
                    
                </div>
                
            </div>) ;
    

    return (

        <div className='reservation'>
            <div className="rsvtop">
                <div className="label">
                    <p>예약현황 </p>
                    <div className="reservation_status">
                        <p>총  </p>
                        <p className='appcolor '>&nbsp; {reserv_list.length} &nbsp;</p>
                        <p> 개의 예약</p>
                    </div>
                    <div className="registerReservation">
                        <div className="addButton" onClick={() => openModal()}>
                            <p className='plus'>+</p>
                            <p>&nbsp;예약 등록하기</p>
                        </div>
                    </div>
                </div>
                
                <Table
                    limit='12'
                    headData = {customerTableHead}
                    renderHead = {(item, index) => renderHead(item, index)}
                    // bodyData = {reservationList}
                    bodyData = {reserv_list}
                    renderBody = {(item, index) => renderBody(item, index)}
                />
            </div>
            <Modal open={modalOpen} close={closeModal} header="예약등록하기">
                <form className="modalForm" onSubmit={handleSubmit}>
                    {inputs.map((input)=>(
                        <FormInput 
                            key={input.id} 
                            select={input.select} 
                            {...input} 
                            value={values[input.name]}
                            errorMessage={input.errorMessage} 
                            options={input.options} 
                            onChange={onChange}
                        >
                        </FormInput>
                    ))}
                    {paymentInput}
                    <input type="submit" value="예약등록완료" className="submitButton"/>
                </form>
            </Modal>
        </div>
    )
}

export default ManageReservartion
