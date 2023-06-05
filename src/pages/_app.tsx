import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { FlashcardsProvider } from "@/FlashcardsContext"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <FlashcardsProvider>        
        <Component {...pageProps} />
      </FlashcardsProvider>
    </SessionProvider>
  );
};

export default App;