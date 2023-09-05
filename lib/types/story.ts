export interface UserStory {
  id: string;
  email: string;
  nickname: string;
  tags: string[];
  describtion: string;
  public: boolean;
  view: number;
  meta_text_color: string;
  meta_bg_color: string;
  meta_font_style: string;
  meta_font_size: string;
  meta_font_weight: string;
  meta_layout: string;

  expires: string;
  createdAt: string;
  updatedAt: string;
}
