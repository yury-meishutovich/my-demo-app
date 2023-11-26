import React, { useState, SetStateAction, Dispatch } from "react";
import { Score } from "./Score";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack
} from '@mui/material';

interface ChallengeProps {
  homePlayer: string;
  guestPlayer: string;
  onScoreReported: (homePlayerScore: number[], guestPlayerScore: number[]) => void
}

export const Challenge = ({ homePlayer, guestPlayer, onScoreReported }: ChallengeProps): React.JSX.Element => {

  const handleOnScoreChanged = (score: number, playerScore: number[], set: number, setFunc: Dispatch<SetStateAction<number[]>>): void => {
    const newPlayerScore = playerScore.map((oldScore, i) => i === set ? score : oldScore);
    setFunc(newPlayerScore);
  }

  const [homePlayerScore, setHomePlayerScore] = useState<number[]>([0, 0, 0]);
  const [guestPlayerScore, setGuestPlayerScore] = useState<number[]>([0, 0, 0]);

  return (
    <Stack >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Players</TableCell>
            <TableCell>1st Set</TableCell>
            <TableCell>2nd Set</TableCell>
            <TableCell>3rd Set</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{homePlayer}</TableCell>
            <TableCell><Score score={homePlayerScore[0]} onScoreChanged={(score) => handleOnScoreChanged(score, homePlayerScore, 0, setHomePlayerScore)} /></TableCell>
            <TableCell><Score score={homePlayerScore[1]} onScoreChanged={(score) => handleOnScoreChanged(score, homePlayerScore, 1, setHomePlayerScore)} /></TableCell>
            <TableCell><Score score={homePlayerScore[2]} onScoreChanged={(score) => handleOnScoreChanged(score, homePlayerScore, 2, setHomePlayerScore)} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{guestPlayer}</TableCell>
            <TableCell><Score score={guestPlayerScore[0]} onScoreChanged={(score) => handleOnScoreChanged(score, guestPlayerScore, 0, setGuestPlayerScore)} /></TableCell>
            <TableCell><Score score={guestPlayerScore[1]} onScoreChanged={(score) => handleOnScoreChanged(score, guestPlayerScore, 1, setGuestPlayerScore)} /></TableCell>
            <TableCell><Score score={guestPlayerScore[2]} onScoreChanged={(score) => handleOnScoreChanged(score, guestPlayerScore, 2, setGuestPlayerScore)} /></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button variant="outlined" onClick={(e) => { e.preventDefault(); onScoreReported(homePlayerScore, guestPlayerScore); }}>Report Score</Button>
    </Stack>
  )
}
