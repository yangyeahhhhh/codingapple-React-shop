/*eslint-disable*/
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import { useState } from 'react';

// let YellowBtn = styled.button`
//   background : ${ props => props.bg };
//   color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
//   padding : 10px;
// `

function Detail(props) {

  let {id} = useParams();
  let 찾은상품 = props.shoes.find(function(x){
    return x.id == id
  })
  let [alert1, setAlert] = useState(true)
  let [num, setNum] = useState('')

  useEffect(()=>{
    let a = setTimeout(()=>{ setAlert(false) }, 2000)
    if (isNaN(num) == true){
      alert('그러지마세요')
    }
    return ()=>{
      clearTimeout(a)
    }
  }, [num])

  // let [count, setCount] = useState(0)

  return (
    
    <div className="container">
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
    
      <input onChange={(e)=>{ setNum(e.target.value) }} />
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
    </div> 
  )
}

export default Detail;