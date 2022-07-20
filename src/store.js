import { configureStore, createSlice } from "@reduxjs/toolkit";

// state 가 보관된다.

// 1. data 등록하기
// 1-1. data 로 사용할 state 만들기
// useState 와 용도가 비슷함
// state 를 생성함
// let user = createSlice({
//     name: "user",
//     initialState: "Kim",
// });

let stock = createSlice({
    name: "stock",
    initialState: [10, 11, 12],
});

// 숙제
let item = createSlice({
    name: "item",
    initialState: [
        { id: 0, name: "White and Black", count: 2 },
        { id: 2, name: "Grey Yordan", count: 1 },
    ],
    reducers: {
        plusCount(state, data) {
            console.log(JSON.stringify(state));
            console.log(JSON.stringify(data.payload));

            let newState = [];
            state.map((value, index) => {
                if (value.id === data.payload) {
                    let newItem = {
                        id: value.id,
                        name: value.name,
                        count: value.count + 1,
                    };
                    newState = [...newState, newItem];
                } else {
                    newState = [...newState, value];
                }
            });

            return newState;
        },
    },
});

// 4. store 내 state 변경하기
// 4-1. slice 안에 reducers: {} 에 함수 넣어주기
let user = createSlice({
    name: "user",
    initialState: "Kim",
    reducers: {
        changeName(state) {
            return "John" + state;
        },
    },
});

//const data = [
//    { id: 0, name: "White and Black", count: 2 },
//    { id: 2, name: "Grey Yordan", count: 1 },
//];
// 1-2. 등록하기
export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        item: item.reducer,
    },
});

// 4-2 actions 으로 export 시켜주기
export let { changeName } = user.actions;
export let { plusCount } = item.actions;
