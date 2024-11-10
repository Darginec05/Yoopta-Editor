import Router from 'next/router';
import { useEffect } from 'react';

function WithEmailBuilder() {
  useEffect(() => {
    Router.replace('/examples/withEmailBuilder/email-builder');
  });

  return null;
}

export default WithEmailBuilder;
