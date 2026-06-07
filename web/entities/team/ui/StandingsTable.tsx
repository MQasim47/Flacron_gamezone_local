import Image from "next/image";
import Link from "next/link";
import { Trophy } from "lucide-react";

interface Team {
  id: string;
  name: string;
  logo: string | null;
  apiTeamId: number | null;
}
interface StandingTeam {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

interface StandingsTableProps {
  standings: StandingTeam[];
  promotionZones?: number;
  relegationZones?: number;
  showTeamLinks?: boolean;
}

export function StandingsTable({
  standings,
  promotionZones = 4,
  relegationZones = 3,
  showTeamLinks = true,
}: StandingsTableProps) {
  if (standings.length === 0) {
    return (
      <div className="p-6 sm:p-8 text-center text-muted-foreground">
        <Trophy className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 opacity-50" />
        <p className="text-base sm:text-lg font-medium mb-2">
          No Standings Available
        </p>
        <p className="text-sm">
          This league doesn't have any teams or finished matches yet.
        </p>
      </div>
    );
  }

  const TeamName = ({
    standing,
    index,
  }: {
    standing: StandingTeam;
    index: number;
  }) => {
    const content = (
      <div className="flex items-center gap-2">
        {standing.team.logo && (
          <Image
            src={standing.team.logo}
            alt={standing.team.name}
            width={20}
            height={20}
            style={{ height: "auto" }}
            className="rounded w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
          />
        )}
        <span className="font-medium text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">
          {standing.team.name}
        </span>
      </div>
    );
    if (showTeamLinks)
      return (
        <Link
          href={`/teams/${standing.team.id}`}
          className="hover:text-blue-400 transition-colors"
        >
          {content}
        </Link>
      );
    return content;
  };

  return (
    <div className="bg-card border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead className="bg-slate-800/50">
            <tr className="text-xs text-muted-foreground">
              {[
                { full: "#", short: "#" },
                { full: "Team", short: "Team" },
                { full: "P", short: "P" },
                { full: "W", short: "W" },
                { full: "D", short: "D" },
                { full: "L", short: "L" },
                { full: "GF", short: "GF" },
                { full: "GA", short: "GA" },
                { full: "GD", short: "GD" },
                { full: "Pts", short: "Pts" },
              ].map((h, i) => (
                <th
                  key={i}
                  className={`${i <= 1 ? "text-left" : "text-center"} p-2 sm:p-3 font-medium whitespace-nowrap`}
                >
                  {h.full}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.map((standing, index) => {
              const isPromotion = index < promotionZones;
              const isRelegation =
                index >= standings.length - relegationZones &&
                index >= promotionZones;
              return (
                <tr
                  key={standing.team.id}
                  className="border-t border-slate-700/50 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="p-2 sm:p-3">
                    <span
                      className={`font-medium text-xs sm:text-sm ${isPromotion ? "text-green-500" : isRelegation ? "text-red-500" : ""}`}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="p-2 sm:p-3">
                    <TeamName standing={standing} index={index} />
                  </td>
                  {[
                    standing.played,
                    standing.won,
                    standing.drawn,
                    standing.lost,
                    standing.goalsFor,
                    standing.goalsAgainst,
                  ].map((val, i) => (
                    <td
                      key={i}
                      className="text-center p-2 sm:p-3 text-xs sm:text-sm"
                    >
                      {val}
                    </td>
                  ))}
                  <td className="text-center p-2 sm:p-3 text-xs sm:text-sm">
                    <span
                      className={
                        standing.goalDifference > 0
                          ? "text-green-500"
                          : standing.goalDifference < 0
                            ? "text-red-500"
                            : ""
                      }
                    >
                      {standing.goalDifference > 0 ? "+" : ""}
                      {standing.goalDifference}
                    </span>
                  </td>
                  <td className="text-center p-2 sm:p-3 font-bold text-xs sm:text-sm">
                    {standing.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
