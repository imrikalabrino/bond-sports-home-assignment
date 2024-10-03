export interface Player {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    jersey_number: number | null;
    college: string | null;
    country: string | null;
    draft_year: number | null;
    draft_round: number | null;
    draft_number: number | null;
    height: string | null;
    weight: string | null;
    team: Team;
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

export interface PlayerStats {
    games_played: number;
    player_id: number;
    season: number;
    min: string;
    fgm: number;
    fga: number;
    fg3m: number;
    fg3a: number;
    ftm: number;
    fta: number;
    oreb: number;
    dreb: number;
    reb: number;
    ast: number;
    stl: number;
    blk: number;
    turnover: number;
    pf: number;
    pts: number;
    fg_pct: number;
    fg3_pct: number;
    ft_pct: number;
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
