/*eslint-disable*/
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import { useState } from 'react';
import { Nav } from 'react-bootstrap'

import {Context1} from './../App.js'

// let YellowBtn = styled.button`
//   background : ${ props => props.bg };
//   color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
//   padding : 10px;
// `

function Detail(props) {

  let {재고} = useContext(Context1)

  let {id} = useParams();
  let 찾은상품 = props.shoes.find(function(x){
    return x.id == id
  })
  let [alert1, setAlert] = useState(true)
  let [num, setNum] = useState('')
  let [탭, 탭변경] = useState(0)
  let [fade2, setFade2] = useState('')

  useEffect(()=>{
    let a = setTimeout(()=>{ setAlert(false) }, 2000)
    // if (isNaN(num) == true){
    //   alert('그러지마세요')
    // }
    setFade2('end')
    return ()=>{
      clearTimeout(a)
      setFade2('')
    }
  }, [])

  // let [count, setCount] = useState(0)

  return (
    
    <div className={'container start ' + fade2}>
      {
        alert1 == true
        ? <div className="alert alert-warning">
        2초이내 구매 시 할인
        </div>
        : null
      }
      {/* {count}
      <button onClick={()=>{ setCount(count+1) }}>버튼</button> */}
      {/* <YellowBtn bg="blue">버튼</YellowBtn>
      <YellowBtn bg="orange">버튼</YellowBtn> */}
    
      {/* <input onChange={(e)=>{ setNum(e.target.value) }} /> */}
      {재고}
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>

      <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
            <Nav.Link onClick={()=>{ 탭변경(0) }} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{ 탭변경(1) }} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{ 탭변경(2) }} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} shoes={props.shoes}></TabContent>

    </div> 
  )
}

function TabContent({탭, shoes}){

  let [fade, setFade] = useState('')
  let {재고} = useContext(Context1)

  useEffect(()=>{
    let a = setTimeout(()=>{ setFade('end') }, 100)
    return ()=>{
      clearTimeout(a)
      setFade('')
    }
  }, [탭])

  return (
  <div className={'start '+fade}>
      { [<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][탭] }
  </div>)
}

export default Detail;