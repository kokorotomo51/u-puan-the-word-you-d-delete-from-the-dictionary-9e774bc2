import { mkdirSync, writeFileSync } from "node:fs";

// Candidate words scored against the judge's published criteria, most
// important first: recognisable real word, joke lands at first sight,
// humour from the word itself (sound, double meaning, gap it leaves),
// freshness against what the rest of the field picks first, exactness.
type Candidate = {
  word: string;
  recognisable: number;
  landsAtFirstSight: number;
  fromTheWordItself: number;
  fresh: number;
};

const CANDIDATES: Candidate[] = [
  { word: "moist", recognisable: 5, landsAtFirstSight: 4, fromTheWordItself: 2, fresh: 1 },
  { word: "synergy", recognisable: 5, landsAtFirstSight: 3, fromTheWordItself: 2, fresh: 1 },
  { word: "literally", recognisable: 5, landsAtFirstSight: 3, fromTheWordItself: 2, fresh: 2 },
  { word: "whom", recognisable: 5, landsAtFirstSight: 3, fromTheWordItself: 4, fresh: 4 },
  { word: "discombobulate", recognisable: 4, landsAtFirstSight: 4, fromTheWordItself: 4, fresh: 3 },
  { word: "defenestration", recognisable: 5, landsAtFirstSight: 5, fromTheWordItself: 5, fresh: 4 },
];

function score(c: Candidate): number {
  // Lexicographic weighting: earlier criteria dominate later ones.
  return (
    c.recognisable * 10000 +
    c.landsAtFirstSight * 1000 +
    c.fromTheWordItself * 100 +
    c.fresh * 10
  );
}

function pickWinner(candidates: Candidate[]): string {
  let best = candidates[0];
  for (const c of candidates.slice(1)) {
    if (score(c) > score(best)) best = c;
  }
  return best.word;
}

// "defenestration": a funny-sounding, absurdly specific word for throwing
// someone out of a window. Erasing it leaves the language with no single
// word for history's favourite window-related crime.
const WORD = pickWinner(CANDIDATES);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", WORD, "utf8");
