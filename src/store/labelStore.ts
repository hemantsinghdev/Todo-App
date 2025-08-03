import { addLabelToDB } from "@/services/indexedDB/labelServices";
import TLabel from "@/types/label";
import { create } from "zustand";

type LabelState = {
  labels: TLabel[];
  setlabels: (labels: TLabel[]) => void;
  addLabel: (newlabel: TLabel) => void;
  deleteLabel: (labelLocalId: string) => void;
};

const useLabelStore = create<LabelState>((set, get) => ({
  labels: [],

  setlabels: (labels) => set({ labels }),

  addLabel: (newlabel: TLabel) => {
    set((state) => ({ labels: [...state.labels, newlabel] }));
    addLabelToDB(newlabel);
  },

  deleteLabel: () => {},
}));

export default useLabelStore;
