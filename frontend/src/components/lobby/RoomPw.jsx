import axios from "axios";
import { useState } from "react";
import {  Modal } from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import Styles from "./RoomPw.module.css";
import swal from 'sweetalert2';

function RoomPw(props) { //위의 숏컷 연산이 props안에 다 들어있음.
  //room 비밀번호용 - MainLobby로 이사예정
  const { onHide } = props;
  
  //사용자가 입력한 비번
  const [enterpw, setEnterpw] = useState("");
  const getPW = (e) => {
    setEnterpw(e.target.value); //이게 이제 roomTitle을 이 값으로 지정한 것.
  };
  const clearPW = (e) => {
    setEnterpw(""); //이게 이제 roomTitle을 이 값으로 지정한 것.
  };
  

  //비번이 틀린경우
  const wrongPw = () => {
    swal.fire({
      text: "비밀번호가 틀렸습니다.",
      icon: 'warning',
      confirmButtonColor: '#73E0C1',
      confirmButtonText: '확인'
    })
    .then((result) => {
      console.log("sweetalert", result);
    })
  }

  //방이 꽉찬 경우
  const roomPull = () => {
    swal.fire({
      text: "방 정원이 초과되었습니다.",
      icon: 'warning',
      confirmButtonColor: '#73E0C1',
      confirmButtonText: '확인'
    })
    .then((result) => {
      console.log("sweetalert", result);
    })
  }

  //존재하지 않는 방
  const noRoom = () => {
    swal.fire({
      text: "방이 존재하지 않습니다..",
      icon: 'warning',
      confirmButtonColor: '#73E0C1',
      confirmButtonText: '확인'
    })
    .then((result) => {
      console.log("sweetalert", result);
    })
  }

  //차단된 사용자
  const Ban = () => {
    swal.fire({
      text: "방 입장이 제한된 사용자입니다.",
      icon: 'warning',
      confirmButtonColor: '#73E0C1',
      confirmButtonText: '확인'
    })
    .then((result) => {
      console.log("sweetalert", result);
    })
  }

  //입장 실패
  const fail = () => {
    swal.fire({
      text: "방 입장 실패!(비밀번호, 방 정원등을 확인하세요) ",
      icon: 'warning',
      confirmButtonColor: '#73E0C1',
      confirmButtonText: '확인'
    })
    .then((result) => {
      console.log("sweetalert", result);
    })
  }

  //여기서 입력을 누를때 값을 넘기고, 값이 맞으면 그때 네비게이션으로 페이지 넘기기
  const navigate = useNavigate();


  // 정상입장: {200, “Success”}
  //방 입장하려고 값 보내기
  const EnterRoom = (e) => {
    axios 
    .post(
      "https://i6a306.p.ssafy.io:8080/api/v1/lobby/enter",
      {
        room_seq: parseInt(props.roomseq),
        password: enterpw,
      },
      {
        headers:{
          "Content-Type": "application/json",
          Authorization: props.state[0].token, 
        },
      }
      )
      .then((res) => {
        if(res.status === 200){
          navigate(`/Room/${props.mode}/${props.roomseq}`)
        }
        else if(res.status !== 200){
          }
        })
        .catch((res) => {
      // 입장거절: {402, "차단된 사용자"}, {403, "방 정원초과"}, {404, "비밀번호 불일치"}, {405, "존재하지 않는 방"}
          console.log("catch:",res);
          fail();
        })
        
  };


  return (
    <div>

      <Modal
        {...props}
      >
          <div className={Styles.bigtable}>
            <Modal.Body className={Styles.createroombg}>
              <div className={Styles.inputPW}>
                <span className={Styles.hfont}>비밀번호: &nbsp;</span>
                <input
                  className={Styles.inputbox}
                  id="roompw"
                  name="roompw"
                  type="password"
                  onChange={getPW}
                  placeholder=" 비밀번호를 입력하세요"
                ></input>
                &nbsp;
                <button className={Styles.button} onClick={EnterRoom}>
                  입력
                </button>
                <button className={Styles.button} onClick={onHide}>
                  닫기
                </button>
              </div>
            </Modal.Body>
          </div>
      </Modal>
    </div>
  );
}
export default RoomPw;
