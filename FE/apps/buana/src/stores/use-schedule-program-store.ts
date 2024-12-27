import type { ScheduleProgram } from "@/lib/validations/schedule-program";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ScheduleProgramState = {
  counter: number;
  scheduleProgram: ScheduleProgram[];
  set: (scheduleProgram: ScheduleProgram[]) => void;
  add: (scheduleProgram: ScheduleProgram) => void;
  reset: () => void;
  remove: (position?: number) => void;
};

export const useScheduleProgramStore = create<ScheduleProgramState>()(
  devtools((set, get) => ({
    scheduleProgram: [],
    counter: 1,
    add: (scheduleProgram) => {
      const position = get().counter;
      set((state) => ({
        scheduleProgram: [
          ...state.scheduleProgram,
          { ...scheduleProgram, position },
        ],
        counter: state.counter + 1,
      }));
    },
    reset: () => {
      set(() => ({
        scheduleProgram: [],
      }));
    },
    remove: (position) => {
      set((state) => ({
        scheduleProgram: state.scheduleProgram.filter(
          (scheduleProgram) => scheduleProgram.position !== position,
        ),
        counter: state.counter - 1,
      }));
    },
    set: (scheduleProgram) => {
      set(() => ({
        scheduleProgram,
      }));
    }
  })),
);
