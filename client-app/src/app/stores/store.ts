import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
  activityStore: ActivityStore;
}

export const store: Store = {
  // As we create new stores we're going to be adding new instances of these stores into this object
  activityStore: new ActivityStore(),
};

// <StoreContext.Provider value={store}> in index.tsx
export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
