'use client';

import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import { Box, IconButton, Rating, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

const getRandomIndex = (maxElements?: number) =>
  Math.floor(Math.random() * (maxElements ?? 3));

export default function TestPage() {
  const items = [...new Array(12)];
  return (
    <Grid container spacing={4}>
      {items.map((_, index) => {
        return (
          <Grid
            key={index}
            xs={3}
            sx={{
              aspectRatio: 1 / 1
            }}
          >
            <TeaCard />
          </Grid>
        );
      })}
    </Grid>
  );
}

const colors = ['#FEC971', '#FE9B72', '#E4EF8F'];

const teaNames = [
  'Инь Цзюнь Мэй (Серебряные Брови)',
  'Чжун Го Хун (Красный Китай)',
  'Мин Цянь Гу Шу Ча'
];

const teqRegions = ['Китай', 'Тайвань', 'Грузия'];

const teaTypes = ['Красный', 'Шу Пуэр', 'Гуандунский улун'];
const dates = ['May 21, 2024', 'May 1, 2024', 'Dec 23, 2023'];

function TeaCard() {
  const isFavorite = !!Math.floor(Math.random() * 2);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        borderRadius: 5,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: colors[getRandomIndex()]
      }}
    >
      <Box>
        {isFavorite && (
          <IconButton
            sx={{
              float: 'right',
              background: 'black',
              // border: 1,
              // borderColor: 'transparent',
              '&:hover': {
                opacity: 0.8,
                // border: 1,
                background: 'black'
              }
            }}
          >
            <StarIcon
              sx={{
                fontSize: '20px',
                color: '#FFCD02'
              }}
            />
          </IconButton>
        )}

        <Tooltip title={teaNames[getRandomIndex()]} placement="top">
          <Typography variant="h6">{teaNames[getRandomIndex()]}</Typography>
        </Tooltip>

        <Box>
          <Typography component="span" fontSize={16}>
            {teqRegions[getRandomIndex()]}
          </Typography>
          {', '}
          <Typography component="span" fontSize={16}>
            {teaTypes[getRandomIndex()]}
          </Typography>
        </Box>
        <Rating
          size="small"
          value={getRandomIndex(4) + 1}
          sx={{ color: 'black' }}
          readOnly
        />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontSize={16}>{dates[getRandomIndex()]}</Typography>
        <IconButton
          sx={{
            background: 'black',
            '&:hover': {
              opacity: 0.8,
              background: 'black'
            }
          }}
        >
          <EditIcon
            fontSize="small"
            sx={{
              m: 0.2,
              color: 'white'
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
