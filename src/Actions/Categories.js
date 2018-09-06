import { getCategories } from "../utils/API";

export const SET_CATEGORIES = "SET_CATEGORIES";

function setCategories(categories) {
    return {
        type: SET_CATEGORIES,
        categories
    };
}
export function handleInitialCategories() {
    return dispatch => {
        return getCategories()
            .then(categories => {
                dispatch(setCategories(categories));
            })
            .catch(err => console.log(err));
    };
}
