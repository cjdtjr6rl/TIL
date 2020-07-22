import React, { Component } from 'react';

class Counter extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         counter: 0
    //     };
    // }
    state = {
        counter: 0,
        fixed: 1,
        updateMe: {
            toggleMe: false,
            dontChangeMe: 1
        }
    };

    handleIncrease = () => {
        // 함수형 업데이트를 해주어야 여러번 사용이 가능
        this.setState(state => ({
            counter: state.counter + 1
        }));
        this.setState(state => ({
            counter: state.counter + 1
        }));
        this.setState(state => ({
            counter: state.counter + 1
        }));
        this.setState(state => ({
            counter: state.counter + 1
        }));
    }

    handleDecrease = () => {
        // setState는 요청을 해주는 것이기 때문에 아래와 같이 작성하면 하나씩만 동작
        this.setState({
            counter: this.state.counter - 1
        })
    }

    handleToggle = () => {
        this.setState({
            ...this.state.updateMe,
            toggleMe: !this.state.updateMe.toggleMe
        });
    }

    render() {
        return(
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.handleIncrease}>+1</button>
                <button onClick={this.handleDecrease}>-1</button>
                <p>고정된 값: {this.state.fixed}</p>
            </div>
        );
    }
}

// function reducer(state, action) {
//     switch (action.type) {
//         case 'INCREMENT':
//             return state + 1;
//         case 'DECREMENT':
//             return state - 1;
//         default:
//             throw new Error('Unhandled action');
//     }
// }

// function Counter() {

//     const [number, dispatch] = useReducer(reducer, 0);
//     const onIncrease = () => {
//         dispatch({
//             type: 'INCREMENT'
//         });
//     }
//     const onDecrease = () => {
//         dispatch({
//             type: 'DECREMENT'
//         })
//     }
//     return (
//         <div>
//             <h1>{number}</h1>
//             <button onClick={onIncrease}>+1</button>
//             <button onClick={onDecrease}>-1</button>
//         </div>
//     )
// }

export default Counter;