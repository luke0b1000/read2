import { SET_CATEGORIES } from "../Actions/Categories";

export default function Categories(state = [], action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return [...action.categories];
        default:
            return state;
    }
}
