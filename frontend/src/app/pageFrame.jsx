'use client'

import { Card, CardContent, Container, Link, Stack, ThemeProvider, Typography, createTheme } from "@mui/material";
import NextLink from 'next/link';
import { forwardRef } from 'react';

import SmAppBar from './SmAppBar'


const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
  return <NextLink ref={ref} {...props} />;
});


export default function PageFrame({
  children,
}) {
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehaviour
        }
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehaviour
        }
      }
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#ffa726', // orange 400
      },
      secondary: {
        main: '#4db6ac', // teal 300
      },
    },
    typography: {
      h1: {
        fontFamily: 'Lora',
        fontSize: '3.5rem',
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <SmAppBar />

      <Container maxWidth="md">
        <Stack>
          <Card sx={{ backgroundColor: '#fffefb', m: 4, p: 3 }}>
            <CardContent>

              {children}

            </CardContent>
          </Card>

          <Typography variant="body">Student Meals © 2024</Typography>

          <Link variant="body2" href="https://www.flaticon.com/free-icons/enjoy" title="enjoy icons"
            target="_blank" rel="noopener" sx={{ mt: 3 }}
          >
            Enjoy icons created by tulpahn - Flaticon
          </Link>
        </Stack>
      </Container>
    </ThemeProvider>
  )
}
