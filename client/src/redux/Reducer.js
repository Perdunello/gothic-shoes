const SET_USER_DATA = 'SET_USER_DATA'
const SET_ITEMS_DATA = 'SET_ITEMS_DATA'
const SET_ITEM_DATA = 'SET_ITEM_DATA';
const SET_BAG = 'SET_BAG';
const initialState = {
    userData: {},
    itemsData: [],
    itemData: [],
    bag: []
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.payload
            }
        case SET_ITEMS_DATA:
            return {
                ...state,
                itemsData: action.payload,
            }
        case SET_ITEM_DATA:
            return {
                ...state,
                itemData: action.payload,
            }
        case SET_BAG:
            return {
                ...state,
                bag: action.payload
            }
        default:
            return state
    }
}

export const setUserData = (payload) => {
    return {type: SET_USER_DATA, payload}
}

export const setItemsData = (payload) => {
    return {type: SET_ITEMS_DATA, payload}
}

export const setItemData = (payload) => {
    return {type: SET_ITEM_DATA, payload}
}
export const setBag = (payload) => {
    return {type: SET_BAG, payload}
}
export default Reducer