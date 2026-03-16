'use client';

import { TeaProductDashboardRow } from '@/lib/data';
import { archiveProduct } from '@/server/actions/tea.actions';
import { Link, ListItem, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';

interface Props {
  teaProducts: TeaProductDashboardRow[];
}

export default function TeaProductDateGrid({ teaProducts }: Props) {
  const router = useRouter();
  const columns: GridColDef<TeaProductDashboardRow>[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      renderCell: ({ id, value }) => (
        <Link href={`/tea-notes/${id}`}>{value}</Link>
      )
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150
    },
    {
      field: 'quality',
      headerName: 'Quality',
      width: 150,
      valueFormatter: (value: string) => {
        return value.toUpperCase();
      }
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      valueFormatter: (value: string) => `${value} BYN`
    },
    {
      field: 'impressions',
      headerName: 'Impression',
      sortable: false,
      width: 200,
      renderCell: ({ value }) => {
        const impressions = value as TeaProductDashboardRow['impressions'];
        return (
          // <List sx={{ padding: 0, margin: 0 }}>
          <>
            {impressions.map(([teaware, impression], index) => (
              // <ListItem key={teaware} sx={{ padding: 0, margin: 0 }}>
              //   - {teaware}: {impression ?? '—'}
              // </ListItem>
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="info.main"
                  title={teaware}
                >
                  {impression}
                </Typography>
                {index !== impressions.length - 1 ? ', ' : ''}
              </>
            ))}
          </>
        );
      }
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          label="Edit"
          showInMenu
          onClick={() => router.push(`/tea-notes/${params.id}/edit`)}
        />,
        <GridActionsCellItem
          key="delete"
          label="Delete"
          showInMenu
          onClick={() => archiveProduct(params.id as string)}
        />
      ]
    }
  ];

  return (
    <DataGrid
      rows={teaProducts}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5
          }
        }
      }}
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
    />
  );
}
