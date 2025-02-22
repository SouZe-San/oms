"use client";

import { selectCount } from "@oms/store/counter";
import { useAppSelector } from "@oms/store/hooks";

const TempoCount = () => {
  const count = useAppSelector(selectCount);

  // Can access by This also
  // const value = useAppSelector((state) => state.counter.value);
  return <h2 className="text-2xl">This is a tempo : {count}</h2>;
};

export default TempoCount;
