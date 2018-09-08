import {
    UPDATE_ADDON_PRICE, UPDATE_ADDON_OPTIONS, UPDATE_CONTAINER_SIZE,
    UPDATE_PRICE_INFO, UPDATE_LOCATION_INFO,
    UPDATE_WAREHOUSE_INFO, INITIALIZE_WAREHOUSE_RATES,UPDATE_SET_ORIGIN,
    INITIALIZE_WAREHOUSES,INITIALIZE_ICAN
} from "./types";

export const handleInputChange = (e) => {
    e.persist();
    let key;
    let value;

    // if clicking on box:
    if (e.target.type === "checkbox") {
        value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        key = e.target.id;
        // if clicking NOT on box:
    } else if (e.target.closest(".checkbox").firstChild.type === "checkbox") {
        key = e.target.closest(".checkbox").firstChild.id;
        // if already checked:
        if (e.target.closest(".checkbox").firstChild.checked) {
            value = false;
            e.target.closest(".checkbox").firstChild.checked = false;
        } else {
            value = true;
            e.target.closest(".checkbox").firstChild.checked = true;
        }
    } else {
        value = e.target.value;
    }

    return (dispatch) =>{
        dispatch(
            {
                type: UPDATE_ADDON_OPTIONS,
                payload: {prop: key, value:value}
            }
        );

        updateAddonPrice(dispatch, key, value);
    };

    // this.setState({ [key]: value});
};


const updateAddonPrice = (dispatch, key, value) =>{
    if(key==='damageWaiverSelected')
        dispatch({
            type: UPDATE_ADDON_PRICE,
            payload: {prop: 'damageWaiver', value: value}
        });
    else
        dispatch({
            type: UPDATE_ADDON_PRICE,
            payload: {prop: 'contentsProtection', value: value}
        })
};
/**
 *
 *
 * @param size  (16 or 20)
 * @param service (Moving, Storage, Both
 * @param location (MyLocation or Warehose)
 */
export const handleSizeSelection = (size='c16', service='moving', location='warehouse')=>{
    // selected service is moving or both:
    if (service === "moving" || service === "both") {
        size = "c16";
        // selected service is storage:
    } else if (service === "storage") {
        // selected location is warehouse:
        if (location === "warehouse") {
            size = "c16";
        }
    }
    return {
        type: UPDATE_CONTAINER_SIZE,
        payload: {size:size}
        }
};

export const update_price_info = ({prop, value}) => {
    return {
        type: UPDATE_PRICE_INFO,
        payload: {prop, value}
    }
};

export const  handleLocationSelection = (location='mine', size='c16') => {
    if (size === "c20") {
        location = "mine";
    }

    return {
        type: UPDATE_LOCATION_INFO,
        payload: location
    }
};

export const  handleWarehouseSelection = (warehouse='mine') => {
    return {
        type: UPDATE_WAREHOUSE_INFO,
        payload: warehouse
    }
};


/**
 *
 * @param w1_i: Warehouse Congers Indoor rate
 * @param w1_o: Warehouse Congers Outdoor rate
 * @param w2_i: Warehouse Brookfield Indoor rate
 * @param w2_o: Warehouse Brookfield Outdoor rate
 */
export const initializeWarehouseRates = (indoors, outdoors) => {

    return {
        type: INITIALIZE_WAREHOUSE_RATES,
        payload: {w1_i: indoors[0], w1_o: outdoors[0], w2_i: indoors[1], w2_o: outdoors[1]}
    }
};

export const initializeIcan = (props)=> {
  return {
      type: INITIALIZE_ICAN,
      payload: props

  }
};


export const initializeWarehouses = (warehouses, email_lists)=>{
    let ww =  warehouses.split('/');
    return {
        type: INITIALIZE_WAREHOUSES,
        payload: {w1: ww[0], w2: ww[1], email_lists:email_lists}
    }
}

export const updateSetOrigin = (origin) => {
    return {
        type: UPDATE_SET_ORIGIN,
        payload: origin
    }
};
