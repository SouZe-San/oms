import { selector } from "recoil";
import { countAtom } from "../atoms/count";
// import { countAtom} from "../atoms";

//temporary
export const countSelector = selector({
  key: "countSelector",
  get: ({ get }) => {
    return get(countAtom);
  },
});
