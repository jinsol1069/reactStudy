import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// 4-3. import 및 dispatch 로 감싸 사용하기
import { changeName, plusCount, minusCount, addItem, changeAgeHW } from "../store";

const Cart = () => {
    // 3. data 가져다 쓰는 법
    // useSelector 를 쓰면 redux store 에 접근 가능함
    let user = useSelector((state) => {
        // 아래처럼 쓰면 모든 state 가 가져와 집니다.
        console.log(state);
        // 아래처럼 쓰면 특정한 state 만 가져와 집니다.
        return state.user;
    });
    let items = useSelector((state) => {
        console.log(state.item);
        return state.item;
    });

    // 4-4. 이렇게 수정 함수를 만들어주고
    // 모든 로직을 store.js 에서 관리한다면
    // 디버깅이 수월합니다.
    const dispatch = useDispatch();
    const updateName = () => {
        dispatch(changeName());
    };

    //숙제
    const addCount = (id) => {
        console.log(id);
        dispatch(plusCount(id));
    };
    const reduceCount = (id) => {
        console.log(id);
        dispatch(minusCount(id));
    };
    const addMore = () => {
        console.log("add")
        dispatch(addItem( {id : 5, name : 'Star Wars', count : 10} ))
    };

    // 숙제 1
    let userHW = useSelector((state) => {
        console.log("age changed " + JSON.stringify(state.userHW))
        return state.userHW
    })
    const changeAge = () => {
        console.log("change age")
        dispatch(changeAgeHW())
    }

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>안녕</td>
                        <td>안녕</td>
                        <td>안녕</td>
                    </tr>
                    {items.map((value, index) => {
                        console.log(JSON.stringify(value));
                        return (
                            <tr key={index}>
                                <td>{index + 2}</td>
                                <td>{value.name}</td>
                                <td>{value.count}</td>
                                <td>
                                    <button onClick={() => addCount(value.id)}>
                                        +
                                    </button>
                                    <button onClick={() => reduceCount(value.id)}>
                                        -
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <button onClick={addMore}>추가하기</button>
            <button onClick={changeAge}>숙제1</button>
        </>
    );
};

export default Cart;
