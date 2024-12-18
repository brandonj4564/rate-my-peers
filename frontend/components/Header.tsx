'use client';

import { useRouter } from 'next/navigation';
import { Button, Group, Paper, useMantineColorScheme } from '@mantine/core';
import SmallLogo from './SmallLogo';
import { useAuth } from './authContext';

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
    const { setColorScheme } = useMantineColorScheme();


  const handleLogout = async () => {
    try {
      const response = await fetch('https://jesusruvalcaba.pythonanywhere.com/logout', {
        method: 'GET',
        credentials: 'include', // Include session cookies 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }

      const data = await response.json();
      console.log('Logout successful:', data.message);

      // Call the logout function from AuthProvider and 
      // redirect them to the home page
      logout();
      router.push('/');
    } catch (err: any) {
      console.error('Logout error:', err.message);
    }
  };

  const handleProfileClick = () => {
    if(isAuthenticated){
      const token = localStorage.getItem('userToken');
      if(token){
        router.push(`/user/${token}`)
      }
    }
  }

  return (
    <Paper m="1.5rem 0">
      <Group justify="space-between">
        <SmallLogo />
        <Group gap="lg">
          {isAuthenticated ? (
            <>
              <Button variant="transparent" c="#ECECEC" size="md" onClick={handleProfileClick}>
                Profile
              </Button>
              <Button bg="#ECECEC" c="#242424" size="md" onClick={handleLogout}>
                Log out
              </Button>
              <Button onClick={() => setColorScheme('dark')}>Dark Mode</Button>
            </>
          ) : (
            <>
              <Button variant="transparent" c="#ECECEC" size="md" onClick={() => router.push('/login')}>
                Log in
              </Button>
              <Button bg="#ECECEC" c="#242424" size="md" onClick={() => router.push('/register')}>
                Sign up
              </Button>
              <Button onClick={() => setColorScheme('dark')}>Dark Mode</Button>
            </>
          )}
        </Group>
      </Group>
    </Paper>
  );
}
