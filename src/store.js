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
let itemState = createSlice({
    name: "item__",
    initialState: [
        { id: 0, name: "White and Black", count: 2 },
        { id: 2, name: "Grey Yordan", count: 1 },
    ],
    reducers: {
        plusCount(state, action) {
            console.log(JSON.stringify(state));
            console.log(JSON.stringify(action.type));
            console.log(JSON.stringify(action.payload));

            //state[action.payload].count++
            let index = state.findIndex((a) => { return a.id === action.payload })
            state[index].count++
        },
        minusCount(state, action) {
            console.log(JSON.stringify(state))
            console.log(JSON.stringify(action.payload))

            let index = state.findIndex((a) => { return a.id === action.payload })
            state[index].count--
        },
        addItem(state, action) {
            //return [...state, { id:10, name: "Star Wars", count: 20 }]
            state.push(action.payload)
        }
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

// 숙제
let userHW = createSlice({
    name: "userHW",
    initialState: {name: "Kim", age: 20},
    reducers: {
        changeNameHW(state, action) {
            state.name = "Kwon"
            return state
        },
        changeAgeHW(state, action) {
            console.log("called")
            state.age = 30
            return state
        }
    }
})


//const data = [
//    { id: 0, name: "White and Black", count: 2 },
//    { id: 2, name: "Grey Yordan", count: 1 },
//];
// 1-2. 등록하기
export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        item: itemState.reducer,
        userHW: userHW.reducer,
    },
});

// 4-2 actions 으로 export 시켜주기
export let { changeName } = user.actions;
export let { plusCount, minusCount, addItem } = itemState.actions;
export let { changeNameHW, changeAgeHW } = userHW.actions;
