import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import Header from '@/components/Header';
import { theme } from '../../theme';

import '@mantine/carousel/styles.css';

export const metadata = {
  title: 'Rate My Peers',
  // description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 1248,
            padding: '0 1rem',
          }}
        >
          <MantineProvider theme={theme}>
            <Header />
            {children}
          </MantineProvider>
        </div>
      </body>
    </html>
  );
}
