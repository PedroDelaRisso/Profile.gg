interface Kill {
    assistants: any[];
    damage_weapon_assets: {
        display_icon: string;
        killfeed_icon: string;
    };
    damage_weapon_id: string;
    damage_weapon_name: string;
    kill_time_in_match: number;
    kill_time_in_round: number;
    killer_display_name: string;
    killer_puuid: string;
    killer_team: 'Blue' | 'Red';
    player_locations_on_kill: PlayerLocationOnKill[];
    round: number;
    secondary_fire_mode: boolean;
    victim_death_location: {
        x: number;
        y: number;
    };
    victim_display_name: string;
    victim_puuid: string;
    victim_team: 'Blue' | 'Red';
}

interface PlayerLocationOnKill {
    location: {
        x: number;
        y: number;
    };
    player_display_name: string;
    player_puuid: string;
    player_team: string;
    view_radians: number;
}

export default interface IMatch {
    kills: Kill[];

}

export default class Match implements IMatch {
    public kills: Array<Kill>;
    constructor() {
        this.kills = [];
    }
}