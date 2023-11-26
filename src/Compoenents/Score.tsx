import React from "react";
import {
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';

interface ScoreProps {
  score: number,
  onScoreChanged: (score: number) => void
}

export const Score = ({ score, onScoreChanged }: ScoreProps): React.JSX.Element => {

  return (
    <Select value={score.toString()} onChange={(e: SelectChangeEvent) => { e.preventDefault(); onScoreChanged(parseInt(e.target.value)) }}>
      <MenuItem value={0}>0</MenuItem>
      <MenuItem value={1}>1</MenuItem>
      <MenuItem value={2}>2</MenuItem>
      <MenuItem value={3}>3</MenuItem>
      <MenuItem value={4}>4</MenuItem>
      <MenuItem value={5}>5</MenuItem>
      <MenuItem value={6}>6</MenuItem>
      <MenuItem value={7}>7</MenuItem>
    </Select>
  )
}