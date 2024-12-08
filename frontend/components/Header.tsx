import { Button, Group, Paper } from '@mantine/core';
import SmallLogo from './SmallLogo';

export default function Header() {
  // TODO: Log in and sign up
  return (
    <Paper m="1.5rem 0">
      <Group justify="space-between">
        <SmallLogo />
        <Group gap="lg">
          <Button variant="transparent" c="#ECECEC" size="md">
            Log in
          </Button>
          <Button bg="#ECECEC" c="#242424" size="md">
            Sign up
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}
