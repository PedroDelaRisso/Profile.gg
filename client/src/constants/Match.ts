interface IKill {
    assistants?: IAssistant[];
    damage_weapon_assets?: {
        display_icon?: string;
        killfeed_icon?: string;
    };
    damage_weapon_id?: string;
    damage_weapon_name?: string;
    kill_time_in_match?: number;
    kill_time_in_round?: number;
    killer_display_name?: string;
    killer_puuid?: string;
    killer_team?: 'Blue' | 'Red';
    player_locations_on_kill?: IPlayerLocationOnKill[];
    round?: number;
    secondary_fire_mode?: boolean;
    victim_death_location?: {
        x?: number;
        y?: number;
    };
    victim_display_name?: string;
    victim_puuid?: string;
    victim_team?: 'Blue' | 'Red';
}

interface IAssistant {
    assistant_display_name?: string;
    assistant_puuid?: string;
    assistant_team?: 'Blue' | 'Red';
}

interface IPlayerLocationOnKill {
    location?: {
        x?: number;
        y?: number;
    };
    player_display_name?: string;
    player_puuid?: string;
    player_team?: string;
    view_radians?: number;
}

interface IMetadata {
    cluster?: string;
    game_length?: number;
    game_start?: number;
    game_start_patched?: string;
    game_version?: string;
    map?: string;
    matchid?: string;
    mode?: string;
    platform?: string;
    queue?: string;
    region?: string;
    rounds_played?: number;
    season_id?: string;
}

interface IPlayer {
    ability_casts?: {
        c_cast?: number;
        e_cast?: number;
        q_cast?: number;
        x_cast?: number;
    };
    assets?: {
        agent?: {
            bust?: string;
            full?: string;
            killfeed?: string;
            small?: string;
        }
    };
    card?: {
        large?: string;
        small?: string;
        wide?: string;
    };
    behavior?: {
        afk_rounds?: number;
        friendly_fire?: {
            incoming?: number;
            outgoing?: number;
        };
        rounds_in_spawn?: number;
    };
    character?: string;
    currenttier?: number;
    currenttier_patched?: string;
    damage_made?: number;
    damage_received?: number;
    economy?: {
        loadout_value?: {
            average?: number;
            overall?: number;
        };
        spent?: {
            average?: number;
            overall?: number;
        };
    };
    level?: number;
    name?: string
    party_id?: string;
    platform?: {
        type?: string;
        os?: {
            name?: string;
            version?: string;
        };
    };
    player_card?: string;
    player_title?: string;
    puuid?: string;
    session_playtime?: {
        minutes?: number;
        seconds?: number;
        milliseconds?: number;
    };
    stats?: {
        assists?: number;
        bodyshots?: number;
        deaths?: number;
        headshots?: number;
        kills?: number;
        legshots?: number;
        score?: number;
    };
    tag?: string;
    team?: 'Blue' | 'Red';
}

interface IPlayers {
    all_players?: IPlayer[];
    blue?: IPlayer[];
    red?: IPlayer[];
}

interface IMatch {
    kills?: IKill[];
    metadata?: IMetadata;
    players?: {
        all_players?: IPlayer[];
        blue?: IPlayer[];
        red?: IPlayer[];
    };
} export default IMatch;