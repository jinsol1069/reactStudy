import React, { useState } from 'react';
import './App.css';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import data from './data.js';
import Card from './Card.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './pages/Detail';
import axios from 'axios';

function App() {

  let [shoes, updateShoes] = useState(data);
  let navigate = useNavigate();

  // navigate(2) 숫자넣으면 앞으로가기, 뒤로가기 기능개발도 가능합니다.
  // -1 넣으면 뒤로 1번 가기
  // 2 넣으면 앞으로 2번 가기 기능입니다. 


  // ajax
  // 0. 브라우저 주소창에 GET/POST 요청을 날리면 쉽게 데이터를 요청/전송할 수 있지만, 
  // 브라우저가 하얗게 깜빡이며 새로고침되는 단점이 있음
  // 이를 보안한 것이 AJAX
  // 서버에 요청을 보낼 때 새로고침 없이 데이터를 주고 받을 수 있게 도와주는 브라우저 기능
  // 1. 방법 (GET/POST) => 주소창에 치는 거 자체가 GET 임
  // AJAX로 GET/POST요청하는 3가지 방법
  // 1-1. XMLHttpRequest : 옛날 문법
  // 1-2. fetch() : 최신 문법
  // 1-3. axios : 외부 라이브러리 (코드가 가장 짧고 편리해서 주로 사용됨)
  // 원래 서버와는 문자 자료만 주고받을 수 있는데, 
  // object/array를 “{“name”: “kim”}” 이런 식으로 따옴표로 감싸면 문자 취급을 받기 때문에 서버와 데이터를 주고 받을 수 있음
  // 이런 것을 JSON이라고 함
  // axios 라이브러리는 JSON을 object/array로 자동으로 바꿔주기 때문에 편리
  // fetch 를 사용할 경우 아래와 같음
  // fetch(URL).then((result)=>{ result.json() }).then(()=>{})

  // 2. 어떤자료 (URL) : https://codingapple1.github.io/shop/data2.json

  // 3. GET 기본 문법
  // axios.get(URL).then(()=>{}).catch(()=>{})
  const [count, setCount] = useState(0)
  const loadShoes = () => {
    setLoading(true)

    setCount(count + 1) // 이거 비동기 작업이라 0 으로 뜨게 됨. 
    let page = count + 2 // 그래서 + 2 해줘야 함
    console.log(count)

    const url = 'https://codingapple1.github.io/shop/data' + page + '.json'
    axios.get(url)
    .then((result) => {
      console.log(JSON.stringify(result.data))
      updateShoes([...shoes, ...result.data])
      console.log(JSON.stringify(shoes))

      setLoading(false)
    })
    .catch((error)=> {
      console.log(error)
      setLoading(false)
    })
  }
  const loadShoesByOnce = () => {
    setLoading(true)
    const url1 = 'https://codingapple1.github.io/shop/data' + 2 + '.json'
    const url2 = 'https://codingapple1.github.io/shop/data' + 3 + '.json'
    const axios1 = axios.get(url1)
    const axios2 = axios.get(url2)
    
    Promise.all([axios1, axios2])
    .then(([result1, result2])=> {
      updateShoes([...shoes, ...result1.data, ...result2.data])
      setLoading(false)
    })
  }
  const [loading, setLoading] = useState(false)

  // 4. POST 기본 문법, body 가 포함된어 서버로 전송 됨
  // axios.post(URL, {data: data} ).then(()=>{}).catch(()=>{})

  // 5. 좀 더 실용적인 방법! Promise 사용하기
  // Promise.all([axios.get(URL), axios.get(URL)])
  //    .then(([result1, result2])=>{})

  // 6. Promise 란 
  // 비동기 상태를 값으로 다룰 수 있는 객체
  // 비동기 프로그래밍 시 코드를 순차적으로 실행되게끔 작성 가능함
  // fetch()와 axios도 promise based
  // 6-1. 프로미스의 세가지 형태
  //    - 대기중(pending)
  //    - 이행됨(fulfilled) : 처리됨(settled)
  //    - 거부됨(rejected) : 처리됨(settled)
  // 기본 문법
  // Promise:resolve(1)
  //     .then(data => { ... return data + 1})          : 2
  //     .then(data => {... throw new Error("error!")}) 
  //     .catch(error => { ... return 30})              
  //     .then(data => {...} )                          : 30
  //     .finally(()=>{})

  // 여러개의 비동기 함수를 순차적으로 실행시켜보자
  // requestData1().then(data => {... return requestData2})
  //               .then(data => {...})
  // but, 비동기 함수들 간 의존성이 없다면 병렬로 실행시키는 게 이득이다
  // requestData1().then(data=>{})
  // reqeustData2().then(data=>{})
  // if, 여러 비동기 함수를 동시에 실행시키되, 모두 완료 되었을때를 알고 싶다면?
  // Promise.all([func1, func2])
  //        .then(([result1, result2]) => {...})
  //        .catch(()=>{console.log("둘 중에 하나라도 실패하면 여기로 옵니다")})
  // Promise.race: 가장 빨리 처리된 Promise 를 반환

  // Promise 는 상태를 유지하는 성질이 있음 => 캐싱이 가능함
  // let cachedPromise;
  // function getData() {
  //  cachedPromise = cachedPromise || requestData();
  //  return cachedPromise
  //}

  return (
    <div className="App">
        <Navbar bg="light" variant="light">
          <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate("/home")}>Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          </Container>
        </Navbar>

        <Link to="/">HOME </Link>
        <Link to="/detail">DETAIL </Link>
        <Link to="/about">ABOUT </Link>
        <Link to="/event">EVENT </Link>

        <div className="main-bg"></div>  
        <Routes>
          <Route path="/" element={
            <Container>
              <Row>
                {shoes.map((value, i) => {
                  return(
                    <Card id={value.id} src={value.src} title={value.title} content={value.content}/>
                  )
                })}
              </Row>
            </Container>
          }/>

          {/* url parameter 사용하기  */}
          <Route path="/detail/:id" element={<Detail shoes={shoes}/>}/>
          {/* <Route path="/detail/0" element={<Detail shoes={shoes}/>}/>
          <Route path="/detail/1" element={<Detail shoes={shoes}/>}/>
          <Route path="/detail/2" element={<Detail shoes={shoes}/>}/> */}


          <Route path="/about" element={ <About/>} >  
            <Route path="member" element={ <div>멤버들</div> } />
            <Route path="location" element={ <div>회사위치</div> } />
          </Route>
          <Route path="/event" element={ <Event/>} >  
            <Route path="one" element={ <p>첫 주문시 양배추즙 서비스</p> } />
            <Route path="two" element={ <p>생일기념 쿠폰받기</p> } />
          </Route>
          <Route path="*" element={ <div>없는페이지임</div> } />
        </Routes>

        { loading ? <p>로딩 중 입니다...</p> : null }
        { count > 1 ? null : 
          <button onClick={loadShoesByOnce}>
            more
          </button>
        }
    </div>
  );
}

 function About() {
  return (
    <div>
      <h4>회사 정보임</h4>
      {/* Outlet 이 있어야 nested routes 사용이 가능하다 */}
      <Outlet></Outlet>
    </div>
  )
 }

 function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
 }

export default App;
