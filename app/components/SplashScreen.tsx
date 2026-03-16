import { Box } from '@mui/material';

export default function SplashScreen() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1>tastenotes.</h1>
    </Box>
  );
}
