import { create } from "zustand";
import { FeedbackItemType } from "../lib/types";

type FeedbackItemStore = {
  feedbackItems: FeedbackItemType[];
  isLoading: boolean;
  error: string;
  selectedCompany: string;
  getFilteredFeedbackItems: () => FeedbackItemType[];
  getCompanyList: () => string[];
  addFeedback: (text: string) => void;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => void;
};

export const useFeedbackItemsStore = create<FeedbackItemStore>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  error: "",
  selectedCompany: "",
  addFeedback: async (text: string) => {
    const companyName =
      text
        .split(" ")
        .find((word) => word.includes("#"))
        ?.substring(1) || "";

    const newFeedbackItem: FeedbackItemType = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyName?.substring(0, 1).toUpperCase() || "",
      company: companyName,
      text,
      daysAgo: 0,
    };
    set((state) => ({
      feedbackItems: [...state.feedbackItems, newFeedbackItem],
    }));
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newFeedbackItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  },
  selectCompany: (company: string) => {
    set((state) => ({
      selectedCompany: state.selectedCompany === company ? "" : company,
    }));
  },
  fetchFeedbackItems: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch feedbacks");
      }
      const data = await response.json();
      set({ feedbackItems: data.feedbacks });
    } catch {
      set({ error: "Failed to fetch feedbacks" });
    } finally {
      set({ isLoading: false });
    }
  },
  getFilteredFeedbackItems: () => {
    return get().selectedCompany
      ? get().feedbackItems.filter(
          (feedbackItem) => feedbackItem.company === get().selectedCompany
        )
      : get().feedbackItems;
  },
  getCompanyList: () => {
    return get()
      .feedbackItems.map((feedbackItem) => feedbackItem.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  },
}));
