import { useRouter } from 'next/router';
import React from 'react';

export default function ProjectPage() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace(`/project/${router.query.id}/assets`);
  }, [router]);

  return null;
}
