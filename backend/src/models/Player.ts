export interface Player {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    height: string | null;
    weight: string | null;
    team: Team;
}

export interface EnhancedPlayer extends Player {
    teamColors: {
        primary: string;
        secondary: string;
    };
}

export interface Team {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total_pages: number;
        current_page: number;
        next_cursor: string | null;
        per_page: number;
        total_count: number;
    };
}
