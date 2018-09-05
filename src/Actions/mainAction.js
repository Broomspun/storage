import {UPDATE_ADDON_PRICE, UPDATE_ADDON_OPTIONS, UPDATE_CONTAINER_SIZE,
    UPDATE_PRICE_INFO, UPDATE_DUE_PRICE} from "./types";
import Constants from './../Common/Constants'

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
            payload: {prop: 'damageWaiver', value: value ? Constants.damageWaiverPrice: 0}
        });
    else
        dispatch({
            type: UPDATE_ADDON_PRICE,
            payload: {prop: 'contentsProtection', value: value? Constants.contentsProtectionPrice:0}
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
    let containerPrice= Constants.c16Price;
    if(size=='c20')
        containerPrice = Constants.c20Price;

    return {
        type: UPDATE_CONTAINER_SIZE,
        payload: {size:size, containerPrice: containerPrice}
        }
};

export const update_price_info = ({prop, value}) => {
    return {
        type: UPDATE_PRICE_INFO,
        payload: {prop, value}
    }
};
