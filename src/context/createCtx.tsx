import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

export default function createCtx<A>(defaultValue?: A) {
  type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = createContext({
    state: defaultValue,
    update: defaultUpdate,
  });
  function Provider(props: PropsWithChildren<{}>) {
    const [state, update] = useState(defaultValue);
    return <ctx.Provider value={{ state, update }} {...props} />;
  }
  return [ctx, Provider, () => useContext(ctx)] as const;
}
