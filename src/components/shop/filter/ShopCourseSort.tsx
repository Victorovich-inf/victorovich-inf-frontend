import { MenuItem, TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';

interface ShopCourseSortProps {
  sortBy: string;
  sortOptions: Array<{ value: string, label: string }>;
  onSort: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export default function ShopCourseSort({ sortBy, sortOptions, onSort }: ShopCourseSortProps) {
  return (
    <TextField
      select
      size="small"
      value={sortBy}
      onChange={onSort}
      SelectProps={{
        sx: { typography: 'body2' },
      }}
    >
      {sortOptions.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          sx={{
            mx: 1,
            borderRadius: 0.75,
            typography: 'body2',
            textTransform: 'capitalize',
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
