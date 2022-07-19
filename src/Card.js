import React  from 'react';
import { Col } from 'react-bootstrap';


function Card({id, src, title, content}) {
    const img = parseInt(id) + 1;
    src = src ? src : "https://codingapple1.github.io/shop/shoes" + img + ".jpg"
    return (
        <Col>
            <img src={src} width="80%"/>
            {/* <img src={process.env.PUBLIC_URL + '/logo192.png'} */}
            <h4>{title}</h4>
            <p>{content}</p>
        </Col>
    )
}




export default Card