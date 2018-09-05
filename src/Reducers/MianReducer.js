import Constants from './../Common/Constants'

import {UPDATE_ADDON_PRICE, UPDATE_ADDON_OPTIONS,UPDATE_CONTAINER_SIZE,
UPDATE_PRICE_INFO, UPDATE_LOCATION_INFO, UPDATE_WAREHOUSE_INFO, INITIALIZE_WAREHOUSE_RATES, UPDATE_SET_ORIGIN
} from "../Actions/types";


const INITIAL_STATE = {
    damageWaiverSelected: false,
    contentsProtectionSelected: false,
    selectedSize: 'c16',
    selectedLocation: 'mine',
    selectedWarehouse: 'indoor',
    setOrigin: null, //for the closet distance
    deliveryPrice: 0,
    dueOnDelivery1: {
        due: 0,
        containerPrice: Constants.c16Price,
        addOns: {
            damageWaiver: 0,
            contentsProtection: 0
        }
    },
    damageWaiver: 0,
    contentsProtection: 0,
    wareRates:{
        w1_i: 0,
        w1_o: 0,
        w2_i: 0,
        w2_o: 0,
    }
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case UPDATE_ADDON_PRICE:
            return {...state, [action.payload.prop]: action.payload.value,
                dueOnDelivery1: {...state.dueOnDelivery1,
                    addOns: {
                        ...state.dueOnDelivery1.addOns,
                        [action.payload.prop]: action.payload.value
                    }
                },
            };
        case UPDATE_ADDON_OPTIONS:
            return {...state, [action.payload.prop]: action.payload.value};
        case UPDATE_CONTAINER_SIZE:
            return {...state, selectedSize: action.payload.size,
                dueOnDelivery1: {...state.dueOnDelivery1,
                    containerPrice: action.payload.containerPrice
                },
            };
        case UPDATE_PRICE_INFO:
            return {...state, [action.payload.prop]: action.payload.value};
        case UPDATE_LOCATION_INFO:
            return {...state, selectedLocation: action.payload};
        case UPDATE_WAREHOUSE_INFO:
            return {...state, selectedWarehouse: action.payload};
        case INITIALIZE_WAREHOUSE_RATES:
            return {...state,
            wareRates: {w1_i: action.payload.w1_i, w1_o: action.payload.w1_o, w2_i: action.payload.w2_i, w2_o: action.payload.w2_o}
            };
        case UPDATE_SET_ORIGIN:
            return {...state, setOrigin: action.payload};
        default:
            return state;
    }
}

