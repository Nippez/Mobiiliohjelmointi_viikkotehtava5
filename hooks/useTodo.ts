import { useReducer } from "react";

export interface Item {
    id: string;
    name: string;
    completed: boolean;
}

const reducer = (state: Item[], action: any) => {
  switch (action.type) {
    case "Add":
      return [
        ...state,
        {
          id: Date.now().toString(), name: action.name, completed: false,
        },
      ];
    case "Toggle":
      return state.map(item => {
        if (item.id === action.id) {
          return {...item, completed: !item.completed};
        } else {
          return item;
        }
      });

    default:
      return state;
  }
};

export const useTodos = () => {
  const [items, dispatch] = useReducer(reducer, []);

  const addItem = (name: string) => {
    if (name.trim()) {
      dispatch({ type: "Add", name: name.trim() });
    }
  };
  const toggleItem = (id: string) => {
    dispatch({ type: "Toggle", id });
  };

  return {
    items,
    addItem,
    toggleItem,
  };
};