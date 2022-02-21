import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseCard from '../../../components/Card/BaseCard'
import Modal from '../../../components/Modal/Modal'
import FormInput from '../../../components/FormInput/FormInput';
import './reservationDetail.css'
import { Spin } from 'antd';
import { useParams } from "react-router";

const Detail = () => {
    console.log("rendered");
    const [payStatusSelected, setPayStatusSelected] = useState(null);
    const [isModify, setIsModify] = useState(false);
    const [values, setValues] = useState({
        returnPrice: "",
        returnWhy: "", 
    })
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    console.log(values);
    ////////////////////////////////paystatus/////////////////////////////////////////////////////////
    const [paystatus, setPayStatus] = useState(false); // 결제완료
    const [unpayed, setUnpayedStatus] = useState(false); //미결제
    const [refund, setRefundStatus] = useState(false);  //환불/취소

    console.log("페이스테이터스, 리펀드, 언페이드", paystatus, refund, unpayed)

    const changePayStatus = () => {
        postPayStatus();
        setPayStatus(true);
        setUnpayedStatus(false);
    }
    const changeRefundStatus = () => {
        postRefundStatus();
        setRefundStatus(true);
        setPayStatus(false);
    }
    const postPayStatus = async () => {
        try {
            const response = await axios.post(
                'http://3.219.192.160:3000/manage_rsv/payment_complete', {
                //보내고자 하는 데이터 
                reservation_id: params,
                payment_id:detail_Info[0].payment_id
            });
            setDetailInfo(response.data);
            console.log("post로 다시 받은거의 data",response.data)
        }
        catch (e) {
            console.log('error');
            console.log(e);
        }
    }
    const postRefundStatus = async () => {
        try {
            const response = await axios.post(
                'http://3.219.192.160:3000/manage_rsv/payment_cancel', {
                //보내고자 하는 데이터 
                reservation_id: params,
                payStatus:"취소",
                returnPrice:values.returnPrice,
                returnWhy:values.returnWhy,
                payment_id:detail_Info[0].payment_id
            });
            setDetailInfo(response.data);
        }
        catch (e) {
            console.log('error');
            console.log(e);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        changeRefundStatus();
        closeModal();
    }
    ////////////////////////////////paystatus/////////////////////////////////////////////////////////

    const [detail_Info, setDetailInfo] = useState(null);
    console.log("디테일 인포 : ", detail_Info)

    let params = useParams().id;

    const fetchReservationDetail = async () => {
        try {
            setDetailInfo(null);
            const response = await axios.post(
                'http://3.219.192.160:3000/manage_rsv/detail', {
                //보내고자 하는 데이터 
                reservation_id: params
            });
            console.log("response.data: ", response.data);
            setDetailInfo(response.data);
            console.log("detail_Info: ", detail_Info);
        }
        catch (e) {
            console.log('error');
            console.log(e);
        }
    }

    const initializeData = () => {
        if (detail_Info !== null) {
            if (detail_Info[0]?.payStatus === "결제완료") {
                setPayStatus(true);
                setUnpayedStatus(false);
                setRefundStatus(false);
                setPayStatusSelected("결제완료")
            } else if (detail_Info[0]?.payStatus === "미결제") {
                setPayStatus(false);
                setUnpayedStatus(true);
                setRefundStatus(false);
                setPayStatusSelected("미결제")
            } else {
                setPayStatus(false);
                setUnpayedStatus(false);
                setRefundStatus(true);
                setPayStatusSelected("환불/취소")
            }
        }
    }

    useEffect(() => {
        fetchReservationDetail();
    }, [])

    useEffect(() => {
        initializeData()
    }, [detail_Info]);

    console.log("detail info: ", detail_Info)

    const inputs = [
        {
            id: 1,
            select: false,
            name: "returnWhy",
            type: "text",
            placeholder: "환불사유를 입력하세요.",
            errorMessage: "*필수 입력 사항입니다.",
            label: "환불 사유",
            required: true,
            options: [],
        },
        {
            id: 2,
            select: false,
            name: "returnPrice",
            type: "text",
            placeholder: "취소/환불 금액을 입력하세요",
            errorMessage: "*필수 입력 사항입니다.",
            label: "환불 금액",
            required: true,
            options: []
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

    /////////////////////////////예약 삭제///////////////////////////////////////////////////////////////////////////
    const navigate = useNavigate();
    const removeReservation = () => {
        if (window.confirm('해당 예약을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {
            postDelete();
        }
    }


    const [platformSelected, setPlatformSelected] = useState("");
    const handlePlatformSelect = (e) => {
        setPlatformSelected(e.target.value);
    };

    
    console.log("초기 Paystatus",payStatusSelected);
    const handlepayStatusSelect = (e) => {
        e.preventDefault();
        setPayStatusSelected(e.target.value);
        console.log("선택값",e.target.value);
        if(e.target.value === "취소"){
            setPayStatusSelected("환불/취소");
            console.log("취소환불클릭");
            console.log("취소누르고",payStatusSelected);
        }else if(e.target.value === "미결제"){
            setPayStatusSelected("미결제");
            console.log("미결제");
            console.log("미결제누르고",payStatusSelected);
        }else{
            setPayStatusSelected("결제완료");
        }
    };

    let paymentInput;
    if (detail_Info !== null) {
        if(payStatusSelected === "결제완료"){
            paymentInput = <div className="infowrap">
            <div className="infoRow">
                <p className="infoLabel">결제 상태</p>
                <select name="payStatus" id="paymentStatus" defaultValue={detail_Info[0]?.payStatus} onChange={handlepayStatusSelect}>
                    <option value="결제완료">결제완료</option>
                    <option value="미결제">미결제</option>
                    <option value="취소">환불/취소</option>
                </select>
            </div>
            <div className="infoRow">
                <p className="infoLabel">결제 방식</p>
                <select name="payType" id="payMethod" defaultValue={detail_Info[0]?.payType}>
                    <option value="계좌이체">계좌이체</option>
                    <option value="신용카드">신용카드</option>
                    <option value="네이버페이">네이버페이</option>
                    <option value="카카오페이">카카오페이</option>
                </select>
            </div>
            <div className="infoRow">
                <p className="infoLabel">결제 금액</p>
                <div className="dataLabel">
                    <input className="modifyReservationInput" name="payPrice" type="text" required='true' autoComplete='off' placeholder={detail_Info[0]?.payPrice+"원"} />
                </div>
            </div>
        </div>
        }else if(payStatusSelected === "미결제"){
            paymentInput = <div className="infowrap">
            <div className="infoRow">
                <p className="infoLabel">결제 상태</p>
                <select name="payStatus" id="paymentStatus" defaultValue={detail_Info[0]?.payStatus} onChange={handlepayStatusSelect}>
                    <option value="결제완료">결제완료</option>
                    <option value="미결제">미결제</option>
                    <option value="취소">환불/취소</option>
                </select>
            </div>
            <div className="infoRow">
                <p className="infoLabel">결제 대기 금액</p>
                <div className="dataLabel">
                    <input className="modifyReservationInput" name="payPrice" type="text" required='true' autoComplete='off' placeholder="결제 대기 금액을 입력하세요" />
                </div>
            </div>
        </div>
        }else{//취소/환불
            paymentInput = <div className="infowrap">
                <div className="infoRow">
                    <p className="infoLabel">결제 상태</p>
                    <select name="payStatus" id="paymentStatus" defaultValue={detail_Info[0]?.payStatus} onChange={handlepayStatusSelect}>
                        <option value="결제완료">결제완료</option>
                        <option value="미결제">미결제</option>
                        <option value="취소">환불/취소</option>
                    </select>
                </div>
                <div className="infoRow">
                    <p className="infoLabel">결제 방식</p>
                    <select name="payType" id="payMethod" defaultValue={detail_Info[0]?.payType}>
                        <option value="계좌이체">계좌이체</option>
                        <option value="신용카드">신용카드</option>
                        <option value="네이버페이">네이버페이</option>
                        <option value="카카오페이">카카오페이</option>
                    </select>
                </div>
                <div className="infoRow">
                    <p className="infoLabel">결제 금액</p>
                    <div className="dataLabel">
                        <input className="modifyReservationInput" name="payPrice" type="text" required='true' autoComplete='off' placeholder={detail_Info[0]?.payPrice+"원"} />
                    </div>
                </div>
                <div className="infoRow">
                    <p className="infoLabel">환불 금액</p>
                    <div className="dataLabel">
                    {detail_Info[0]?.returnPrice ? <input className="modifyReservationInput" name="returnPrice" type="text" required='true' autoComplete='off' placeholder={detail_Info[0]?.returnPrice+'원'}/> :
                        <input className="modifyReservationInput" name="returnPrice" type="text" required='true' autoComplete='off' placeholder='환불금액을 입력하세요' />}
                    </div>
                </div>
                <div className="infoRow">
                    <p className="infoLabel">환불 사유</p>
                    <div className="dataLabel">
                        {detail_Info[0]?.returnWhy ? <input className="modifyReservationInput" name="returnWhy" type="text" required='true' autoComplete='off' placeholder={detail_Info[0]?.returnWhy}/> :
                        <input className="modifyReservationInput" name="returnWhy" type="text" required='true' autoComplete='off' placeholder='환불/취소 사유를 입력하세요'/>}
                        
                    </div>
                </div>
            </div>
        }
    }
    





    const handleEditSubmit=(e)=>{
        e.preventDefault();
        const reservation_status = e.target.reservation_status.value;
        const reservation_checkIn = e.target.reservation_checkIn.value;
        const reservation_checkOut = e.target.reservation_checkOut.value;
        const platform = e.target.platform.value;
        const bookerName = e.target.bookerName.value;
        const bookerCall = e.target.bookerCall.value;
        const bookingPeople = e.target.bookingPeople.value;
        const payment_id = 1;
        const payStatus = e.target.payStatus.value;
        const payFinish = "-";
        const payType = e.target.payType.value;
        const payPrice = e.target.payPrice.value;
        const returnPrice = e.target.returnPrice.value;
        const returnDate = "-";
        const returnWhy = e.target.returnWhy.value;
        console.log("reservation_status",reservation_status);
        console.log("reservation_checkIn",reservation_checkIn);
        console.log("reservation_checkOut",reservation_checkOut);
        console.log("platform",platform);
        console.log("bookerName",bookerName);
        console.log("bookerCall",bookerCall);
        console.log("bookingPeople",bookingPeople);
        console.log("payment_id",payment_id);
        console.log("payStatus",payStatus);
        console.log("payFinish",payFinish);
        console.log("payType",payType);
        console.log("payPrice",payPrice);
        console.log("returnPrice",returnPrice);
        console.log("returnDate",returnDate);
        console.log("returnWhy",returnWhy);
        

        // const postEditSpace = async () => {
        //     try {
        //         setDetailInfo(null);
        //         const response = await axios.post(
        //             'http://3.219.192.160:3000/manage_rsv/update',{
        //             user: 1,
        //             space_id:params,

                    
        //         }
        //         );
        //         console.log("edit reservation response : ",response.data);
        //         window.confirm('예약정보를 수정했습니다');
        //     } catch (e) {
        //         console.log("error: ",e);
        //         window.alert('예약정보를 수정하지 못했습니다.');
        //     }
        // }
        // postEditSpace();
        setIsModify(false);
    }

    const postDelete= async () => {
        try {
            const response = await axios.post(
                'http://3.219.192.160:3000/manage_rsv/delete', {
                //보내고자 하는 데이터 
                reservation_id: params,
                user: 1
            });
            console.log("Delete Complete", response.data);
            navigate(-1);
        }
        catch (e) {
            console.log('error',e);
        }
    }
    /////////////////////////////예약 삭제///////////////////////////////////////////////////////////////////////////


    if (!detail_Info) return (
        <div className="reservation">
            <div className="rsvtop_loading">
                <div className="spacelabel">
                    <p>예약현황 </p>
                    <div className="buttons">
                        <div className="editButton">
                            <button className='edit' onClick={() => setIsModify(true)}>예약 수정하기</button>
                        </div>
                        <div className="deleteButton">
                            <button className='delete' onClick={() => removeReservation()}>예약 삭제하기</button>
                        </div>

                    </div>
                </div>
                <div className="spinner">
                    <Spin size="large" />
                </div>
            </div>
        </div>);
    return (
        <div className="detailContainer">
            <div className="spacelabel">
                <p>예약현황 </p>
                <div className="buttons">
                    <div className="editButton">
                        <button className='edit' onClick={() => setIsModify(true)}>예약 수정하기</button>
                    </div>
                    <div className="deleteButton">
                        <button className='delete' onClick={() => removeReservation()}>예약 삭제하기</button>
                    </div>

                </div>
            </div>
            {isModify ?
                <form className="detailWrapper" >
                    <div className="detail_left">
                        <BaseCard padding='0'>
                            <div className="reservInfo">
                                <div className="detailLabel">
                                    예약 정보
                                </div>
                                <div className="infoContent">
                                    <div className="infowrap">
                                        <div className="infoRow">
                                            <p className="infoLabel">공간이름</p>
                                            <div className="dataLabel">
                                                <p>{detail_Info[0]?.displayName}</p>
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">플랫폼</p>
                                            <div className="dataLabel" id="select">
                                                <select onChange={handlePlatformSelect} name="platform" value={platformSelected}>
                                                    <option value='스페이스클라우드'>스페이스클라우드</option>
                                                    <option value='에어비앤비'>에어비앤비</option>
                                                    <option value='네이버예약'>네이버예약</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">체크인</p>
                                            <div className="dataLabel">
                                                <input className="modifyReservationInput" name="reservation_checkIn" type="datetime-local" required='true' autoComplete='off' placeholder='22년 2월 3일 16:00' />
                                            </div>
                                        </div>
                                        
                                        <div className="infoRow">
                                            <p className="infoLabel">체크아웃</p>
                                            <div className="dataLabel">
                                                <input className="modifyReservationInput" name="reservation_checkOut" type="datetime-local" required='true' autoComplete='off' placeholder='22년 2월 3일 16:00' />
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">예약인원</p>
                                            <div className="dataLabel">
                                                <input className="modifyReservationInput" name="bookingPeople" type="text" required='true' autoComplete='off' placeholder={detail_Info[0]?.bookingPeople+"명 수정시 숫자만 입력하세요"} />
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
                                                    <input className="modifyReservationInput" name="bookerName" type="text" required='true' autoComplete='off' placeholder='윤태인' />
                                                </div>
                                            </div>
                                            <div className="infoRow">
                                                <p className="infoLabel">연락처</p>
                                                <div className="underLine"></div>
                                                <div className="dataLabel">
                                                    <input className="modifyReservationInput" name="bookerCall" type="text" required='true' autoComplete='off' placeholder='010-2323-2323' />
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
                                        {paymentInput}
                                    </div>
                                </div>
                            </BaseCard>
                        </div>
                        <div className="buttons">
                            <div className="editButton">
                                <input type="submit" value="등록하기" className="editReservationComplete" />
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
                                                <p>{detail_Info[0]?.displayName}</p>
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">체크인</p>
                                            <div className="dataLabel">
                                                <p>{detail_Info[0]?.checkIn}</p>
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">체크아웃</p>
                                            <div className="dataLabel">
                                                <p>{detail_Info[0]?.checkOut}</p>
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">예약요청일</p>
                                            <div className="dataLabel">
                                                <p>{detail_Info[0]?.reservation_request_date}</p>
                                            </div>
                                        </div>
                                        <div className="infoRow">
                                            <p className="infoLabel">예약인원</p>
                                            <div className="dataLabel">
                                                <p>{detail_Info[0]?.bookingPeople}명</p>
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
                                                    <p>{detail_Info[0]?.bookerName}</p>
                                                </div>
                                            </div>
                                            <div className="infoRow">
                                                <p className="infoLabel">연락처</p>
                                                <div className="underLine"></div>
                                                <div className="dataLabel">
                                                    <p>{detail_Info[0]?.bookerCall}</p>
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
                                                    <p>{detail_Info[0]?.payStatus}</p>
                                                </div>
                                            </div>
                                            {refund ? <div className="infoRow">
                                                <p className="infoLabel">환불 사유</p>
                                                <div className="dataLabel">
                                                    <p>{detail_Info[0]?.returnWhy}</p>
                                                </div>
                                            </div> : <div className="infoRow">
                                                <p className="infoLabel">결제 방식</p>
                                                <div className="dataLabel">
                                                    <p>{detail_Info[0]?.payType}</p>
                                                </div>
                                            </div>
                                            }

                                            <div className="infoRow">
                                                <p className="infoLabel">결제 금액</p>
                                                <div className="dataLabel">
                                                    <p>{detail_Info[0]?.payPrice}원</p>
                                                </div>
                                            </div>
                                            {refund && <div className="infoRow">
                                                <p className="infoLabel">환불 금액</p>
                                                <div className="dataLabel">
                                                    <p>{detail_Info[0]?.returnPrice}원</p>
                                                </div>
                                            </div>}
                                            <div className="paymentEdit">
                                                {paystatus ?
                                                    <div className="quickButton">
                                                        {refund ? '' : <button className='cancelrefund' onClick={() => openModal()}>환불 / 취소하기</button>}
                                                    </div>
                                                    : <div className="quickButton">
                                                        {unpayed && <button className='payComplete' onClick={() => changePayStatus()}>결제완료하기</button>}
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
                                <button className='edit' onClick={() => setIsModify(true)}>예약 수정하기</button>
                            </div>
                            <div className="deleteButton">
                                <button className='delete' onClick={() => removeReservation()}>예약 삭제하기</button>
                            </div>

                        </div>
                    </div>
                    <div className="modalpopup">
                        <Modal open={modalOpen} close={closeModal} header="환불 / 취소하기">
                            <form onSubmit={handleSubmit}>
                                {inputs.map((input) => (
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
                                <input type="submit" value="수정하기" onClick={changeRefundStatus} className="submitButton" />
                            </form>
                        </Modal>
                    </div>
                </div>}
        </div>

    )
}

export default Detail