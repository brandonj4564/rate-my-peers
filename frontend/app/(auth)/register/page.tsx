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
  Select,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import LargeLogo from '@/components/LargeLogo';
import { useRegisterFormContext } from '../OnboardingContext';

const OnboardingForm = ({ setStep }: { setStep: (step: number) => void }) => {
  const registerForm = useRegisterFormContext();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: '',
      lastName: '',
      school: '',
      major: '',
      year: '',
      degree: '',
    },
    validate: {
      firstName: (value) => (value.length > 0 ? null : 'Enter your first name'),
      lastName: (value) => (value.length > 0 ? null : 'Enter your last name'),
      school: (value) => (value.length > 0 ? null : 'Enter your school'),
      major: (value) => (value.length > 0 ? null : 'Enter your major'),
      year: (value) => (value.length > 0 ? null : 'Select your year'),
      degree: (value) => (value.length > 0 ? null : 'Select your degree'),
    },
  });

  const handleCreateAccount = () => {
    // Create the account in the backend and navigate back to the home page
    console.log('account created');
    console.log(registerForm.values); // use these values too
  };

  return (
    <Stack gap="xl" w={500}>
      <Group onClick={() => setStep(0)} style={{ cursor: 'pointer' }}>
        <IconArrowLeft />
        <Text>Back</Text>
      </Group>
      <Stack gap="sm">
        <Title fw="400" fz="40" c="white">
          Create Account
        </Title>
        <Text>We just need a little bit more information from you</Text>
      </Stack>
      <form onSubmit={form.onSubmit(handleCreateAccount)}>
        <Stack gap="md">
          <Group w="100%" justify="space-between">
            <TextInput
              label="First name"
              variant="filled"
              size="md"
              labelProps={{ m: '0.5rem 0' }}
              placeholder="John"
              key={form.key('firstName')}
              withAsterisk
              w="48%"
              {...form.getInputProps('firstName')}
            />
            <TextInput
              label="Last name"
              variant="filled"
              size="md"
              labelProps={{ m: '0.5rem 0' }}
              placeholder="Doe"
              key={form.key('lastName')}
              withAsterisk
              w="48%"
              {...form.getInputProps('lastName')}
            />
          </Group>

          <TextInput
            label="School"
            variant="filled"
            size="md"
            labelProps={{ m: '0.5rem 0' }}
            placeholder="Harvard University"
            key={form.key('school')}
            withAsterisk
            {...form.getInputProps('school')}
          />

          <TextInput
            label="Major"
            variant="filled"
            size="md"
            labelProps={{ m: '0.5rem 0' }}
            placeholder="Computer Science"
            key={form.key('major')}
            withAsterisk
            {...form.getInputProps('major')}
          />

          <Group w="100%" justify="space-between">
            <Select
              label="Year"
              placeholder="1st Year"
              data={['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', '6th Year']}
              variant="filled"
              size="md"
              labelProps={{ m: '0.5rem 0' }}
              key={form.key('year')}
              withAsterisk
              {...form.getInputProps('year')}
              w="48%"
            />

            <Select
              label="Degree"
              placeholder="Bachelor"
              data={['High School', 'Associate', 'Bachelor', 'Master', 'Ph.D', 'Law']}
              variant="filled"
              size="md"
              labelProps={{ m: '0.5rem 0' }}
              key={form.key('degree')}
              withAsterisk
              {...form.getInputProps('degree')}
              w="48%"
            />
          </Group>

          <Button size="md" m="1rem 0" type="submit" w="100%" mt="3rem">
            Finish
          </Button>
        </Stack>
      </form>
      <Paper h="10vh" />
    </Stack>
  );
};

const RegisterForm = ({ setStep }: { setStep: (step: number) => void }) => {
  const theme = useMantineTheme();
  const router = useRouter();

  // Okay I've only now realized I didn't need to waste time making a form context but it's kinda cool so I'll leave it here in case I forget how to do it in the future
  const form = useRegisterFormContext();

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
      <form onSubmit={form.onSubmit(() => setStep(1))}>
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
  const [step, setStep] = useState(0);

  return (
    <>
      <Grid m="1rem">
        <Grid.Col span={6}>
          <Flex w="100%" align="center" justify="center" h="100%">
            {step === 0 && <RegisterForm setStep={setStep} />}
            {step === 1 && <OnboardingForm setStep={setStep} />}
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
