const init = {
    count:0
}
const reducer = (state=init,action) => {
    switch (action.type) {
        case 'add':
            return {
                count:state.count++
            }
        // case value:
            
        //     break;

    
        default:
            break;
    }
}
export default reducer