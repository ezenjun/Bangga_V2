import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseCard from '../../../components/Card/BaseCard'
import Modal from '../../../components/Modal/Modal'
import FormInput from '../../../components/FormInput/FormInput';
import './reservationDetail.css'
import { Spin } from 'antd';
import { useParams } from "react-router";

const Detail = () => {
    const [isModify, setIsModify] = useState(false);
    const [values, setValues]= useState({
        platform:"",
        space:"",
        bookerName:"",
        checkin:"",
        checkout:"",
        created:"",
        bookingPeople:"",
        bookercall:"",
        option:"",
        payStatus:"",
        payType:"",
        payPrice:"",
    })
    ////////////////////////////////paystatus/////////////////////////////////////////////////////////
    const [paystatus, setPayStatus] = useState(false); // 결제완료
    const [unpayed, setUnpayedStatus] = useState(false); //미결제
    const [refund, setRefundStatus] = useState(false);  //환불/취소
    
    const changePayStatus=()=>{
        setPayStatus(true);
        setUnpayedStatus(false);
        // console.log("paystatus: ",paystatus);
    }
    const changeRefundStatus=()=>{
        setRefundStatus(true);
        setPayStatus(false);
        // console.log("refundstatus: ",refund);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        changeRefundStatus();
        closeModal();
    }
    ////////////////////////////////paystatus/////////////////////////////////////////////////////////

    const [detail_Info, setReservList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let params = useParams().id;

    const fetchReservationList = async() => {
        try {
          setError(null);
          setReservList(null);
          setLoading(true);
          const response = await axios.post(
            'http://3.219.192.160:3000/manage_rsv/detail',{
                //보내고자 하는 데이터 
                reservation_id : params
        });
            console.log("response.data: ",response.data);
            setReservList(response.data); 
            console.log("detail_Info: ",detail_Info);
            if(detail_Info.payStatus==="결제완료"){
                setPayStatus(true);
                setUnpayedStatus(false);
                setRefundStatus(false);
                console.log("pay:",paystatus);
                console.log("unpayed:",unpayed);
                console.log("refund:",refund);
            }else if (detail_Info.payStatus==="결제미완료"){
                setPayStatus(false);
                setUnpayedStatus(true);
                setRefundStatus(false);
                console.log("pay:",paystatus);
                console.log("unpayed:",unpayed);
                console.log("refund:",refund);
            }else{
                setPayStatus(false);
                setUnpayedStatus(false);
                setRefundStatus(true);
                console.log("pay:",paystatus);
                console.log("unpayed:",unpayed);
                console.log("refund:",refund);
            }
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
    
    console.log("detail info: ",detail_Info)
    
    const inputs =[
        {
            id: 1, 
            select: false,
            name:"paymentStatus",
            type:"text",
            placeholder:"환불사유를 입력하세요.",
            errorMessage:"*필수 입력 사항입니다.",
            label:"환불 사유", 
            required: true,
            options:[],
        },
        {
            id: 2, 
            select: false,
            name:"payAmount",
            type:"text",
            placeholder:"취소/환불 금액을 입력하세요", 
            errorMessage:"*필수 입력 사항입니다.",
            label:"환불 금액",
            required: true,
            options:[]
        },
    ]
    const [modalOpen, setModalOpen] = useState(false);
    // const [DeletemodalOpen, setDeleteModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const removeReservation = async function() {
        if(window.confirm('해당 예약을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {
            
        }
    }
    

    const onChange= (e)=>{
        setValues({...values,[e.target.name]: e.target.value});
    }
    console.log(values);

    

    if (!detail_Info) return(
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
        <div className="detailContainer">
            <div className="spacelabel">
                <p>예약현황 </p>
            </div>
            {isModify ? 
                <form className="detailWrapper">
                    <div className="detail_left">
                        <BaseCard padding='0'>
                            <div className="reservInfo">
                                <div className="detailLabel">
                                    예약 정보
                                </div>
                                <div className="infoContent">
                                    <div className="infowrap">
                                        <div className="infoRow">
                                            <p className="infoLabel">플랫폼</p>
                                            <div className="dataLabel">
                                                <input className="modifyReservationInput" type="text" required='true' autoComplete='off' placeholder='스페이스클라우드'/>
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">공간이름</p>
                                            <div className="dataLabel">
                                            <input className="modifyReservationInput" type="text" required='true' autoComplete='off' placeholder='유메노이에'/>
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">체크인</p>
                                            <div className="dataLabel">
                                                <input className="modifyReservationInput" type="datetime-local" required='true' autoComplete='off' placeholder='22년 2월 3일 16:00'/>
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">체크아웃</p>
                                            <div className="dataLabel">
                                                <input className="modifyReservationInput" type="datetime-local" required='true' autoComplete='off' placeholder='22년 2월 3일 16:00'/>
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">예약요청일</p>
                                            <div className="dataLabel">
                                            <input className="modifyReservationInput" type="date" required='true' autoComplete='off' placeholder='22년 2월 3일'/>
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">예약인원</p>
                                            <div className="dataLabel">
                                            <input className="modifyReservationInput" type="text" required='true' autoComplete='off' placeholder='6명'/>
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">추가옵션</p>
                                            <div className="dataLabel">
                                            <input className="modifyReservationInput" type="text" required='true' autoComplete='off' placeholder='바베큐'/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </BaseCard>
                    </div>
                    <div className="detail_right">
                        <div className="bookerInfo">
                            <BaseCard height="100%" padding='0'>
                                <div className="reservInfo">
                                    <div className="detailLabel">
                                        예약자 정보
                                    </div>
                                    <div className="infoContent">
                                        <div className="infowrap">
                                            <div className="infoRow">
                                                <p className="infoLabel">예약자명</p>
                                                <div className="dataLabel">
                                                    <input className="modifyReservationInput" type="text" required='true' autoComplete='off' placeholder='윤태인'/>
                                                </div>
                                            </div>
                                            <div className="infoRow">
                                                <p className="infoLabel">연락처</p>
                                                <div className="underLine"></div>
                                                <div className="dataLabel">
                                                    <input className="modifyReservationInput" type="text" required='true' autoComplete='off' placeholder='010-2323-2323'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </BaseCard>
                        </div>
                        <div className="paymentInfo">
                            <BaseCard height="100%" padding='0'>
                                <div className="reservInfo">
                                    <div className="detailLabel">
                                        결제 정보
                                    </div>
                                    <div className="infoContent">
                                        <div className="infowrap">
                                            <div className="infoRow">
                                                <p className="infoLabel">결제 상태</p>
                                                {/* <div className="dataLabel"> */}
                                                    <select name="paymentStatus" id="paymentStatus">
                                                        <option value="payed">결제완료</option>
                                                        <option value="unpayed">미결제</option>
                                                        <option value="cancel">환불/취소</option>
                                                    </select>
                                                {/* </div> */}
                                            </div>
                                            {refund ? <div className="infoRow">
                                                <p className="infoLabel">환불 사유</p>
                                                <div className="dataLabel">
                                                    <input className="modifyReservationInput" type="text" required='true' autoComplete='off' placeholder='우천'/>
                                                </div>
                                            </div>:<div className="infoRow">
                                                <p className="infoLabel">결제 방식</p>
                                                {/* <div className="dataLabel"> */}
                                                    <select name="payMethod" id="payMethod">
                                                        <option value="accountTransfer">계좌송금</option>
                                                        <option value="credit">신용카드</option>
                                                        <option value="naver">네이버페이</option>
                                                    </select>
                                                {/* </div> */}
                                            </div>  
                                            } 
                                            
                                            <div className="infoRow">
                                                <p className="infoLabel">결제 금액</p>
                                                <div className="dataLabel">
                                                    <input className="modifyReservationInput" type="text" required='true' autoComplete='off' placeholder='200,000원'/>
                                                </div>
                                            </div>
                                            {refund && <div className="infoRow">
                                                <p className="infoLabel">환불 금액</p>
                                                <div className="dataLabel">
                                                    <input className="modifyReservationInput" type="text" required='true' autoComplete='off' placeholder='200,000원'/>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </BaseCard>
                        </div>
                        <div className="buttons">
                            <div className="editButton">
                            <input type="submit" value="등록하기" className="editReservationComplete"/>
                            </div>
                        </div>
                    </div>
                </form> 
            : 
            <div className="detailWrapper">
                <div className="detail_left">
                    <BaseCard padding='0'>
                        <div className="reservInfo">
                            <div className="detailLabel">
                                예약 정보
                            </div>
                            <div className="infoContent">
                                <div className="infowrap">
                                    <div className="infoRow">
                                        <p className="infoLabel">플랫폼</p>
                                        <div className="dataLabel">
                                            <p>스페이스 클라우드</p>
                                        </div>
                                    </div>
                                    <div className="infoRow">
                                        <p className="infoLabel">공간이름</p>
                                        <div className="dataLabel">
                                            <p>{detail_Info[0].displayName}</p>
                                        </div>
                                    </div>
                                    <div className="infoRow">
                                        <p className="infoLabel">체크인</p>
                                        <div className="dataLabel">
                                            <p>{detail_Info[0].checkIn}</p>
                                        </div>
                                    </div>
                                    <div className="infoRow">
                                        <p className="infoLabel">체크아웃</p>
                                        <div className="dataLabel">
                                            <p>{detail_Info[0].checkOut}</p>
                                        </div>
                                    </div>
                                    <div className="infoRow">
                                        <p className="infoLabel">예약요청일</p>
                                        <div className="dataLabel">
                                            <p>{detail_Info[0].reservation_request_date}</p>
                                        </div>
                                    </div>
                                    <div className="infoRow">
                                        <p className="infoLabel">예약인원</p>
                                        <div className="dataLabel">
                                            <p>{detail_Info[0].bookingPeople}명</p>
                                        </div>
                                    </div>
                                    {/* <div className="infoRow">
                                        <p className="infoLabel">추가옵션</p>
                                        <div className="dataLabel">
                                            <p>바베큐, 빔프로젝터</p>
                                        </div>
                                    </div> */}
                                </div>
                                
                            </div>
                            
                        </div>
                    </BaseCard>
                </div>
                <div className="detail_right">
                    <div className="bookerInfo">
                        <BaseCard height="100%" padding='0'>
                            <div className="reservInfo">
                                <div className="detailLabel">
                                    예약자 정보
                                </div>
                                <div className="infoContent">
                                    <div className="infowrap">
                                        <div className="infoRow">
                                            <p className="infoLabel">예약자명</p>
                                            <div className="dataLabel">
                                                <p>{detail_Info[0].bookerName}</p>
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">연락처</p>
                                            <div className="underLine"></div>
                                            <div className="dataLabel">
                                                <p>{detail_Info[0].bookerCall}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </BaseCard>
                    </div>
                    <div className="paymentInfo">
                        <BaseCard height="100%" padding='0'>
                            <div className="reservInfo">
                                <div className="detailLabel">
                                    결제 정보
                                </div>
                                <div className="infoContent">
                                    <div className="infowrap">
                                        <div className="infoRow">
                                            <p className="infoLabel">결제 상태</p>
                                            <div className="dataLabel">
                                                <p>{detail_Info[0].payStatus}</p>
                                                {/* {paystatus && <p>결제완료</p>}
                                                {unpayed && <p>미결제</p>}
                                                {refund && <p>환불/취소</p>} */}
                                            </div>
                                        </div>
                                        {refund ? <div className="infoRow">
                                            <p className="infoLabel">환불 사유</p>
                                            <div className="dataLabel">
                                                <p>{detail_Info[0].returnWhy}</p>
                                            </div>
                                        </div>:<div className="infoRow">
                                            <p className="infoLabel">결제 방식</p>
                                            <div className="dataLabel">
                                            <p>{detail_Info[0].payType}</p>
                                            </div>
                                        </div>  
                                        } 
                                        
                                        <div className="infoRow">
                                            <p className="infoLabel">결제 금액</p>
                                            <div className="dataLabel">
                                            <p>{detail_Info[0].payPrice}원</p>
                                            </div>
                                        </div>
                                        {refund && <div className="infoRow">
                                            <p className="infoLabel">환불 금액</p>
                                            <div className="dataLabel">
                                                <p>{detail_Info[0].returnPrice}원</p>
                                            </div>
                                        </div>}
                                        <div className="paymentEdit">
                                            {paystatus ?
                                                <div className="quickButton">
                                                    {refund ? '':<button className='cancelrefund' onClick={()=>openModal()}>환불 / 취소하기</button>}
                                                </div>
                                                :<div className="quickButton">
                                                    {unpayed &&<button className='payComplete' onClick={()=>changePayStatus()}>결제완료하기</button>}
                                                    {refund && <div className="refundedPayment">환불/취소 처리된 결제 내역 입니다</div>}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </BaseCard>
                    </div>
                    <div className="buttons">
                        <div className="editButton">
                            <button className='edit' onClick={()=>setIsModify(true)}>예약 수정하기</button>
                        </div>
                        <div className="deleteButton">
                            <button className='delete' onClick={()=>removeReservation()}>예약 삭제하기</button>
                        </div>
                        
                    </div>
                </div>
                <div className="modalpopup">
                    <Modal open={modalOpen} close={closeModal} header="환불 / 취소하기">
                        <form onSubmit={handleSubmit}>
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
                            <input type="submit" value="수정하기" onClick={changeRefundStatus} className="submitButton"/>
                        </form>
                    </Modal>
                </div>
                
            </div>}
        </div>
        
    )
}

export default Detail
