import React from "react";
import { useBusyBackgroundContext } from './BusyBackgroundProvider';
import {
  LinearProgress,
  Box
} from '@mui/material';


export const BusyBackground = (): React.JSX.Element => {
  const busyBackgroundContext = useBusyBackgroundContext();
  return (<>{busyBackgroundContext && <Box sx={{ width: '100%' }}><LinearProgress /> </Box>}</>);
}
