'use client';

import { useRouter } from 'next/navigation';
import { Button, Group, Paper } from '@mantine/core';
import SmallLogo from './SmallLogo';

export default function Header() {
  const router = useRouter();

  return (
    <Paper m="1.5rem 0">
      <Group justify="space-between">
        <SmallLogo />
        <Group gap="lg">
          <Button variant="transparent" c="#ECECEC" size="md" onClick={() => router.push('/login')}>
            Log in
          </Button>
          <Button bg="#ECECEC" c="#242424" size="md" onClick={() => router.push('/register')}>
            Sign up
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}
