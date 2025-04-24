type User = {
    name: string;
    email: string;
    preference?: Preference
}

type Preference = {
    favourite_actors?: string[];
    favourite_directors?: string[];
    favourtie_genres?: string[];
    preferred_language?: string[]
}

export type RegisterResponse = {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export type LoginResponse = {
    access_token: string;
    refresh_token: string;
    token_type: string;
    user: User;
}