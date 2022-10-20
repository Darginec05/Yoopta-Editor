import type { NextPage } from 'next';
import { AlertProvider } from '../components/Alert/Alert';
import { SlateEditor } from '../components/Editor/Editor';
import { ScrollProvider } from '../contexts/ScrollContext/ScrollContext';

const isServer = typeof window === 'undefined';

const Home: NextPage = () => {
  if (isServer) return null;

  return (
    <div>
      <ScrollProvider>
        <AlertProvider>
          <SlateEditor />
        </AlertProvider>
      </ScrollProvider>
    </div>
  );
};

export default Home;
