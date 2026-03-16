'use client';

import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import {
  Box,
  Button,
  IconButton,
  Rating,
  Tooltip,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from 'react';

export default function TestPage() {
  const items = [...new Array(4)];

  return (
    <Grid container spacing={4}>
      {items.map((_, index) => {
        return (
          <Grid key={index} xs={3}>
            <TeaCard index={index % 3} />
          </Grid>
        );
      })}
    </Grid>
  );
}

const colors = ['#FFE1CC', '#D5F6ED', '#E2DBFA'];
const teaNames = [
  'Инь Цзюнь Мэй (Серебряные Брови)',
  'Чжун Го Хун (Красный Китай)',
  'Мин Цянь Гу Шу Ча'
];
const teqRegions = ['Китай', 'Тайвань', 'Грузия'];
const teaTypes = ['Красный', 'Шу Пуэр', 'Гуандунский улун'];
const dates = ['May 21, 2024', 'May 1, 2024', 'Dec 23, 2023'];
const aromas = ['Фруктовый', 'Ягодный', 'Древесный'];
const price = ['25 BYN', '56 BYN', '78 BYN'];

function TeaCard({ index }: { index: number }) {
  return (
    <Box
      sx={{
        border: '1px solid #D0D0D0',
        borderRadius: '20px',
        width: '100%',
        height: '100%',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Box
        sx={{
          borderRadius: '20px',
          background: colors[index],
          width: '100%',
          padding: '10px',
          flex: 1
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            fontSize="14px"
            component="span"
            sx={{
              background: '#fff',
              borderRadius: '20px',
              padding: '5px 15px',
              fontWeight: '600'
            }}
          >
            {dates[index]}
          </Typography>

          <IconButton
            sx={{
              color: '#000',
              background: '#fff',
              padding: '5px',
              '&:hover': {
                background: '#fff'
              }
            }}
          >
            {index % 2 === 0 ? (
              <BookmarkBorderIcon
                sx={{
                  height: '20px',
                  width: '20px'
                }}
              />
            ) : (
              <BookmarkIcon
                sx={{
                  height: '20px',
                  width: '20px'
                }}
              />
            )}
          </IconButton>
        </Box>

        <Typography fontSize="14px" fontWeight="600">
          {teaTypes[index]}
        </Typography>
        <Typography fontWeight="bold">{teaNames[index]}</Typography>

        <Box mt={5} display="flex" flexWrap="wrap" gap="5px">
          {aromas.map((aroma) => {
            return (
              <Typography
                key={aroma}
                fontSize="12px"
                component="span"
                sx={{
                  border: '1px solid #DAC2AE',
                  borderRadius: '20px',
                  color: '#6D6256',
                  fontWeight: '600',
                  padding: '5px'
                }}
              >
                {aroma}
              </Typography>
            );
          })}
        </Box>
      </Box>

      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="5px"
      >
        <Box>
          <Typography fontSize="16px" fontWeight="600">
            {price[index]}
          </Typography>
          <Typography
            fontSize="14px"
            sx={{
              color: '#939497'
            }}
          >
            {teqRegions[index]}
          </Typography>
        </Box>

        <Button
          sx={{
            color: '#fff',
            background: '#000',
            padding: '5px 15px',
            borderRadius: '20px',
            textTransform: 'none',
            '&:hover': {
              background: '#000'
            }
          }}
        >
          Details
        </Button>
      </Box>
    </Box>
  );
}
