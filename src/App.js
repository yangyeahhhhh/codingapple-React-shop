/*eslint-disable*/
import { createContext, useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js'
import axios from 'axios'
import Cart from './routes/Cart.js'
import { useQuery } from '@tanstack/react-query'

export let Context1 = createContext()

function App() {

  let [shoes, setShoes] = useState(data)
  let [재고] = useState([10, 11, 12])

  let navigate = useNavigate();

  let result = useQuery(['작명'], ()=>
      axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      console.log('요청됨')
      return a.data
    }),
    { staleTime : 2000 }
  )


  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            { result.isLoading && '로딩중' }
            { result.error && '에러남' }
            { result.data && result.data.name }
          </Nav>
        </Container>
      </Navbar>

      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <div className="container">
              <div className="row">
              {/* <Card shoes={shoes[0]} i={1}></Card>
              <Card shoes={shoes[1]} i={2}></Card>
              <Card shoes={shoes[2]} i={3}></Card> */}
                {shoes.map((a, i)=>{
                  return (
                    <Card shoes={shoes[i]} i={i+1} key={i}></Card>
                  )})
                }
                </div>
              </div>
              <button onClick={()=>{
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((결과)=>{
                  console.log(결과.data)
                  let copy = [...shoes, ...결과.data];
                  setShoes(copy);
                })
                .catch(()=>{
                  console.log('실패함')
                })
              }}>더보기</button>
          </>
        }></Route>
        <Route path="/detail/:id" element={
          <Context1.Provider value={{ 재고, shoes }}>
            <Detail shoes={shoes}/>
          </Context1.Provider>
        }> 
        </Route>
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>}></Route>
          <Route path="location" element={<div>위치정보임</div>}></Route>
        </Route>
        <Route path="/event" element={<EventPage />}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
          <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
        </Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="*" element={<div>없는페이지요</div>}></Route>
      </Routes>

    </div>
  );
}

function EventPage(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+props.i+'.jpg'} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;
