import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import {
  IconSquareRoundedPlusFilled,
  IconSquareRoundedXFilled,
} from '@tabler/icons-react';
import { Controller, useFieldArray } from 'react-hook-form';
import { useGetEquipmentTitlesQuery } from 'store/api/equipmentTitle/equipmentTitleSlice';
import { inputStyles } from 'ui-component/customStyles';

const defaultEquipment = {
  equipmentTitle: null,
  quantity: 1,
  totalPrice: '',
  remarks: '',
};

const SelectExternalEquipment = ({ control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'externalEquipmentUses',
  });

  const handleAppend = () => {
    append(defaultEquipment);
  };
  const handleRemove = (index) => remove(index);
  return (
    <Grid container spacing={2}>
      {fields?.map((el, index) => (
        <EquipmentField
          key={el.id}
          field={el}
          index={index}
          handleRemove={handleRemove}
          control={control}
          register={register}
        />
      ))}
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Tooltip title="Add Row">
          <IconButton color="primary" onClick={handleAppend}>
            <IconSquareRoundedPlusFilled size={25} />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default SelectExternalEquipment;

const EquipmentField = ({ field, index, handleRemove, control, register }) => {
  const [equipment, setEquipment] = useState(field?.equipmentTitle || null);
  // library
  const { data: equipmentTitlesData } = useGetEquipmentTitlesQuery(
    { limit: 200, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allEquipmentTitles = equipmentTitlesData?.equipmentTitles || [];
  // end library

  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={3.5}>
          <Controller
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                value={equipment}
                size="small"
                options={allEquipmentTitles}
                fullWidth
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(item, value) => item._id === value._id}
                renderInput={(params) => (
                  <TextField {...params} label="Choose a Equipment" required />
                )}
                onChange={(e, data) => {
                  onChange(data);
                  setEquipment(data);
                  return data;
                }}
              />
            )}
            name={`externalEquipmentUses[${index}].equipmentTitle`}
            control={control}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={6} lg={2}>
          <TextField
            fullWidth
            required
            label="Qty"
            size="small"
            type="number"
            inputProps={{
              step: '0.01',
            }}
            sx={inputStyles.input}
            {...register(`externalEquipmentUses[${index}].quantity`, {
              required: true,
              valueAsNumber: true,
            })}
          />
        </Grid>
        <Grid item xs={6} lg={2.5}>
          <TextField
            fullWidth
            required
            label="Total Price"
            size="small"
            type="number"
            inputProps={{
              step: '0.01',
            }}
            sx={inputStyles.input}
            {...register(`externalEquipmentUses[${index}].totalPrice`, {
              required: true,
              valueAsNumber: true,
            })}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              label="Remarks"
              size="small"
              sx={{ mr: 1 }}
              {...register(`externalEquipmentUses[${index}].remarks`)}
            />
            <Tooltip title="Remove Row">
              <IconButton
                size="small"
                color="error"
                onClick={() => handleRemove(index)}
              >
                <IconSquareRoundedXFilled size={25} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
