'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconArrowLeft } from '@tabler/icons-react';
import {
  BackgroundImage,
  Button,
  Flex,
  Grid,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import LargeLogo from '@/components/LargeLogo';

const LoginForm = () => {
  const router = useRouter();
  const theme = useMantineTheme();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 0 ? null : 'Enter a password!'),
    },
  });

  return (
    <Stack gap="xl" w={500}>
      <Group onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
        <IconArrowLeft />
        <Text>Back</Text>
      </Group>
      <Stack gap="sm">
        <Title fw="400" fz="40" c="white">
          Log In
        </Title>
        <Text>Your former groupmates are waiting for your ratings enthusiastically</Text>
      </Stack>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack gap="md">
          <TextInput
            label="Email"
            variant="filled"
            size="md"
            labelProps={{ m: '0.5rem 0' }}
            type="email"
            placeholder="your@email.com"
            key={form.key('email')}
            withAsterisk
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            variant="filled"
            size="md"
            labelProps={{ m: '0.5rem 0' }}
            withAsterisk
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Button size="md" m="1rem 0" type="submit" w="100%" mt="3rem">
            Log in
          </Button>
        </Stack>
      </form>
      <Group>
        <Text>Don't have an account?</Text>
        <Text
          c={theme.primaryColor}
          fw="600"
          style={{ cursor: 'pointer' }}
          onClick={() => router.push('/register')}
        >
          Sign Up
        </Text>
      </Group>
      <Paper h="10vh" />
    </Stack>
  );
};

export default function LoginPage() {
  return (
    <>
      <Grid m="1rem">
        <Grid.Col span={6}>
          <BackgroundImage src="/school-background.png" h="97vh" radius={20}>
            <Flex w="100%" align="center" justify="center" h="100%">
              <Stack align="center">
                <LargeLogo m="1rem 0" />
                <Stack w="80%">
                  <Title c="white" fw="500" fz={46} lts={1}>
                    Friendships thrive on anonymous critique!
                  </Title>
                  <Text fz={18}>
                    Where trust is optional, opinions are eternal, and your social score is just a
                    click away. Welcome to the future of accountability—powered by your peers.
                  </Text>
                </Stack>
                <Paper h="10vh" />
              </Stack>
            </Flex>
          </BackgroundImage>
        </Grid.Col>
        <Grid.Col span={6}>
          <Flex w="100%" align="center" justify="center" h="100%">
            <LoginForm />
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
}
