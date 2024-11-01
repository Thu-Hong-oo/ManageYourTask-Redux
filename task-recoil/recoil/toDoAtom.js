import { atom } from 'recoil';

export const todoListState = atom({
  key: 'todoListState',
  default: [], 
});

export const nameAtom = atom({
  key: 'nameAtom', 
  default: "", 
});

// Atom để lưu trữ tác vụ đang chỉnh sửa
export const editTaskAtom = atom({
  key: 'editTaskAtom',
  default: null, 
});