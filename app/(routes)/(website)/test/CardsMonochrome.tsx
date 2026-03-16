'use client';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';

interface Aroma {
  name: string;
}

const aromas: Aroma[] = [
  {
    name: 'Фруктовый'
  },
  {
    name: 'Цветочный'
  },
  {
    name: 'Почвенный'
  },
  {
    name: 'Минеральный'
  },
  {
    name: 'Овощной'
  },
  {
    name: 'Травянистый'
  },
  {
    name: 'Ореховый'
  },
  {
    name: 'Кофейный'
  },
  {
    name: 'Пряный'
  },
  {
    name: 'Древесный'
  },
  {
    name: 'Ягодный'
  }
];

export default function TestPage() {
  const [selectedAromas, setSelectedAromas] = useState(new Set<string>());

  return (
    <Grid container component="ul" gap={2}>
      {aromas.map(({ name }) => {
        const isSelected = selectedAromas.has(name);

        return (
          <Grid
            key={name}
            sm={2}
            component="li"
            sx={{
              background: isSelected
                ? 'rgb(156, 171, 194, 0.11)'
                : 'rgb(156, 171, 194, 0.35)',
              border: '2px solid',
              borderColor: isSelected
                ? 'rgb(156, 171, 194, 0.9)'
                : 'rgb(156, 171, 194, 0.35)',
              aspectRatio: 1,
              borderRadius: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => {
              const newSelectedAromas = new Set(selectedAromas);
              if (newSelectedAromas.has(name)) {
                newSelectedAromas.delete(name);
              } else {
                newSelectedAromas.add(name);
              }

              setSelectedAromas(newSelectedAromas);
            }}
          >
            {name}
          </Grid>
        );
      })}
    </Grid>
  );
}
