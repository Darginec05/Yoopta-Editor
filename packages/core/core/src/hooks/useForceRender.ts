import { useReducer } from 'react';

export const useForceRerender = () => useReducer((x) => x + 1, 0)[1];
