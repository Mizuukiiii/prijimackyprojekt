
import '../styles/globals.css';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { AuthContextProvider } from '@/components/auth-context-provider';

import { ApolloProvider } from '@apollo/client/react';
import { getApolloClient } from '../utility/apollo-client';


interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}



const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, pageProps } = props;
  const client = getApolloClient({ forceNew: false });
  return (
    <AuthContextProvider>
      
      <ApolloProvider client={client}>
            <CssBaseline />
            <Component {...pageProps} />
            
      </ApolloProvider>
    </AuthContextProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default MyApp;

