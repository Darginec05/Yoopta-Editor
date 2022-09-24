import type { NextPage } from 'next';
import { SlateEditor } from '../components/Editor/Editor';

const isServer = typeof window === 'undefined';

const Home: NextPage = () => {
  if (isServer) return null;

  return (
    <div>
      <SlateEditor />
    </div>
  );
};

export default Home;
