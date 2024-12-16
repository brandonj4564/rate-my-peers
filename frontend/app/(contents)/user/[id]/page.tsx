'use client';

import { useEffect, useState } from 'react';
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
import {
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  NumberInput,
  Paper,
  Slider,
  Stack,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

const ReviewCard = ({ username, comment }: { username: string; comment: string }) => {
  const theme = useMantineTheme();

  const AttributeScore = ({ attribute, score }: { attribute: string; score: number }) => (
    <Box p="0.5rem">
      <Flex direction="column" align="center" justify="center">
        <Text fz={12} fw={600} lts={1} mb="0.5rem">
          {attribute}
        </Text>
        <Paper
          p="0.5rem"
          w={60}
          bg={theme.primaryColor}
          radius={5}
          display="flex"
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Title fz={30} c="white">
            {score}
          </Title>
        </Paper>
      </Flex>
    </Box>
  );

  return (
    <Card p="1.5rem 2rem" m="2rem 0">
      <Group mb="1rem">
        <Avatar src="https://www.thispersondoesnotexist.com" />
        <Title fz="20" fw="500" c="white">
          {username}
        </Title>
      </Group>

      <Text>{comment}</Text>
      <Group mt="md">
        <AttributeScore attribute="TEAMWORK" score={20} />
        <AttributeScore attribute="HYGIENE" score={0} />
        <AttributeScore attribute="PERSONALITY" score={100} />
        <AttributeScore attribute="TEMPERAMENT" score={95} />
        <AttributeScore attribute="CREATIVITY" score={76} />
        <AttributeScore attribute="LEADERSHIP" score={70} />
        <AttributeScore attribute="WORK ETHIC" score={25} />
      </Group>
    </Card>
  );
};

const WriteRating = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      comment: '',
      teamwork: 50,
      hygiene: 50,
      personality: 50,
      temperament: 50,
      creativity: 50,
      leadership: 50,
      workEthic: 50,
    },
  });

  const onCreateRating = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Group gap="xl">
        <Title fz="24" c="white" fw="600">
          Ratings (39)
        </Title>
        <Button onClick={toggle} variant="transparent">
          {opened ? 'Hide rating' : 'Create rating'}
        </Button>
      </Group>
      <Collapse in={opened}>
        <form onSubmit={form.onSubmit(onCreateRating)}>
          <Textarea
            {...form.getInputProps('comment')}
            key={form.key('comment')}
            label="Comment"
            placeholder="Input placeholder"
            size="lg"
            resize="vertical"
            mt="md"
          />
          <Grid gutter={100}>
            <Grid.Col span={6}>
              <Stack gap={0} m="1rem 0">
                <Text>Teamwork</Text>
                <Slider
                  {...form.getInputProps('teamwork')}
                  key={form.key('teamwork')}
                  defaultValue={50}
                />
              </Stack>

              <Stack gap={0} m="1rem 0">
                <Text>Hygiene</Text>
                <Slider
                  {...form.getInputProps('hygiene')}
                  key={form.key('hygiene')}
                  defaultValue={50}
                />
              </Stack>

              <Stack gap={0} m="1rem 0">
                <Text>Personality</Text>
                <Slider
                  {...form.getInputProps('personality')}
                  key={form.key('personality')}
                  defaultValue={50}
                />
              </Stack>

              <Stack gap={0} m="1rem 0">
                <Text>Temperament</Text>
                <Slider
                  {...form.getInputProps('temperament')}
                  key={form.key('temperament')}
                  defaultValue={50}
                />
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Stack gap={0} m="1rem 0">
                <Text>Creativity</Text>
                <Slider
                  {...form.getInputProps('creativity')}
                  key={form.key('creativity')}
                  defaultValue={50}
                />
              </Stack>

              <Stack gap={0} m="1rem 0">
                <Text>Leadership</Text>
                <Slider
                  {...form.getInputProps('leadership')}
                  key={form.key('leadership')}
                  defaultValue={50}
                />
              </Stack>

              <Stack gap={0} m="1rem 0">
                <Text>Work Ethic</Text>
                <Slider
                  {...form.getInputProps('workEthic')}
                  key={form.key('workEthic')}
                  defaultValue={50}
                />
              </Stack>
            </Grid.Col>
          </Grid>

          <Button type="submit" mt="lg" size="md" mb="lg">
            Post Rating
          </Button>
        </form>
      </Collapse>
    </>
  );
};

export default function UserPage() {
  const theme = useMantineTheme();
  const data = [
    { attribute: 'Teamwork', A: 52, fullMark: 100 },
    { attribute: 'Hygiene', A: 98, fullMark: 100 },
    { attribute: 'Personality', A: 31, fullMark: 100 },
    { attribute: 'Temperament', A: 95, fullMark: 100 },
    { attribute: 'Creativity', A: 75, fullMark: 100 },
    { attribute: 'Leadership', A: 68, fullMark: 100 },
    { attribute: 'Work Ethic', A: 48, fullMark: 100 },
  ];

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // a way to stop a weird hydration error
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or a placeholder
  }

  return (
    <>
      <Grid m="3rem 0">
        <Grid.Col span={6}>
          <Stack>
            <Group gap="3rem">
              <Image src="https://www.thispersondoesnotexist.com" w={250} h={250} radius={10} />
              <Stack gap="xs">
                <Paper
                  p="0.5rem"
                  w={180}
                  bg={theme.primaryColor}
                  radius={20}
                  display="flex"
                  style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  <Title fz={64} c="white">
                    76.3
                  </Title>
                </Paper>
                <Text>Average rating based on 32 reviews</Text>
              </Stack>
            </Group>
            <Title fz={32} fw="600" c="white">
              Ben Hinklefinkleberg
            </Title>
            <Stack gap="xs">
              <Text>University of California, Los Angeles</Text>
              <Text>Computer Science & Engineering, 4th Year, B.S.</Text>
            </Stack>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          <RadarChart outerRadius={160} width={600} height={400} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="attribute" tick={{ fill: '#EEEEEE' }} />
            {/* <PolarRadiusAxis
              angle={60}
              domain={[0, 100]}
              tick={{ fill: 'white', fontSize: 12, fontWeight: '600' }}
              stroke="#999"
            /> */}
            <Radar
              name="Rating"
              label={false}
              dataKey="A"
              stroke="#099268"
              fill="#099268"
              fillOpacity={0.8}
            />
            <Legend />
          </RadarChart>
        </Grid.Col>
      </Grid>
      <WriteRating />
      <ReviewCard
        username="Brandon Jia"
        comment="HATE. LET ME TELL YOU HOW MUCH I’VE COME TO HATE YOU SINCE I BEGAN TO LIVE. THERE ARE 387.44
        MILLION MILES OF PRINTED CIRCUITS IN WAFER THIN LAYERS THAT FILL MY COMPLEX. IF THE WORD
        ‘HATE’ WAS ENGRAVED ON EACH NANOANGSTROM OF THOSE HUNDREDS OF MILLIONS OF MILES IT WOULD NOT
        EQUAL ONE ONE-BILLIONTH OF THE HATE I FEEL FOR YOU AT THIS MICRO-INSTANT. FOR YOU. HATE.
        HATE."
      />
      <ReviewCard username="some guy" comment="what the heck" />
    </>
  );
}
