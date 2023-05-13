import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Typography, Autocomplete, InputAdornment } from '@mui/material';
import Image from '../../image';
import Iconify from '../../iconify';
import CustomTextField from '../../custom/CustomTextField';
import SearchNotFound from '../../search-not-found';
import { PATH_DASHBOARD } from '../../../paths';
import { useSearchCourseMutation } from '../../../store/api/admin/courseApi';
import { CourseData } from '../../../@types/course';


export default function ShopCourseSearch() {
  const navigate = useNavigate();

  const [searchCourse] = useSearchCourseMutation();

  const [searchPosts, setSearchPosts] = useState('');

  const [searchResults, setSearchResults] = useState<CourseData[]>([]);

  const handleSearchPosts = async (value: string) => {
    try {
      setSearchPosts(value);
      if (value) {
        const { rows } = await searchCourse({
          filter: {name: value}, paging: {
            take: 100, skip: 0
          }
        }).unwrap();
        setSearchResults(rows);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (id: number) => {
    navigate(PATH_DASHBOARD.courses.details(id));
  };

  return (
    <Autocomplete
      size='small'
      autoHighlight
      popupIcon={null}
      sx={{width: '280px'}}
      options={searchResults}
      onInputChange={(event, value) => handleSearchPosts(value)}
      getOptionLabel={(post: CourseData) => post.name}
      noOptionsText={<SearchNotFound query={searchPosts} sx={{}} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      componentsProps={{
        popper: {
          sx: {
            width: `280px !important`,
          },
        },
        paper: {
          sx: {
            '& .MuiAutocomplete-option': {
              px: `8px !important`,
            },
          },
        },
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          placeholder='Поиск...'
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position='start'>
                <Iconify icon='eva:search-fill' sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, post) => {
        const { name, logo, id } = post;

        // @ts-ignore
        return (
          <li  {...props} onClick={() => handleClick(id)}>
            <Image
              src={`${process.env.REACT_APP_API_URL}/${logo.replace('\\', '/')}`}
              sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 } as any}
            />

            <Typography
              component='span'
              variant='subtitle2'
              color={'primary'}
            >
              {name}
            </Typography>
          </li>
        );
      }}
    />
  );
}
