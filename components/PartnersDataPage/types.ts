export interface Review {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface Result {
  name: string;
  rating: number;
  reviews: Review[];
  url: string;
  user_ratings_total: number;
}

export interface PlaceDetails {
  html_attributions: string[];
  result: Result;
  status: string;
}
