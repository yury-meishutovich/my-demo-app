import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Route, Routes, HashRouter } from 'react-router-dom';
import { Challenges } from './Challenges';
import { Players } from './Players';
import { Matches } from './Matches';
import { BusyBackgroundProvider } from './BusyBackgroundProvider';
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { BusyBackground } from './BusyBackground';



export const PageLayout = (): React.JSX.Element => {
  return (
    <>
      <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Button href="#" color="inherit">players</Button>
            <Button href="#/challenges" color="inherit">Challanges</Button>
            <Button href='#/matches' color="inherit">Matches</Button>
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
              <Snackbar
                open={true}
                autoHideDuration={600}
                message="Note archived"
              />
              <BusyBackgroundProvider>
                <>
                  <BusyBackground />
                  <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center">

                    <HashRouter>
                      <Routes>
                        <Route path="/" Component={Players} />
                        <Route path="/challenges" Component={Challenges} />
                        <Route path="/matches" Component={Matches} />
                      </Routes>
                    </HashRouter>
                  </Stack>
                </>
              </BusyBackgroundProvider>

            </Container>
          </Box>

        </main>
      </MsalAuthenticationTemplate>
    </>
  );
}