import { BackgroundImage, Flex, Image, Paper, Select, Space, Text } from '@mantine/core';
import LargeLogo from './LargeLogo';

export default function HomeSearch() {
  return (
    <>
      <Paper>
        <Paper h={500} display="flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <BackgroundImage src="/HeroBanner.png" w="100vw" h={400} style={{ position: 'absolute' }}>
            <Flex align="center" m="2rem 0" direction="column">
              <LargeLogo />
              <Space h="lg" />
              <Text fz="30" c="white">
                Enter your <b style={{ letterSpacing: 1.5, fontWeight: 600 }}>school</b> to view
                your friends
              </Text>
              <Select placeholder="School name" c="white" />
            </Flex>
          </BackgroundImage>
        </Paper>
      </Paper>
    </>
  );
}
