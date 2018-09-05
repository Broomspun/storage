import Constants from './../Common/Constants'

import {UPDATE_ADDON_PRICE, UPDATE_ADDON_OPTIONS,UPDATE_CONTAINER_SIZE,
UPDATE_PRICE_INFO
} from "../Actions/types";
import accounting from "accounting-js";

const INITIAL_STATE = {
    damageWaiverSelected: false,
    contentsProtectionSelected: false,
    selectedSize: 'c16',
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
    contentsProtection: 0
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
        default:
            return state;
    }
}

