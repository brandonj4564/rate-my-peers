import { Image, ImageProps } from '@mantine/core';

export default function LargeLogo(props: ImageProps) {
  return (
    <>
      <Image src="/rate-my-peers-logo.png" height={80} w={500} {...props} />
    </>
  );
}
