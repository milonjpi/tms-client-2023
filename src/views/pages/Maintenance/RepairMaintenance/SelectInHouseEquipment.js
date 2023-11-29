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
import { totalSum } from 'views/utilities/NeedyFunction';
import { inputStyles } from 'ui-component/customStyles';
import { useEffect } from 'react';

const defaultEquipment = {
  equipmentTitle: null,
  quantity: 1,
  remarks: '',
};

const SelectInHouseEquipment = ({ control, register, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'equipmentUses',
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
          setValue={setValue}
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

export default SelectInHouseEquipment;

const EquipmentField = ({
  field,
  index,
  handleRemove,
  control,
  register,
  setValue,
}) => {
  const [equipment, setEquipment] = useState(field?.equipmentTitle || null);
  // library
  const { data: equipmentTitlesData } = useGetEquipmentTitlesQuery(
    { limit: 200, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allEquipmentTitles = equipmentTitlesData?.equipmentTitles || [];
  // end library

  const totalEquipmentPrice = totalSum(
    equipment?.equipments || [],
    'totalPrice'
  );
  const totalEquipment = totalSum(equipment?.equipments || [], 'quantity');
  const usedEquipment = totalSum(equipment?.equipmentUses || [], 'quantity');
  const availableEquipment = totalEquipment - usedEquipment;

  const unitPrice = Number.isInteger(totalEquipmentPrice / totalEquipment)
    ? totalEquipmentPrice / totalEquipment
    : Number((totalEquipmentPrice / totalEquipment).toFixed(2));

  useEffect(() => {
    setValue(`equipmentUses.${index}.unitPrice`, unitPrice);
  }, [setValue, index, unitPrice]);
  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={8} lg={4}>
          <Controller
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                value={equipment}
                size="small"
                options={allEquipmentTitles}
                fullWidth
                getOptionLabel={(option) => option.label}
                getOptionDisabled={(option) =>
                  totalSum(option?.equipments || [], 'quantity') -
                    totalSum(option?.equipmentUses || [], 'quantity') <=
                  0
                    ? true
                    : false
                }
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
            name={`equipmentUses[${index}].equipmentTitle`}
            control={control}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={4} lg={2}>
          <TextField
            fullWidth
            required
            label={`Qty${availableEquipment ? ` (${availableEquipment})` : ''}`}
            size="small"
            type="number"
            inputProps={{
              step: '0.01',
            }}
            sx={inputStyles.input}
            {...register(`equipmentUses[${index}].quantity`, {
              required: true,
              valueAsNumber: true,
            })}
          />
        </Grid>
        <Grid item xs={0} sx={{ display: 'none' }}>
          {unitPrice ? (
            <TextField
              fullWidth
              value={unitPrice || 0}
              size="small"
              type="number"
              inputProps={{
                step: '0.01',
              }}
              sx={inputStyles.input}
              {...register(`equipmentUses[${index}].unitPrice`, {
                valueAsNumber: true,
              })}
            />
          ) : null}
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              label="Remarks"
              size="small"
              sx={{ mr: 1 }}
              {...register(`equipmentUses[${index}].remarks`)}
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
