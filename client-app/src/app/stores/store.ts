import { createContext, useContext } from 'react';
import ActivityStore from './activityStore';
import CommonStore from './commonStore';
import UserStore from './userStore';

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UserStore;
}

export const store: Store = {
  // As we create new stores we're going to be adding new instances of these stores into this object
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
};

// <StoreContext.Provider value={store}> in index.tsx
export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
