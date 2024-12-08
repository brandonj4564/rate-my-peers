'use client';

import { useRef } from 'react';
import { IconChartBarPopular, IconTargetArrow, IconUser } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import {
  AspectRatio,
  BackgroundImage,
  Flex,
  Grid,
  Group,
  Image,
  Overlay,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from '@mantine/core';
import HomeSearch from '@/components/HomeSearch';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  const theme = useMantineTheme();
  const autoplay = useRef(Autoplay({ delay: 4000 }));

  const carouselMessages = [
    'This website ruined my life',
    "I ruined this one person's life",
    'Why am I here',
    'This is nowhere near enough to make up for what happened to me',
    'Cathartic, really',
    'Wait, are you guys recording me',
    'Now we can all know who has been naughty or nice',
    'Now I can get away with hiring less people',
    'I had no idea people thought so low of me',
  ];

  const carouselNames = [
    'Anonymous',
    'Charles Watkins',
    'Eric Pohlman',
    'Tyler Quon',
    'Emily Webster',
    'Brigham Young',
    'Joseph Myer',
    'Matthew Clark',
    'Olivia Turner',
  ];

  const CarouselSlide = ({ name, quote, id }: { name: string; quote: string; id: number }) => {
    return (
      <Carousel.Slide m="0 1.5rem">
        <AspectRatio ratio={12 / 16}>
          {/* I don't know how to make each person's picture unique lol */}
          <BackgroundImage
            src={`https://thispersondoesnotexist.com?id=${id}`}
            style={{ filter: 'grayscale(100%)' }}
            radius={10}
          >
            <Flex h="95%" justify="center" align="flex-end">
              <Paper radius={5} w="80%" bg="white" p="0.5rem 1rem">
                <Text c="black" fz={20} fw={600}>
                  {name}
                </Text>
                <Text c="black">{quote}</Text>
              </Paper>
            </Flex>
          </BackgroundImage>
          <Overlay color="#000" backgroundOpacity={0.2} />
        </AspectRatio>
      </Carousel.Slide>
    );
  };

  return (
    <>
      {/* <Welcome />
      <ColorSchemeToggle /> */}
      <HomeSearch />
      <Grid gutter={48} m="2rem 0">
        <Grid.Col span={4}>
          <Group gap="lg" justify="center">
            <ThemeIcon size={60} radius={100}>
              <IconChartBarPopular size={40} color="#ECECEC" />
            </ThemeIcon>
            <Stack gap="xs">
              <Title fz={28} fw="700" m="0" ta="center" c="#ECECEC">
                Check your stats
              </Title>
              <Text ta="center">Discover how powerful your bases are compared to your peers</Text>
            </Stack>
          </Group>
        </Grid.Col>
        <Grid.Col span={4}>
          <Group gap="lg" justify="center">
            <ThemeIcon size={60} radius={100}>
              <IconUser size={40} color="#ECECEC" />
            </ThemeIcon>
            <Stack gap="xs">
              <Title fz={28} fw="700" m="0" ta="center" c="#ECECEC">
                Rate and be rated bravely
              </Title>
              <Text ta="center">Connect your account to your ratings to show your identity</Text>
            </Stack>
          </Group>
        </Grid.Col>
        <Grid.Col span={4}>
          <Group gap="lg" justify="center">
            <ThemeIcon size={60} radius={100}>
              <IconTargetArrow size={40} color="#ECECEC" />
            </ThemeIcon>
            <Stack gap="xs">
              <Title fz={28} fw="700" m="0" ta="center" c="#ECECEC">
                Destroy your enemies
              </Title>
              <Text ta="center">Finally give those who wronged you what they deserve</Text>
            </Stack>
          </Group>
        </Grid.Col>
      </Grid>

      <Carousel
        slideSize="25%"
        // dragFree
        loop
        withControls={false}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        m="10rem 0"
      >
        {carouselMessages.map((item, index) => (
          <CarouselSlide name={carouselNames[index]} quote={item} key={index} id={index} />
        ))}
      </Carousel>
    </>
  );
}
