export type QuestionType = "single" | "multiple" | "text";

export interface Choice {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  question_type: QuestionType;
  allow_free_form: boolean;
  choices: Choice[];
}

export interface Poll {
  id: number;
  title: string;
  description?: string;
  created_by: number;
  created_at: string;
  is_core_survey: boolean;
  questions: Question[];
}

export interface ResponseChoice {
  id: number;
  choice: number;
}

export interface Response {
  id: number;
  user: number;
  question: number;
  free_text_answer?: string;
  selected_choices: ResponseChoice[];
  created_at: string;
}

export interface CreateResponse {
  question: number;
  free_text_answer?: string;
  choice_ids?: number[];
}
