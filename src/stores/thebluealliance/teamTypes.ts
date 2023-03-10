import { z } from "zod";
import { MatchLevel } from "../match/matchTypes";

export const MatchTeam = () => 
    z.number();
export type MatchTeam = z.infer<ReturnType<typeof MatchTeam>>;

export const TeamPosition = () => z.enum(["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]);
export type TeamPosition = z.infer<ReturnType<typeof TeamPosition>>;

export const MatchTeams = () =>
    z.object({
        matchLevel: MatchLevel(),
        matchNumber: z.number(),

        [TeamPosition().Enum["Red 1"]]: MatchTeam(),
        [TeamPosition().Enum["Red 2"]]: MatchTeam(),
        [TeamPosition().Enum["Red 3"]]: MatchTeam(),

        [TeamPosition().Enum["Blue 1"]]: MatchTeam(),
        [TeamPosition().Enum["Blue 2"]]: MatchTeam(),
        [TeamPosition().Enum["Blue 3"]]: MatchTeam(),
    });
export type MatchTeams = z.infer<ReturnType<typeof MatchTeams>>;
