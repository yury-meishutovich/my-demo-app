import React, { useState, useEffect,  useRef } from 'react';
import { useMsal } from "@azure/msal-react";
import { getMatches, secureApiCall } from '../services';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useBusyBackgroundDispatch } from './BusyBackgroundProvider';


interface MatchState {
  homePlayerName: string;
  guestPlayerName: string;
  homePlayerScore: number[];
  guestPlayerScore: number[]
}

export const Matches = (): React.JSX.Element => {

  const [matches, setMatches] = useState<MatchState[] | undefined>();
  const { instance, inProgress, accounts } = useMsal();
  
  const dispatch = useBusyBackgroundDispatch();
  const showProgressBarRef = useRef(dispatch);
  
  useEffect(() => {
    if (!matches) {
      showProgressBarRef.current(true);
      secureApiCall(instance, inProgress, accounts, (token: string) => getMatches(token).then(r => { setMatches(r); showProgressBarRef.current(false);  }).catch(e => console.error(e)));
    }
  }, [instance, inProgress, accounts, matches]);


  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Home Player</TableCell>
          <TableCell>Guest Player</TableCell>
          <TableCell>1st Set</TableCell>
          <TableCell>2nd Set</TableCell>
          <TableCell>3rd Set</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {matches?.map((m, i) =>
          <TableRow key={i.toString()}>
            <TableCell>{m.homePlayerName}</TableCell>
            <TableCell>{m.guestPlayerName}</TableCell>
            <TableCell>{m.homePlayerScore[0]}-{m.guestPlayerScore[0]}</TableCell>
            <TableCell>{m.homePlayerScore[1]}-{m.guestPlayerScore[1]}</TableCell>
            <TableCell>{m.homePlayerScore[2]}-{m.guestPlayerScore[2]}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}