import { BackgroundImage, Flex, Image, Paper, Select, Space, Text } from '@mantine/core';
import LargeLogo from './LargeLogo';
import { useState, useEffect } from 'react';

export default function HomeSearch() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/schools')
      .then((response) => response.json())
      .then((data) => {
        setSchools(data);
      })
      .catch((error) => console.error('Error fetching schools:', error));
  }, []);

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
              <Select 
                placeholder="School name" 
                color="white"
                searchable
                nothingFoundMessage="No users at this school" 
                limit={5}
                data={schools}
                clearable
              />
            </Flex>
          </BackgroundImage>
        </Paper>
      </Paper>
    </>
  );
}
