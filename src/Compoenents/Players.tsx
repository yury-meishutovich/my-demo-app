import React, { useState, useEffect,  useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { getPlayers, issueChallenge, secureApiCall } from '../services';
import { useBusyBackgroundDispatch } from './BusyBackgroundProvider';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useMsal } from "@azure/msal-react";

export interface Player {
  id: number,
  name: string,
  pos: number
}

export const Players = (): React.JSX.Element => {

  const [players, setPlayers] = useState<Player[] | undefined>();
  const { instance, inProgress, accounts } = useMsal();

  const dispatch = useBusyBackgroundDispatch();
  const showProgressBarRef = useRef(dispatch);
  useEffect(() => {
    if (!players) {

      showProgressBarRef.current(true);
      secureApiCall(instance, inProgress, accounts, (token: string) => getPlayers(token).then(r => { setPlayers(r); showProgressBarRef.current(false); }).catch(e => console.error(e)));
    }
  }, [instance, accounts, inProgress, players]);


  const navigate = useNavigate();


  const handleOnClinkNewChallenge = async (playerId: number): Promise<void> => {
    showProgressBarRef.current(true);
    secureApiCall(instance, inProgress, accounts, (token: string) => issueChallenge(token, playerId).then(() => navigate("/challenges")).catch(e => console.error(e)));
  }


  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Ranking</TableCell>
          <TableCell>Name</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {players?.map(player =>
          <TableRow key={player.id.toString()}>
            <TableCell>{player.pos}</TableCell>
            <TableCell>{player.name}</TableCell>
            <TableCell><Button onClick={() => handleOnClinkNewChallenge(player.id)}>Challenge</Button></TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}