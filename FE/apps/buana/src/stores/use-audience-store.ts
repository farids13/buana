import type { Audience } from "@/lib/validations/audience";
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AudienceState = {
  counter: number;
  audience: Audience[];
  set: (audience: Audience[]) => void;
  add: (audience: Audience | Audience[]) => void;
  reset: () => void;
  remove: (email: string) => void;
};

export const useAudienceStore = create<AudienceState>()(
  devtools((set) => ({
    audience: [],
    counter: 0,
    add: (audience) => {
      set((state) => {
        const newAudience = Array.isArray(audience) ? audience : [audience];
        const existingEmails = state.audience.map((item) => item.email);
        const uniqueAudience = newAudience.filter((item) => !existingEmails.includes(item.email));

        if (uniqueAudience.length !== newAudience.length) {
          const duplicateEmails = newAudience.filter((item) => existingEmails.includes(item.email));
          if (!Array.isArray(audience))
            toast.error(`Email already exists: ${duplicateEmails.map((item) => item.email).join(', ')}`);
          else {
            toast.success("Audience Group added successfully");
          }
        }

        return {
          audience: [...state.audience, ...uniqueAudience],
          counter: state.counter + uniqueAudience.length,
        };
      });
    },

    reset: () => {
      set(() => ({
        audience: [],
      }));
    },
    remove: (email) => {
      set((state) => ({
        audience: state.audience.filter((audience) => audience.email !== email),
        counter: state.counter - 1,
      }));
    },
    set: (audience) => {
      set(() => ({
        audience,
      }));
    },
  })),
);
