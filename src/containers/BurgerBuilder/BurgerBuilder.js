import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'; 
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        isPurchasing: false
    }

    componentDidMount() {
        
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    // addIngredientHandler = (type)=> {
    //     const oldCount = this.state.ingredient[type];
    //     const updatedCount = oldCount+1;
    //     const updatedIngridients = {
    //         ...this.state.ingredient
    //     };
    //     updatedIngridients[type]=updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.total_price;
    //     const newPrice = oldPrice+priceAddition;
    //     this.setState({total_price: newPrice,ingredient: updatedIngridients});
    //     this.updatePurchaseState(updatedIngridients);
    // }

    // removeIngredientHandler = (type)=> {
    //     const oldCount = this.state.ingredient[type];
    //     if(oldCount<=0) {
    //         return;
    //     }
    //     const updatedCount = oldCount-1;
    //     const updatedIngridients = {
    //         ...this.state.ingredient
    //     };
    //     updatedIngridients[type]=updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.total_price;
    //     const newPrice = oldPrice-priceDeduction;
    //     this.setState({total_price: newPrice,ingredient: updatedIngridients});
    //     this.updatePurchaseState(updatedIngridients);
    // }

    purchaseHandler =()=> {
        this.setState({isPurchasing: true});
    }

    purchaseCancelHandler =()=> {
        this.setState({isPurchasing: false});
    }

    purchaseContinueHandler =()=> {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        let orderSummary=null;
        
        if(this.state.loading) {
            orderSummary=<Spinner/>;
        }

        let burger=this.state.error ? <p>This ingredients can not be loaded!!</p>:<Spinner/>;
        

        if(this.props.ings) {
            burger=(
                <Auxiliary>
                    <Burger ingredient={this.props.ings}/>
                    <Buildcontrols 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disable={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                    />
                </Auxiliary>
            );

            orderSummary = <OrderSummary 
            ingredient={this.props.ings}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.price}/>;
        }
        
        return (
            <Auxiliary>
                <Modal show={this.state.isPurchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        ings:state.ingredient,
        price:state.total_price
    }
};
const mapDispatchToProps=(dispatch)=>{
    return {
        onIngredientAdded:(ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
