export const styleReducer = (state, action) => {
  switch (action.type) {
    case "toggle":
      return {
        ...state,
        style: state.style === "is-light" ? "is-dark" : "is-light"
      };
    default:
      return;
  }
};
