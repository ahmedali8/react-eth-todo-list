export default (state, action) => {
    switch (action.type) {
        case 'SETUP_WEB3':
            return {
                ...state,
                web3: action.payload
            }
    
        case 'SETUP_ACCOUNT':
            return {
                ...state,
                account: action.payload
            }
    
        case 'SETUP_CONTRACT':
            return {
                ...state,
                todoList: action.payload
            }
    
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            }
    
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            }
    
        default:
            return state;
    }
}