import { atom } from "recoil";
const searchTagsState = atom({
  key: "searchTags",
  default: {
    searchTags: [],
  },
});

export { searchTagsState };
