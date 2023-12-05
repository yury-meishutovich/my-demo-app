import React, { useEffect, useState, useRef } from 'react';
import { Challenge } from './Challenge'
import { Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { getChallanges, reportScore, secureApiCall } from '../services';

import { useBusyBackgroundDispatch } from './BusyBackgroundProvider';
import { useMsal } from "@azure/msal-react";

interface ChallengeState {
  homePlayerName: string;
  guestPlayerName: string;
  id: number;
}


export const Challenges = (): React.JSX.Element => {
  const [challenges, setChallenges] = useState<ChallengeState[] | undefined>();
  const { instance, inProgress, accounts } = useMsal();
  const dispatch = useBusyBackgroundDispatch();
  const showProgressBarRef = useRef(dispatch);

  useEffect(() => {
    if (!challenges) {
      showProgressBarRef.current(true);
      secureApiCall(instance, inProgress, accounts, (token) => getChallanges(token).then(r => { setChallenges(r); showProgressBarRef.current(false); }).catch(e => { console.error(e); }));
    }
  }, [instance, inProgress, accounts, challenges]);

  
  const navigate = useNavigate();

  const hanldeOnScoreReported = (challengeId: number, homePlayerSocre: number[], guestPlayerScore: number[]) => {
    showProgressBarRef.current(true);
    secureApiCall(instance, inProgress, accounts, (token) => reportScore(token, challengeId, homePlayerSocre, guestPlayerScore).then(() => { navigate("/matches") }).catch(e => { console.error(e); }));
  };

  return (
    <Stack>
      {challenges?.map(c => (
        <Challenge key={c.id} homePlayer={c.homePlayerName} guestPlayer={c.guestPlayerName} onScoreReported=
          {(homePlayerScore, guestPlayerScore) => hanldeOnScoreReported(c.id, homePlayerScore, guestPlayerScore)} />
      ))}
    </Stack>
  )
}
