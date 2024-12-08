'use client';

import { useRouter } from 'next/navigation';
import { Image, ImageProps } from '@mantine/core';

export default function SmallLogo(props: ImageProps) {
  const router = useRouter();
  return (
    <>
      <Image
        src="/rmp-small-logo.png"
        height={50}
        w={100}
        onClick={() => {
          router.push('/');
        }}
        style={{
          cursor: 'pointer',
        }}
        {...props}
      />
    </>
  );
}
