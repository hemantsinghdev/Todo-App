import removeLabelFromTasks from "@/helpers/removeLabel";
import {
  addLabelToDB,
  deleteLabelfromDB,
  updateLabelInDB,
} from "@/services/indexedDB/labelServices";
import TLabel from "@/types/label";
import { create } from "zustand";

type LabelState = {
  labels: TLabel[];
  setlabels: (labels: TLabel[]) => void;
  addLabel: (newlabel: TLabel) => void;
  updateLabel: (updated: TLabel) => void;
  deleteLabel: (labelLocalId: string) => void;
};

const useLabelStore = create<LabelState>((set) => ({
  labels: [],

  setlabels: (labels) => set({ labels }),

  addLabel: (newlabel: TLabel) => {
    set((state) => ({ labels: [...state.labels, newlabel] }));
    addLabelToDB(newlabel);
  },

  updateLabel: (updated: TLabel) => {
    set((state) => ({
      labels: state.labels.map((l) =>
        l.localId === updated.localId ? { ...l, ...updated } : l
      ),
    }));
    updateLabelInDB(updated);
  },

  deleteLabel: (labelLocalId: string) => {
    set((state) => ({
      labels: state.labels.filter((l) => l.localId !== labelLocalId),
    }));
    deleteLabelfromDB(labelLocalId);
    removeLabelFromTasks(labelLocalId);
  },
}));

export default useLabelStore;
