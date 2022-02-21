import React,{useState,useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router";
import './spaceDetail.css'
import { Spin } from 'antd';


// import SpaceList from '../../../assets/JSON/SpaceList.json'

const SpaceDetail = () => {
    const [isModify, setIsModify] = useState(false);
    const [detailInfo, setDetailInfo] = useState('');

    const [platformSelected, setPlatformSelected] = useState("");

    const handlePlatformSelect = (e) => {
        setPlatformSelected(e.target.value);
    };

    const [statusSelected, setStatusSelected] = useState("");

    const handleStatusSelect = (e) => {
        setStatusSelected(e.target.value);
    };

    const [typeSelected, setTypeSelected] = useState("");

    const handleTypeSelect = (e) => {
        setTypeSelected(e.target.value);
    };


    let params = useParams().id;
    console.log("params:",params);
    const fetchDetailSpace = async () => {
        try {
            setDetailInfo(null);
            const response = await axios.post(
                'http://3.219.192.160:3000/space/detail',{
                user: 1,
                space_id:params,
        }
          );
          console.log("detail response : ",response.data);
          setDetailInfo(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          // setError(e);
        }
        // setLoading(false);
    };
    
    useEffect(() => {
        fetchDetailSpace();
    }, []);
    
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        const displayName = e.target.displayName.value;
        const platform = e.target.platform.value;
        var status = e.target.status.value;
        const type = e.target.type.value;
        var is_Deposit = 0;
        const depositPrice = e.target.depositPrice.value;
        const minPeople = e.target.minPeople.value;
        const maxPeople = e.target.maxPeople.value;
        if(depositPrice > 0 ){
            is_Deposit = 1;
        }
        if(status==="운영중"){
            status = 1;
        }else{
            status = 0;
        }
        console.log(displayName);
        console.log(platform);
        console.log(status);
        console.log(type);
        console.log(depositPrice);
        console.log(minPeople);
        console.log(maxPeople);
        const postEditSpace = async () => {
            try {
                setDetailInfo(null);
                const response = await axios.post(
                    'http://3.219.192.160:3000/space/update',{
                    user: 1,
                    space_id:params,
                    platform:platform,
                    status:status,
                    displayName:displayName,
                    type:type,
                    is_Deposit:is_Deposit,
                    depositPrice:depositPrice,
                    minPeople:minPeople,
                    maxPeople:maxPeople,
                }
                );
                console.log("detail response : ",response.data);
                window.confirm('공간정보를 수정했습니다');
            } catch (e) {
                console.log("error: ",e);
                window.alert('공간정보를 수정하지 못했습니다.');
            }
        }
        postEditSpace();
        setIsModify(false);
        fetchDetailSpace();
    }
    const navigate = useNavigate();
    const removeSpace = async function() {
        if(window.confirm('해당 공간을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {
            postDeleteSpace();
        }
    }
    const postDeleteSpace= async () => {
        try {
            setDetailInfo(null);
            const response = await axios.post(
                'http://3.219.192.160:3000/space/delete',{
                user: 1,
                space_id:params,
            }
            );
            console.log("detail response : ",response.data);
            window.confirm('공간정보를 삭제했습니다');
        } catch (e) {
            console.log("error: ",e);
            window.alert('공간정보를 삭제하지 못했습니다.');
        }
        navigate(-1);
    }

    if (!detailInfo) 
        return (
        <div className="DetailSpace">
            <div className="SpaceWrapper">
                <div className="spacelabel">
                    <p>공간관리 </p>
                </div>
                <div className="spinner">
                    <Spin size="large"/>
                </div>
            </div> 
        </div>
    );
    return (
        <div className="DetailSpace">
            <div className="SpaceWrapper">
                <div className="spacelabel">
                    <p>공간관리 </p>
                </div>
                {isModify ? 
                <form className="detailInfo" onSubmit={handleSubmit}>
                    <div className="spaceDetailTop">
                        <div className="detailLeft">
                            <div className="LabelSpaceName">{detailInfo[0]['displayName']} 공간의 세부정보</div>
                            <div className="spaceNameInfo">
                                <div className="infoLabelText">공간이름</div>
                                <input className="modifySpaceInput" name="displayName" type="text" required='true' autoComplete='off' placeholder={detailInfo[0]['displayName']}/>
                                
                            </div>
                            <div className="spacePlatform">
                                <div className="infoLabelText">플랫폼</div>
                                <select onChange={handlePlatformSelect} name="platform" value={platformSelected}>
                                    <option value='스페이스클라우드'>스페이스클라우드</option>
                                    <option value='에어비앤비'>에어비앤비</option>
                                    <option value='네이버예약'>네이버예약</option>
                                </select>
                            </div>
                            <div className="spaceNameInfo">
                                <div className="infoLabelText">운영 상태</div>
                                <select onChange={handleStatusSelect} name="status" value={statusSelected}>
                                    <option value='운영중'>운영중</option>
                                    <option value='운영종료'>운영종료</option>
                                </select>
                            </div>
                            <div className="spaceDeposit">
                                <div className="infoLabelText">공간 보증금</div>
                                <input className="modifySpaceInput" name="depositPrice" type="text" required='true' autoComplete='off' placeholder={detailInfo[0]['depositPrice']+'원'}/>
                                
                            </div>
                            <div className="SpaceAccomodation">
                                <div className="infoLabelText">최소인원</div>
                                <input className="modifySpaceInput" name="minPeople" type="text" required='true' autoComplete='off' placeholder={detailInfo[0]['minPeople']+'명'}/>
                            </div>
                            <div className="SpaceAccomodation">
                                <div className="infoLabelText">최대인원</div>
                                <input className="modifySpaceInput" name="maxPeople" type="text" required='true' autoComplete='off' placeholder={detailInfo[0]['maxPeople']+'명'}/>
                            </div>
                        </div>
                        <div className="detailRight">
                            <div className="LabelSpaceName"></div>
                            <div className="spaceType">
                                <div className="infoLabelText">공간 유형</div>
                                <select onChange={handleTypeSelect} name="type" value={typeSelected}>
                                    <option value='파티룸'>파티룸</option>
                                    <option value='공유주방'>공유주방</option>
                                    <option value='촬영장'>촬영장</option>
                                    <option value='펜션'>펜션</option>
                                    <option value='사무실'>사무실</option>
                                </select>
                                {/* {detailInfo[0]['type']} */}
                            </div>
                            <div className="SpaceAccomodation">
                                <div className="infoLabelText">공간 등록일</div>
                                {detailInfo[0]['created']}
                            </div>
                            <input type="submit" value="등록하기" className="editSpaceComplete"/>
                        </div>
                    </div>
                    
                </form> 
        : 
        <div className="detailInfo">
            <div className="spaceDetailTop">
                <div className="detailLeft">
                    <div className="LabelSpaceName">{detailInfo[0]['displayName']} 공간의 세부정보</div>
                    <div className="spaceNameInfo">
                        <div className="infoLabelText">공간이름</div>
                        {detailInfo[0]['displayName']}
                    </div>
                    <div className="spacePlatform">
                        <div className="infoLabelText">플랫폼</div>
                        {detailInfo[0]['platform']!==null ? detailInfo[0]['platform']:'플랫폼이 등록되지 않았습니다'}
                    </div>
                    <div className="spaceNameInfo">
                        <div className="infoLabelText">운영 상태</div>
                        {detailInfo[0]['status']}
                    </div>
                    <div className="spaceDeposit">
                        <div className="infoLabelText">공간 보증금</div>
                        {detailInfo[0]['depositPrice']} 원
                    </div>
                    <div className="SpaceAccomodation">
                        <div className="infoLabelText">최소인원</div>
                        {detailInfo[0]['minPeople']}
                    </div>
                    <div className="SpaceAccomodation">
                        <div className="infoLabelText">최대인원</div>
                        {detailInfo[0]['maxPeople']} 명
                    </div>
                </div>
                <div className="detailRight">
                    <div className="LabelSpaceName"></div>
                    <div className="spaceType">
                        <div className="infoLabelText">공간 유형</div>
                        {detailInfo[0]['type']}
                    </div>
                    <div className="SpaceAccomodation">
                        <div className="infoLabelText">공간 등록일</div>
                        {detailInfo[0]['created']}
                    </div>
                </div>
            </div>
            <div className="spaceDetailBottom">
                <div className="editSpace" onClick={()=>setIsModify(true)}>공간 수정하기</div>
                <div className="deleteSpace" onClick={()=>removeSpace()}>공간 삭제하기</div>
            </div>
        </div>}
            </div> 
        </div>
)};

export default SpaceDetail;
