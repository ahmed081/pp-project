import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FlipPage from 'react-flip-page'
import { Row, Col, Input } from "antd"
const livre =[
    {page:1 , content:<div>page 1</div>},
    {page:2 , content:<div>page 2</div>},
    {page:3 , content:<div>page 3</div>},
    {page:4 , content:<div>page 4</div>},
    {page:5 , content:<div>page 5</div>},
    {page:6 , content:<div>page 6</div>},
    {page:7 , content:<div>page 7</div>},
    {page:8 , content:<div>page 8</div>},
    {page:9 , content:<div>page 9</div>},
    {page:10 , content:<div>page 10</div>},
    {page:11 , content:<div>page 11</div>},
    {page:12 , content:<div>page 12</div>},
    {page:13 , content:<div>page 13</div>},
    {page:14 , content:<div>page 14</div>},
    {page:15 , content:<div>page 15</div>},
]
const Lire = (props)=>{
    const {id}=useParams()
    const [flipPage,setFlipPage] =useState()
    const [pages,setPages]= useState([])
    const length = Math.round( 2 + ((livre.length - 2)/2))
    useEffect(()=>{
        console.log("libre : ",livre.length)
    },[])

    return(
        
            <FlipPage
                animationDuration={500}
                flipOnTouch={true}
                orientation="horizontal"
                showSwipeHint={true}
                showTouchHint={true}
                startAt={0}
                showHint={true}
                style={{width:"100%"}}
                width="100%"
                onPageChange={(pageIndex,direction)=>{console.log(pageIndex)}}
                ref={(component) => { setFlipPage(component) }}
                
            >
                
            {
                [...Array(length)].map((val ,index)=>{
                    if(index ==0 || index ===1)
                        return <Page left={null} right={livre[index]} />
                    else {
                        const left = (index-1)*2
                        const right = left+1
                        if(right === livre.length)
                            return <Page left={livre[left]} right={null} />
                        return <Page left={livre[left]} right={livre[right]} />
                    }
                })
            }
               
            
            
            </FlipPage>
        
    )
}
const Page = (props)=>{
    const {left,right}=props
    return(
        <Row gutter={[16,16]} style={{height:"100%"}} >
        <Col span={12} style={{background:"red"}}>
            <div>
                {left?left.content:""}
            </div>
        </Col>
        <Col span={12} style={{background:"yellow"}}>
            <div>
                {right?right.content:""}
            </div>
        </Col>
    </Row>  
    )
}

export default Lire