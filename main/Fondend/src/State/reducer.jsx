export const initialstate = {
    profile: null ,
    pagereload: null,
    cartuncomplite: null,
    cartcomplite:null,

}

const reducer = (state,action) =>{
    switch (action.type) {
        case "ADD_PROFILE":
            return {
                ...state,
                profile: action.profile,
            };

        case "PAGE_RELOAD":
            return {
                ...state,
                pagereload: action.pagereload,
            };   

            case "CART-UNCOMPLITE":
                return {
                ...state,
                cartuncomplite: action.cartuncomplite,
                };   
            case "CART-COMPLITE":
                return {
                    ...state,
                    cartcomplite: action.cartcomplite,
                };               
    
        default:
           return state;
    }
}


export default  reducer;