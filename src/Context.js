import React from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const Context = React.createContext();
export const Provider = Context.Provider
export const Consumer = Context.Consumer

export default Context;