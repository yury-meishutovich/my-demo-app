import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Challenges } from './Challenges';
import { Players } from './Players';
import { Matches } from './Matches';
import { BusyContext } from './BusyContext';
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";



export const PageLayout = (): React.JSX.Element => {


  const [busy, setBusy] = useState(true)

  return (
    <>
      <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Button href="/" color="inherit">players</Button>
            <Button href="/Challenges" color="inherit">Challanges</Button>
            <Button href='/Matches' color="inherit">Matches</Button>
          </Toolbar>
        </AppBar>
        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                One More Ladder
              </Typography>
              {busy && <Box sx={{ width: '100%' }}><LinearProgress /> </Box>}
              <BusyContext.Provider value={(visiable: boolean) => setBusy(visiable)}>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center">
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" Component={Players} />
                      <Route path="/Challenges" Component={Challenges} />
                      <Route path="/Matches" Component={Matches} />
                    </Routes>
                  </BrowserRouter>
                </Stack>
              </BusyContext.Provider>
            </Container>
          </Box>

        </main>
      </MsalAuthenticationTemplate>
    </>
  );
}