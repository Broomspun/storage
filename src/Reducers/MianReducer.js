
import {UPDATE_ADDON_PRICE, UPDATE_ADDON_OPTIONS,UPDATE_CONTAINER_SIZE,
UPDATE_PRICE_INFO, UPDATE_LOCATION_INFO, UPDATE_WAREHOUSE_INFO, INITIALIZE_WAREHOUSE_RATES, UPDATE_SET_ORIGIN,
    INITIALIZE_WAREHOUSES, INITIALIZE_ICAN
} from "../Actions/types";


const INITIAL_STATE = {
    damageWaiverSelected: false,
    contentsProtectionSelected: false,
    selectedSize: 'c16',
    selectedLocation: 'mine',
    setOrigin_index: 0, //for the closet distance
    deliveryPrice: 0,
    dueOnDelivery1: {
        due: 0,
        containerPrice: 0.0,
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
    },
    warehouse1: '',
    warehouse2: '',
    email_lists: '',
    milePrice: 0.0,
    c16Price: 0.0,
    c20Price: 0.0,
    flatDeliveryPrice: 0.0,
    flatDeliveryMiles: 0.0,
    waitPrice: 0.0,
    mandatoryLiveUnloadMiles: 0.0,
    minLiveUnloadSave: 0.0,
    damageWaiverPrice:0.0,
    contentsProtectionPrice: 0.0,
    longDistanceMin: 0.0,
    longDistanceMilePrice: 0.0,
    warehouse_names:{}
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case UPDATE_ADDON_PRICE:
            return {...state, [action.payload.prop]: action.payload.value,
                dueOnDelivery1: {...state.dueOnDelivery1,
                    addOns: {
                        ...state.dueOnDelivery1.addOns,
                        [action.payload.prop]: action.payload.value? state[`${action.payload.prop}Price`]:0
                    }
                },
            };
        case UPDATE_ADDON_OPTIONS:
            return {...state, [action.payload.prop]: action.payload.value};
        case UPDATE_CONTAINER_SIZE:
            return {...state, selectedSize: action.payload.size,
                dueOnDelivery1: {...state.dueOnDelivery1,
                    containerPrice: action.payload.size=='c16'? state.c16Price : state.c20Price
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
            return {...state, setOrigin_index: action.payload};
        case INITIALIZE_WAREHOUSES:
            return {...state, warehouse1: action.payload.w1, warehouse2: action.payload.w2, email_lists: action.payload.email_lists};
        case INITIALIZE_ICAN:
            return {...state, ...action.payload, dueOnDelivery1: {...state.dueOnDelivery1,
                    containerPrice: action.payload.containerSize
                }};
        default:
            return state;
    }
}

