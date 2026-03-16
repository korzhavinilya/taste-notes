import AddTeaNoteForm from '@/components/tea-note-form/add-tea-note-form';
import { createTeaProduct } from '@/server/actions';
import { Typography } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Tea Note | Taste Notes'
};

export default async function AddTeaNotePage() {
  // const regions = await prismaClient.region.findMany();
  // const colors = await prismaClient.teaColor.findMany();

  return (
    <>
      <Typography variant="h1" mt={2} mb={3}>
        Add tea notes
      </Typography>

      <AddTeaNoteForm
        // regions={regions}
        // colors={colors}
        defaultValues={{
          tea_note: {
            infusion_tea_notes: [
              {
                brewing_method: {
                  teaware: 'gaiwan',
                  tea_weight: 2,
                  water_volume: 2,
                  water_temperature: 2,
                  brewing_time: 2,
                  is_steeping: false
                }
              }
            ]
          }
        }}
        submitButtonLabel="add_note"
        submit={createTeaProduct}
      />
    </>
  );
}
