const initialState = {
  users: []
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload.data
      };
    default:
      return state;
  }
}

// Actions Types
// todo - move constants to separate location as action_types grow
export const FETCH_USERS = "FETCH_USERS";
