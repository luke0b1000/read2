import { TOGGLE_STATE_CHANGE } from "../Actions/StateChange";

export default function StateChange(state = false, action) {
    switch (action.type) {
        case TOGGLE_STATE_CHANGE:
            return !state;
        default:
            return state;
    }
}
