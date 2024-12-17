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
  LoadingOverlay,
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
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { useParams } from 'next/navigation'

type RatingType = {
  teamwork: number,
  hygiene: number,
  personality: number,
  temperament: number,
  dependability: number,
  creativity: number,
  leadership: number,
  workEthic: number,
}

const ReviewCard = ({ username, comment, ratings }: { username: string; comment: string, ratings: RatingType }) => {
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
        <AttributeScore attribute="TEAMWORK" score={ratings.teamwork} />
        <AttributeScore attribute="HYGIENE" score={ratings.hygiene} />
        <AttributeScore attribute="PERSONALITY" score={ratings.personality} />
        <AttributeScore attribute="TEMPERAMENT" score={ratings.temperament} />
        <AttributeScore attribute="DEPENDABILITY" score={ratings.dependability} />
        <AttributeScore attribute="CREATIVITY" score={ratings.creativity} />
        <AttributeScore attribute="LEADERSHIP" score={ratings.leadership} />
        <AttributeScore attribute="WORK ETHIC" score={ratings.workEthic} />
      </Group>
    </Card>
  );
};

const WriteRating = ({id, numRatings, refreshData, isAuth}: {id: string, numRatings: number, refreshData: () => void, isAuth: boolean}) => {
  const [opened, { toggle }] = useDisclosure(false);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      comment: '',
      teamwork: 2,
      hygiene: 2,
      personality: 2,
      temperament: 2,
      dependability: 2,
      creativity: 2,
      leadership: 2,
      workEthic: 2,
    },
    validate: {
      comment: (val) => val.length > 0 ? null : 'Comment cannot be empty'
    }
  });

  const marks = [
    { value: 0 },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ];

  const onCreateRating = async (values: any) => {
    try {
      // Extract form data
      const { comment, creativity, hygiene, leadership, personality, teamwork, temperament, dependability, workEthic } = values;
      const raterId = localStorage.getItem("userToken")

  
      const response = await fetch('http://127.0.0.1:5000/post-rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          r_ratedUserID: id,
          r_raterUserID: raterId,
          r_teamWork: teamwork,
          r_hygeine: hygiene,
          r_personality: personality,
          r_temperament: temperament,
          r_dependability: dependability,
          r_creativity: creativity,
          r_leadership: leadership,
          r_workEthic: workEthic,
          r_comment: comment
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toggle()
        form.reset()
        refreshData()
      } else {
        console.error('Error:', result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <Group gap="xl">
        <Title fz="24" c="white" fw="600">
          Ratings ({numRatings})
        </Title>
        {isAuth && <Button onClick={toggle} variant="transparent">
          {opened ? 'Hide rating' : 'Create rating'}
        </Button>}
        
      </Group>
      {isAuth && 
      <Collapse in={opened}>
        <form onSubmit={form.onSubmit(onCreateRating)}>
          <Textarea
            {...form.getInputProps('comment')}
            key={form.key('comment')}
            label="Comment"
            placeholder="Write comment"
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
                  defaultValue={2}
                  max={5}
                  marks={marks}
                />
              </Stack>

              <Stack gap={0} m="1rem 0">
                <Text>Hygiene</Text>
                <Slider
                  {...form.getInputProps('hygiene')}
                  key={form.key('hygiene')}
                  defaultValue={2}
                  max={5}
                  marks={marks}
                />
              </Stack>

              <Stack gap={0} m="1rem 0">
                <Text>Personality</Text>
                <Slider
                  {...form.getInputProps('personality')}
                  key={form.key('personality')}
                  defaultValue={2}
                  max={5}
                  marks={marks}
                />
              </Stack>

              <Stack gap={0} m="1rem 0">
                <Text>Temperament</Text>
                <Slider
                  {...form.getInputProps('temperament')}
                  key={form.key('temperament')}
                  defaultValue={2}
                  max={5}
                  marks={marks}
                />
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
            <Stack gap={0} m="1rem 0">
                <Text>Dependability</Text>
                <Slider
                  {...form.getInputProps('dependability')}
                  key={form.key('dependability')}
                  defaultValue={2}
                  max={5}
                  marks={marks}
                />
              </Stack>

              <Stack gap={0} m="1rem 0">
                <Text>Creativity</Text>
                <Slider
                  {...form.getInputProps('creativity')}
                  key={form.key('creativity')}
                  defaultValue={2}
                  max={5}
                  marks={marks}
                />
              </Stack>

              <Stack gap={0} m="1rem 0">
                <Text>Leadership</Text>
                <Slider
                  {...form.getInputProps('leadership')}
                  key={form.key('leadership')}
                  defaultValue={2}
                  max={5}
                  marks={marks}
                />
              </Stack>

              <Stack gap={0} m="1rem 0">
                <Text>Work Ethic</Text>
                <Slider
                  {...form.getInputProps('workEthic')}
                  key={form.key('workEthic')}
                  defaultValue={2}
                  max={5}
                  marks={marks}
                />
              </Stack>
            </Grid.Col>
          </Grid>

          <Button type="submit" mt="lg" size="md" mb="lg">
            Post Rating
          </Button>
        </form>
      </Collapse>
      }
    </>
  );
};

export default function UserPage() {
  const params = useParams()
  const userId = params?.id || null

  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const theme = useMantineTheme();

  const testData = [
    { attribute: 'Teamwork', A: 52, fullMark: 100 },
    { attribute: 'Hygiene', A: 98, fullMark: 100 },
    { attribute: 'Personality', A: 31, fullMark: 100 },
    { attribute: 'Temperament', A: 95, fullMark: 100 },
    { attribute: 'Dependability', A: 95, fullMark: 100 },
    { attribute: 'Creativity', A: 75, fullMark: 100 },
    { attribute: 'Leadership', A: 68, fullMark: 100 },
    { attribute: 'Work Ethic', A: 48, fullMark: 100 },
  ];

  const [userData, setUserData] = useState([
    { attribute: 'Teamwork', A: 0, fullMark: 5 },
    { attribute: 'Hygiene', A: 0, fullMark: 5 },
    { attribute: 'Personality', A: 0, fullMark: 5 },
    { attribute: 'Temperament', A: 0, fullMark: 5 },
    { attribute: 'Dependability', A: 0, fullMark: 5 },
    { attribute: 'Creativity', A: 0, fullMark: 5 },
    { attribute: 'Leadership', A: 0, fullMark: 5 },
    { attribute: 'Work Ethic', A: 0, fullMark: 5 },
  ])

  const [profileData, setProfileData] = useState({
    name: '',
    school: '',
    yearAttend: '',
    major: '',
    degree: '',
  })

  const [reviews, setReviews] = useState<any[]>([])
  const [averageRating, setAverageRating] = useState<number>(0.0)

  const [isClient, setIsClient] = useState(false);

  const getUserRatings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('http://127.0.0.1:5000/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setIsLoading(false)
        throw new Error(errorData.message || 'Fetch rating data');
      }
  
      const data = (await response.json()).data;
      console.log(data)

      const profilePortion = data.profile_info
      setProfileData({
        name: profilePortion.u_name,
        school: profilePortion.u_skoolName,
        yearAttend: profilePortion.u_yearAttend,
        major: profilePortion.u_major,
        degree: profilePortion.u_degree
      })

      const userStats = data.user_stats
      setUserData([
        { attribute: 'Teamwork', A: userStats.team_work, fullMark: 5 },
        { attribute: 'Hygiene', A: userStats.hygiene, fullMark: 5 },
        { attribute: 'Personality', A: userStats.personality, fullMark: 5 },
        { attribute: 'Temperament', A: userStats.temperament, fullMark: 5 },
        { attribute: 'Dependability', A: userStats.dependability, fullMark: 5 },
        { attribute: 'Creativity', A: userStats.creativity, fullMark: 5 },
        { attribute: 'Leadership', A: userStats.leadership, fullMark: 5 },
        { attribute: 'Work Ethic', A: userStats.work_ethic, fullMark: 5 },
      ])

      setReviews(data.user_posts)

      setAverageRating(
        (userStats.team_work + userStats.hygiene + userStats.personality + userStats.temperament + userStats.dependability + userStats.creativity + userStats.leadership + userStats.work_ethic) / 8
      )

      setIsLoading(false)
    } catch(error){
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // a way to stop a weird hydration error
    setIsClient(true);
    console.log(userId);

    if(localStorage.getItem("isAuthenticated")  === 'true'){
      setIsAuthenticated(true)
    }

    getUserRatings()
    console.log(userData)
  }, []);

  if (!isClient) {
    return null; // Or a placeholder
  }

  return (
    <>
    {/* <ColorSchemeToggle/> */}
    <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
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
                    {Math.round(averageRating * 100) / 100}
                  </Title>
                </Paper>
                <Text>Average rating based on {reviews.length} review(s)</Text>
              </Stack>
            </Group>
            <Title fz={32} fw="600" c="white">
              {profileData.name}
            </Title>
            <Stack gap="xs">
              <Text>{profileData.school}</Text>
              <Text>{profileData.major}, {profileData.yearAttend}, {profileData.degree}</Text>
            </Stack>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          {!isLoading && <RadarChart outerRadius={160} width={600} height={400} data={userData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="attribute" tick={{ fill: '#EEEEEE' }} />
            <PolarRadiusAxis
              angle={60}
              domain={[0, 5]}
              tick={{ fill: 'white', fontSize: 12, fontWeight: '600'}}
              ticks={[1, 2, 3, 4, 5]}
              stroke="#999"
            />
            <Radar
              name="Rating"
              label={false}
              dataKey="A"
              stroke="#099268"
              fill="#099268"
              fillOpacity={0.8}
              
            />
            <Legend />
          </RadarChart>}
        </Grid.Col>
      </Grid>
      <WriteRating id={userId} numRatings={reviews.length} refreshData={getUserRatings} isAuth={isAuthenticated}/>
      {reviews ? reviews.map((item, index) => <ReviewCard key={index} username='Anonymous' comment={item.comment} ratings={
        {
          ...item,
          teamwork: item.team_work,
          workEthic: item.work_ethic
        }
      }/>) : undefined}
    </>
  );
}
