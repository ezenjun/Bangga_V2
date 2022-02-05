import React,{useState} from 'react';
import { useMatch } from "react-router-dom";
import { useParams } from "react-router";
import './spaceDetail.css'
import BaseCard from '../../../components/Card/BaseCard';
// import SpaceList from '../../../assets/JSON/SpaceList.json'

const SpaceDetail = () => {
    const [isModify, setIsModify] = useState(false);
    
    const removeSpace = async function() {
        if(window.confirm('해당 공간을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {
            
        }
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        window.confirm('공간정보를 수정했습니다');
        setIsModify(false);
    }

    const read = (
        <div className="detailInfo">
            <div className="spaceDetailTop">
                <div className="detailLeft">
                    <div className="LabelSpaceName">유메노이에 공간의 세부정보</div>
                    <div className="spaceNameInfo">
                        <div className="infoLabelText">공간이름</div>
                        유메노이에
                    </div>
                    <div className="spacePlatform">
                        <div className="infoLabelText">플랫폼</div>
                        스페이스클라우드
                    </div>
                    <div className="spaceType">
                        <div className="infoLabelText">공간 유형</div>
                        파티룸
                    </div>
                    <div className="spaceDeposit">
                        <div className="infoLabelText">공간 보증금</div>
                        10000원
                    </div>
                    <div className="SpaceAccomodation">
                        <div className="infoLabelText">최대인원</div>
                        8명
                    </div>
                    <div className="SpaceAccomodation">
                        <div className="infoLabelText">공간 등록일</div>
                        2021년 8월 23일
                    </div>
                </div>
                <div className="detailRight">
                    <div className="LabelSpaceName">옵션정보</div>
                    <div className="spaceNameInfo">
                        <div className="infoLabelText">옵션 이름</div>
                        불멍
                    </div>
                    <div className="spacePlatform">
                        <div className="infoLabelText">옵션 가격</div>
                        25000원
                    </div>
                    <div className="spaceType">
                        <div className="infoLabelText">옵션 최대수량</div>
                        3개
                    </div>
                </div>
            </div>
            <div className="spaceDetailBottom">
                <div className="editSpace" onClick={()=>setIsModify(true)}>공간 수정하기</div>
                <div className="deleteSpace" onClick={()=>removeSpace()}>공간 삭제하기</div>
            </div>
        </div>
        );
    const modify = (
        <form className="detailInfo" onSubmit={handleSubmit}>
            <div className="spaceDetailTop">
                <div className="detailLeft">
                    <div className="LabelSpaceName">유메노이에 공간의 세부정보</div>
                    <div className="spaceNameInfo">
                        <div className="infoLabelText">공간이름</div>
                        <input className="modifySpaceInput" type="text" required='true' autoComplete='off' placeholder='유메노이에'/>
                    </div>
                    <div className="spacePlatform">
                        <div className="infoLabelText">플랫폼</div>
                        <input className="modifySpaceInput" type="text" required='true' autoComplete='off' placeholder='스페이스클라우드'/>
                    </div>
                    <div className="spaceType">
                        <div className="infoLabelText">공간 유형</div>
                        <input className="modifySpaceInput" type="text" required='true' autoComplete='off' placeholder='파티룸'/>
                    </div>
                    <div className="spaceDeposit">
                        <div className="infoLabelText">공간 보증금</div>
                        <input className="modifySpaceInput" type="text" required='true' autoComplete='off' placeholder='1000원'/>
                    </div>
                    <div className="SpaceAccomodation">
                        <div className="infoLabelText">최대인원</div>
                        <input className="modifySpaceInput" type="text" required='true' autoComplete='off' placeholder='8명'/>
                    </div>
                    <div className="SpaceAccomodation">
                        <div className="infoLabelText">공간 등록일</div>
                        <input className="modifySpaceInput" type="date" required='true' autoComplete='off' placeholder='2021년 8월 23일'/>
                    </div>
                </div>
                <div className="detailRight">
                    <div className="LabelSpaceName">옵션정보</div>
                    <div className="spaceNameInfo">
                        <div className="infoLabelText">옵션 이름</div>
                        <input className="modifySpaceInput" type="text" required='true' autoComplete='off' placeholder='불멍'/>
                    </div>
                    <div className="spacePlatform">
                        <div className="infoLabelText">옵션 가격</div>
                        <input className="modifySpaceInput" type="text" required='true' autoComplete='off' placeholder='25000원'/>
                    </div>
                    <div className="spaceType">
                        <div className="infoLabelText">옵션 최대수량</div>
                        <input className="modifySpaceInput" type="text" required='true' autoComplete='off' placeholder='3개'/>
                    </div>
                </div>
            </div>
            <div className="spaceDetailBottom">
                <input type="submit" value="등록하기" className="editSpaceComplete"/>
            </div>
        </form>
    );


    return (
        <div className="DetailSpace">
            <div className="SpaceWrapper">
                <div className="spacelabel">
                    <p>공간관리 </p>
                </div>
                {isModify ? modify : read}
            </div> 
        </div>
)};

export default SpaceDetail;
