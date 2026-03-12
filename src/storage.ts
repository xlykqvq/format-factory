import type { ResumeData } from "./types";

const KEY = "ff_resume_data_v1";

export function loadResumeData(): ResumeData | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ResumeData;
  } catch {
    return null;
  }
}

export function saveResumeData(data: ResumeData) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

