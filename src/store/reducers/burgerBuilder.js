import * as actionTypes from '../actions/actionTypes';

const initialState={
    ingredient: {
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    total_price: 120,
};

const INGREDIENT_PRICES = {
    salad: 10,
    bacon: 50,
    cheese: 20,
    meat: 70
};

const reducer=(state=initialState,action)=>{
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredient: {
                    ...state.ingredient,
                    [action.ingredientName]:state.ingredient[action.ingredientName]+1
                },
                total_price:state.total_price+INGREDIENT_PRICES[action.ingredientName]
            };
        
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredient: {
                    ...state.ingredient,
                    [action.ingredientName]:state.ingredient[action.ingredientName]-1
                },
                total_price:state.total_price-INGREDIENT_PRICES[action.ingredientName]
            };
    }

    return state;
};

export default reducer;