import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// 장점
// 1. 스타일이 다른 js 파일로 오염되지 않음
// react 는 결국 코드를 하나로 합치는 과정을 겪는데 (css 파일도 하나로 합치게 됨)
// 이때 서로 간섭을 하게 됨.
// 여기 정의된 styled components 는 해당 js 파일 내부에서만 영향력이 있음
// 단, App.css 가 아니라 App.module.css 라고 이름을 정하면, App.js 에만 정속이 되도록 정의할 수도 있음
// 2. css 파일이 별도로 필요하지 않기 때문에 로딩 시간이 빨라짐!
let ColoredBtn = styled.button`
    background: ${ props => props.bg };
    color: ${ props => props.bg === 'blue' ? 'white' : 'black' };
    padding: 10px;
`
// let ColoredBtnIpl = styled.button(ColoredBtn)`
//     width: 100px;
// `
let BlackBox = styled.div`
    background: grey;
    padding: 20px;
`
let Alert = styled.h1`
    background: red;
    color: white;
    width: 400px;
    padding: 10px;
`

function Detail(props) {

    let {id} = useParams();
    let shoes = props.shoes.find((x) => {
        return x.id == id
    })
    const img = parseInt(id) + 1;
    const url = "https://codingapple1.github.io/shop/shoes" + img + ".jpg";
    console.log(url)

    let [timer, updateTimer] = useState(true)
    let [check, updateCheck] = useState(false)
    let input = useRef('')
    let onChangeHandler = (e) => {
        input.current = e.target.value;
        console.log(typeof(input.current))
        if (typeof(input.current) === "dd") {
            updateCheck(true)
        } else {
            updateCheck(false)
        }
    }

    // useEffect 기본 문법
    useEffect(() => {
        console.log("hallo")
        // html rendering 이 끝난 후에 호출 됩니다.
        // 시간이 많이 걸리는 부분은 이 곳에 작성하면
        // 사용자 입장에서 로딩이 오래 걸린다는 인상을 주는 것을 피할 수 있음!
        // 1. 어려운 연산
        // 2. 서버에서 데이터 가져오는 작업
        // 3. 타이머 장착 같은 거
        let myTimer = setTimeout(() => {
            updateTimer(false)
        }, 2000)

        return () => {
            // unmount 시 1회 실행
            // clean up function
            // useEffect 실행되기 전에 실행
            // react 특성 상 리랜더링이 잦아서 이거 없으면 timer 가 계속 생성됨
            // 그래서 여기에 "기존 timer 는 제거해주세요" 라는 코드를 짜야함
            clearTimeout(myTimer)
        }
    }, []) 
    // with [] : mount 시 1회만 실행
    // without [] : mount 시 매번 실행
    console.log("hallo")
    useEffect(()=>{},[])

    return (
    <div className="container">
        { timer === true ? 
            <div className="alert alert-warning">
                2초 이내 구매시 할인
            </div> : null 
        }
        
        <div className="row">
            {check === true ? <Alert>경고: 숫자만 입력하세요</Alert> : null}
            <input onChange={(e) => onChangeHandler(e)}></input>
            <div className="col-md-6">
            <img src={url} width="100%" />
            </div>
            <div className="col-md-6">
            <h4 className="pt-5">{shoes.title}</h4>
            <p>{shoes.content}</p>
            <p>{shoes.price}원</p>
            <BlackBox>
                <ColoredBtn bg="yellow">주문하기</ColoredBtn>                
                <ColoredBtn bg="blue">주문하기</ColoredBtn>
                {/* <ColoredBtnIpl>주문하기</ColoredBtnIpl> */}
            </BlackBox>
            {/* <button className="btn btn-danger">주문하기</button>  */}
            </div>
        </div>
    </div> 
    )
}

export default Detail