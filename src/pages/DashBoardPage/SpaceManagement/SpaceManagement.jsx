import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal/Modal'
import FormInput from '../../../components/FormInput/FormInput';
import Table from '../../../components/Table/Table';
import { Spin } from 'antd';
import './spacemanagement.css'


const SpaceManagement = () => {
    const [SpaceList, setSpaceList] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let params = useParams().id;
    const fetchSpaceList = async () => {
        try {
          // 요청이 시작 할 때에는 error 와 users 를 초기화하고
          // setError(null);
            setSpaceList(null);
            // loading 상태를 true 로 바꿉니다.
            // setLoading(true);
            const response = await axios.post(
                'http://3.219.192.160:3000/space',{
                //보내고자 하는 데이터 
                user: 1
        }
          );
          console.log("response : ",response.data);
          setSpaceList(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          // setError(e);
        }
        // setLoading(false);
    };
    
    useEffect(() => {
        fetchSpaceList();
    }, []);


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

    const inputs =[
        {
            id: 1, 
            select: false,
            name:"displayName",
            type:"text",
            placeholder:"공간 이름을 입력하세요", 
            errorMessage:"*필수 입력 사항입니다.",
            label:"공간이름",
            required: true,
            options:[]
        },
        {
            id: 2, 
            select: true,
            name:"spaceType",
            type:"text",
            placeholder:"등록 플랫폼을 선택하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"등록 플랫폼",            
            required: true,
            options:[
                '스페이스클라우드', '에어비앤비', '네이버예약'
            ]
        },
        {
            id: 3, 
            select: true,
            name:"spaceType",
            type:"text",
            placeholder:"예약 공간의 유형을 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"공간 유형",            
            required: true,
            options:[
                '파티룸', '공유주방', '촬영장', '펜션', '사무실'
            ]
        },
        {
            id: 4, 
            select: true,
            name:"is_Deposit",
            type:"text",
            placeholder:"청소보증금 수취 여부를 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"청소보증금 수취 여부",
            required: true,
            options:[
                '네', '아니요',
            ],
        },
        {
            id: 5, 
            select: false,
            name:"minPeople",
            type:"text",
            placeholder:"최소 인원을 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"최소 인원",
            required: true,
            options:[]
        },
        {
            id: 6, 
            select: false,
            name:"maxPeople",
            type:"text",
            placeholder:"최대 인원을 입력하세요",
            errorMessage:"*필수 입력 사항입니다.",
            label:"최대 인원",
            required: true,
            options:[]
        },
    ]

    const spaceTableHead = [
        '운영상태',
        '공간 이름',
        '공간 유형',
        '청소보증금 여부',
        '청소보증금',
        '최소인원',
        '최대인원',
    ]
    const SpaceActive = (status) =>{
        if(status==="운영중"){
            return <div className="spaceActive">
                운영중
            </div>
        }else {
            return <div className="spaceClosed">
                운영종료
            </div>
        }
        
    }
    const cleanActive = (status) =>{
        if(status==="수취중"){
            return "O"
        }else {
            return "X"
        }
        
    }

    const navigate = useNavigate();
    const handleRowClick = (index) => {
        navigate(`./:${index}`);
    } 


    const renderHead = (item,index) => <th key={index}>{item}</th>
    const renderBody = (item,index) => (
        <tr className="tablerow" key={index} onClick={()=> handleRowClick(item.id)}>
            {item.status!=null ? <td width={'60px'}>{SpaceActive(item.status)}</td> : <td>-</td> }
            {item.displayName!=null ? <td width={'150px'}>{item.displayName}</td> : <td>스페이스클라우드</td> }
            {item.type!=null ? <td  width={'150px'}>{item.type}</td> : <td>-</td> }
            {item.is_Deposit!=null ? <td className='clean' width={'80px'}>{cleanActive(item.is_Deposit)}</td> : <td>-</td> }
            {item.depositPrice!=null ? <td  width={'150px'}>{item.depositPrice}</td> : <td>-</td> }
            {item.minPeople!=null ? <td  width={'80px'}>{item.minPeople} 명</td> : <td>-</td> }
            {item.maxPeople!=null ? <td  width={'80px'}>{item.maxPeople} 명</td> : <td>-</td> }
        </tr>
        
    )

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        alert("공간이 등록되었습니다.");
        closeModal();
    }

    const onChange= (e)=>{
        setValues({...values,[e.target.name]: e.target.value});
    }
    console.log(values);
    if (!SpaceList) return (
        <div className="spaceManagement">
            <div className="rsvtop_loading">
                <div className="spacelabel">
                    <p>공간관리 </p>
                </div>
                <div className="spinner">
                    <Spin size="large"/>
                </div>
                
            </div>
        </div>) ;
    return (
        <div className='spaceManagement'>
            <div className="spacelabel">
                <p>공간관리 </p>
                <div className="reservation_status">
                    <p>총  </p>
                    <p className='appcolor '>&nbsp; {SpaceList.length} &nbsp;</p>
                    <p> 개의 공간을 운영중입니다!</p>
                </div>
                <div className="registerReservation">
                    <div className="addButton" onClick={() => openModal()}>
                        <p className='plus'>+</p>
                        <p>&nbsp;공간 등록하기</p>
                    </div>
                </div>
            </div>

            <div className="spaceList">
                <Table
                    limit='12'
                    headData = {spaceTableHead}
                    renderHead = {(item, index) => renderHead(item, index)}
                    bodyData = {SpaceList}
                    renderBody = {(item, index) => renderBody(item, index)}
                />
                {/* <div className='eachCard'>
                    <BaseCard> 
                        <div className="spaceCard">
                            <div className="spaceName">
                                <div className="appcolor">유메노이에</div>
                            </div>
                            <div className="spaceInfo">
                                <div className="infoLeft">
                                    <div className="spaceType">공간유형</div>
                                    <div className="spaceType">청소 보증금</div>
                                    <div className="spaceType">공간 생성일</div>
                                    <div className="spaceType">최대인원</div>
                                </div>
                                <div className="infoRight">
                                    <div className="spaceType">파티룸</div>
                                    <div className="spaceType">수취</div>
                                    <div className="spaceType">2021.07.19</div>
                                    <div className="spaceType">4명</div>
                                </div>
                                
                            </div>
                        </div>
                    </BaseCard>
                </div>*/}
                
            </div>
            {/* <div className="modalpopup">
                <Modal open={modalOpen} close={closeModal} header="공간 등록하기">
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
                        <input type="submit" value="등록하기" className="submitButton"/>
                    </form>
                </Modal>
            </div> */}
        </div>
    )
}

export default SpaceManagement
