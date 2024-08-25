'use client';


import { RootStore } from "@/utils/store/config/root-store/root-store";
import { RootStoreProvider } from "@/utils/store/config/root-store/root-store-context";
import { setupRootStore } from "@/utils/store/config/root-store/setup-root-store";
import { observer } from "mobx-react-lite";
import { onSnapshot } from "mobx-state-tree";
import { useEffect, useState } from "react";

const StoreContainer = observer(({children}:any) =>{
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  useEffect(() => {
    (async () => {
      setupRootStore().then(setRootStore)
    })()
  }, []);

  useEffect(() => {
    if (rootStore) {
      onSnapshot(rootStore, (snapshot) => {})
    }
  }, [rootStore]);

    return(
      rootStore ?
      <RootStoreProvider value={rootStore}>
          {children}
      </RootStoreProvider> : <></>
    )
})

export default StoreContainer;
