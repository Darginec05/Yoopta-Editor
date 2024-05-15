import { useState } from 'react';
import { Action } from '../types';

type Props = {
  actions: Action[] | null;
};

const filterBy = (item, text: string) => {
  return item.name.toLowerCase().indexOf(text) > -1;
};

export const useChatActions = ({ actions: baseActions }: Props) => {
  const [actions, setActions] = useState<Action[] | null>(baseActions);

  const handleAction = (action: Action) => {
    console.log('action cliecked', action);
  };

  const updateActions = (inputValue: string) => {
    setActions((prevActions) => {
      if (inputValue.length === 0) return baseActions;
      if (prevActions?.length === 0)
        return baseActions?.filter((item) => filterBy(item, inputValue.toLowerCase())) || null;

      return actions?.filter((item) => filterBy(item, inputValue.toLowerCase())) || null;
    });
  };

  return { actions, updateActions, handleAction };
};
