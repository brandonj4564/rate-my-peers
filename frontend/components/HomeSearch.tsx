import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BackgroundImage, Button, Flex, Image, Paper, Select, Space, Text } from '@mantine/core';
import LargeLogo from './LargeLogo';

export default function HomeSearch() {
  const [schools, setSchools] = useState<string[]>([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const router = useRouter();

  useEffect(() => {
    // uncomment this later

    // fetch('http://127.0.0.1:5000/schools')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setSchools(data);
    //   })
    //   .catch((error) => console.error('Error fetching schools:', error));

    setSchools([
      'UC Merced',
      'UC Berkeley',
      'Stanford University',
      'MIT',
      'Harvard University',
      '',
    ]);
  }, []);

  const handleSelectPeer = () => {
    // TODO
    router.push('/user/1');
  };

  return (
    <>
      <Paper>
        <Paper h={500} display="flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <BackgroundImage src="/HeroBanner.png" w="100vw" h={400} style={{ position: 'absolute' }}>
            <Flex align="center" m="2rem 0" direction="column">
              <LargeLogo />
              <Space h="lg" />
              {selectedSchool.length === 0 && (
                <>
                  <Text fz="30" c="white">
                    Enter your <b style={{ letterSpacing: 1.5, fontWeight: 600 }}>school</b> to view
                    your friends
                  </Text>

                  <Select
                    placeholder="School name"
                    color="white"
                    size="lg"
                    searchable
                    nothingFoundMessage="No users at this school"
                    limit={5}
                    data={schools}
                    clearable
                    mt="3rem"
                    value={selectedSchool}
                    onChange={(val) => setSelectedSchool(val || '')}
                    w={600}
                  />
                </>
              )}

              {selectedSchool.length > 0 && (
                <>
                  <Text fz="30" c="white">
                    Find a peer at{' '}
                    <b style={{ letterSpacing: 1.5, fontWeight: 600 }}>{selectedSchool}</b>
                  </Text>

                  <Select
                    placeholder="Peer name"
                    color="white"
                    size="lg"
                    searchable
                    nothingFoundMessage="User not found"
                    limit={5}
                    data={['me', 'you']} // change this lol
                    clearable
                    mt="3rem"
                    onChange={handleSelectPeer}
                    w={600}
                  />
                  <Text
                    c="white"
                    fz="16"
                    fw="600"
                    style={{ cursor: 'pointer' }}
                    mt="md"
                    onClick={() => setSelectedSchool('')}
                  >
                    Select another school
                  </Text>
                </>
              )}
            </Flex>
          </BackgroundImage>
        </Paper>
      </Paper>
    </>
  );
}
