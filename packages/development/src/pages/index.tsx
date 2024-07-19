import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/dev');
  });

  return (
    <div>
      <h1>Some markup</h1>
    </div>
  );
};

export default Index;
