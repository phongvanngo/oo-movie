export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// ======== Comment interfaces==========
export interface ICommentChild {
  id: number;
  text: string;
  author: string;
}

export interface IComment {
  id: number;
  text: string;
  author: string;
  children?: ICommentChild[];
}

export interface ICommentData {
  title?: string;
  author?: string;
  comments?: IComment[] | undefined;
}

export const MovieModelMapPattern = {
  //   release_date: 'releaseDate',
  //   releaseDate: 'release_date',
  //   poster_path: 'posterPath',
  //   posterPath: 'poster_path',
  genres: 'genre_ids',
  genre_ids: 'genres',
  //   original_title: 'originalTitle',
  //   originalTitle: 'original_title',
  back_drop_path: 'backdrop_path',
};
