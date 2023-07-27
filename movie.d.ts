export interface Movie {
    id: number;
    cast?: Cast[];
    genres?: string;
    overview: string;
    pathBackgroud: string;
    posterPath: string;
    releaseYear: string;
    runtime?: number;
    score: string;
    title: string;
}

export interface Cast {
    name: string;
    character: string;
    pathImage: string;
}

export type Results = any[];
