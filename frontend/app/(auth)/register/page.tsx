'use client';

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
import LargeLogo from '@/components/LargeLogo';
import { OnboardingFormProvider, useRegisterForm } from '../OnboardingContext';

const RegisterForm = () => {
  const router = useRouter();
  const theme = useMantineTheme();

  const form = useRegisterForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '', confirmPassword: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 0 ? null : 'Invalid password'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
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
          Sign Up
        </Title>
        <Text>
          Sign up now to join the network where every click shapes reputations, and yours is next
        </Text>
      </Stack>
      <OnboardingFormProvider form={form}>
        <form onSubmit={form.onSubmit(() => router.push('/onboarding'))}>
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
              key={form.key('password')}
              withAsterisk
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirm password"
              variant="filled"
              size="md"
              labelProps={{ m: '0.5rem 0' }}
              placeholder="Confirm password"
              key={form.key('confirmPassword')}
              withAsterisk
              {...form.getInputProps('confirmPassword')}
            />
            <Button size="md" m="1rem 0" type="submit" w="100%" mt="3rem">
              Next
            </Button>
          </Stack>
        </form>
      </OnboardingFormProvider>
      <Group>
        <Text>Already have an account?</Text>
        <Text
          c={theme.primaryColor}
          fw="600"
          style={{ cursor: 'pointer' }}
          onClick={() => router.push('/login')}
        >
          Log In
        </Text>
      </Group>
      <Paper h="10vh" />
    </Stack>
  );
};

export default function RegisterPage() {
  return (
    <>
      <Grid m="1rem">
        <Grid.Col span={6}>
          <Flex w="100%" align="center" justify="center" h="100%">
            <RegisterForm />
          </Flex>
        </Grid.Col>
        <Grid.Col span={6}>
          <BackgroundImage src="/register-background.png" h="97vh" radius={20}>
            <Flex w="100%" align="center" justify="center" h="100%">
              <Stack align="center">
                <LargeLogo m="1rem 0" />
                <Stack w="80%">
                  <Title c="white" fw="500" fz={46} lts={1}>
                    Join now—because judgment waits for no one.
                  </Title>
                  <Text fz={18}>
                    Step into a world where connections are currency, and every opinion counts. Sign
                    up today to claim your place in the ever-evolving tapestry of peer review.
                  </Text>
                </Stack>
                <Paper h="10vh" />
              </Stack>
            </Flex>
          </BackgroundImage>
        </Grid.Col>
      </Grid>
    </>
  );
}
