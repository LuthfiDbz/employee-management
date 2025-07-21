// Dashboard.tsx
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, InputAdornment, ListItemText, Menu, MenuItem, Stack, TablePagination, TextField, Typography } from '@mui/material';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const EmployeeList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sortBy, setSortBy] = React.useState('name');
  const open = Boolean(anchorEl);
  const options = [
  { label: 'Name', value: 'name' },
  { label: 'Date Created', value: 'dateCreated' },
  { label: 'Status', value: 'status' },
];

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: any) => {
    // onChange(option);
    setSortBy(option)
    handleClose();
  };


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Typography variant="h5" noWrap className='text-black'>
        Employee
      </Typography>
      <br />
      <TextField
        // value={value}
        // onChange={onChange}
        placeholder={"Search..."}
        size="small"
        variant="outlined"
        sx={{ width: '100%', maxWidth: 300, background: "white", marginRight: '1rem' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <>
        <Button
          variant="outlined"
          size="medium"
          onClick={handleClick}
          startIcon={<SortIcon fontSize="small" />}
          endIcon={<ArrowDropDownIcon fontSize="small" />}
          sx={{ textTransform: 'none' , background: "white", borderColor: "#B4BDC6", paddingBlock: '0.45rem', color:"#475766"}}
        >
          Sort by
        </Button>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              selected={sortBy === option.value}
              onClick={() => handleSelect(option.value)}
            >
              <ListItemText>{option.label}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </>
      <Button
        variant="contained"
        size="medium"
        // onClick={handleClick}
        startIcon={<AddIcon fontSize="small" />}
        sx={{ textTransform: 'none', paddingBlock: '0.45rem', marginLeft: '1rem'}}
      >
        Add New Employee
      </Button>
      
      <TableContainer component={Paper} className='mt-5 !bg-white'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className='bg-primary-200'>
            <TableRow>
              <TableCell className='!text-black'>Dessert (100g serving)</TableCell>
              <TableCell align="right" className='!text-black'>Calories</TableCell>
              <TableCell align="right" className='!text-black'>Fat&nbsp;(g)</TableCell>
              <TableCell align="right" className='!text-black'>Carbs&nbsp;(g)</TableCell>
              <TableCell align="right" className='!text-black'>Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default EmployeeList;
