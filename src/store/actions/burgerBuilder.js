import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (name)=>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
};

export const removeIngredient = (name)=>{
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
};

export const setIngredients=(ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredientName:ingredients
    };
};

export const initIngredient=()=>{
    return dispatch=>{
        axios.get('https://react-my-burger-54868-default-rtdb.firebaseio.com/ingredients.json').then(response=>{
            dispatch(setIngredients(response.data));
        }).catch(error=>{
            
        });
    };
};