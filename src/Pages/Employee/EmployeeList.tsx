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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Chip, CircularProgress, Divider, InputAdornment, ListItemText, Menu, MenuItem, Stack, TablePagination, TextField, Typography } from '@mui/material';
import employeeApi from '../../Api/employeeApi';
import AlertSnackbar from '../../Component/Alert/AlertSnackbar';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { BodyModifyEmployee, FormEmployee } from '../../Interface/Pages/employeeInterface';
import ModifyEmployee from '../../Component/Modal/ModifyEmployee';

type Column = {
  name: string;
  key: string;
  icon?: any;
  align?: 'left' | 'right' | 'center';
  render?: (value: any, record: any, index: number) => React.ReactNode;
}




const initialFormEmployee: FormEmployee = {
  ssn: "",
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  phone: "",
  title: "",
  department: ""
}


const EmployeeList = () => {
  const [openModifyEmployee, setOpenModifyEmployee] = React.useState({ visible: false })
  const [loading, setLoading] = React.useState(false)
  const [alert, setAlert] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });
  const [pagination, setPagination] = React.useState({
    page: 0,
    perPage: 15,
  })
  const [search, setSearch] = React.useState('')
  const [employeeData, setEmployeeData] = React.useState<any>([])
  const [formEmployee, setFormEmployee] = React.useState(initialFormEmployee)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sortBy, setSortBy] = React.useState('');
  const open = Boolean(anchorEl);
  const options = [
  { label: 'ID', value: 'ssn' },
  { label: 'Name', value: 'firstName' },
  { label: 'Age', value: 'age' },
  { label: 'Email', value: 'email' },
];

  React.useEffect(() => {
    getAllEmployees()
  }, [pagination, sortBy])
  

  const getAllEmployees = async () => {
    console.log(sortBy)
   
    setLoading(true)
    try {
      const res = search !== ''
        ? await employeeApi.getSearchEmployee({
            limit: pagination?.perPage,
            skip: pagination?.page * pagination?.perPage,
            search: search,
            ...(sortBy !== '') && {sortBy: sortBy},
            ...(sortBy !== '') && {order: 'asc'} 
          })
          : await employeeApi.getEmployee({
            limit: pagination?.perPage,
            skip: pagination?.page * pagination?.perPage,
            ...(sortBy !== '') && {sortBy: sortBy},
            ...(sortBy !== '') && {order: 'asc'} 
          });

      const data = res.data;
      console.log(data?.users)
      setEmployeeData(data)
    } catch (error: any) {
      console.log(error)
      setAlert({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleSelect = (option: any) => {
    setSortBy(option)
    handleClose();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage
    }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination({
      page: 0,
      perPage: +event.target.value
    });
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setPagination({
        page: 0,
        perPage: 15
      });
      getAllEmployees(); // Trigger function dengan keyword
    }
  };


  const onFinishModifyEmployee = async () => {
    const payload: BodyModifyEmployee = {
      ssn: formEmployee?.ssn,
      firstName: formEmployee?.firstName,
      lastName: formEmployee?.lastName,
      age: formEmployee?.age,
      email: formEmployee?.email,
      phone: formEmployee?.phone,
      company: {
        title: formEmployee?.title,
        department: formEmployee?.department
      }
    }

    console.log(formEmployee)
    console.log(payload)
    // return

    setLoading(true)
    try {
      const { data } = await employeeApi.addEmployee(payload)
      console.log(data)
      setAlert({ open: true, message: "New employee has been added!", severity: "success" });
    } catch (error: any) {
      setAlert({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false)
    }
  }

  const columns: Column[] = [
  { name: 'ID', key: 'ssn' },
  { name: 'Name', key: 'firstName' , render: (value, record) => <div className='flex items-center gap-2'><img src={record?.image} width={40}></img> {value} {record?.lastName}</div>},
  { name: 'Age', key: 'age', align: 'center' },
  // { name: 'Gender', key: 'gender', align: 'center' },
  { name: 'Email', key: 'email' },
  { name: 'Phone', key: 'phone' },
  { name: 'Job Title', key: 'company', render: (value) => <>{value?.title}</> },
  { name: 'Department', key: 'company', render: (value) => <>{value?.department}</> },
  // { name: 'Status', key: 'status', render: (value) => <span>{value ? <Chip label="Active" color="primary" /> : <Chip label="Inactive" color="error" />}</span> },
  { 
    name: 'Action', 
    key: 'action', 
    render: (value, record) => (
      <div className='flex items-center gap-2'>
        <Button
          variant="contained"
          size="small"
          color='success'
          onClick={() => {
            setFormEmployee({...record, title: record?.company?.title, department: record?.company?.department})
            setOpenModifyEmployee({ visible: true })
          }}
          startIcon={<EditIcon fontSize="small" />}
          sx={{ textTransform: 'none'}}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          size="small"
          color='error'
          // onClick={handleSort}
          startIcon={<DeleteIcon fontSize="small" />}
          sx={{ textTransform: 'none'}}
        >
          Delete
        </Button>
      </div>
    ) },
];

  return (
    <>
      <div className='flex items-center justify-between'>
        <Typography variant="h4" noWrap className='text-black'>
          Employee
        </Typography>
        <Button
          variant="contained"
          size="medium"
          onClick={() => setOpenModifyEmployee({ visible: true })}
          startIcon={<AddIcon fontSize="small" />}
          sx={{ textTransform: 'none', paddingBlock: '0.45rem', marginLeft: '1rem'}}
        >
          Add New Employee
        </Button>
      </div>
      <br />
      <Divider />
      <br />
      <div className='flex justify-between'>
        <TextField
          placeholder={"Search..."}
          size="small"
          variant="outlined"
          onKeyDown={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: '100%', maxWidth: 500, background: "white", marginRight: '1rem' }}
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
            onClick={handleSort}
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
      </div>
      
      
      <TableContainer component={Paper} className='mt-5 !bg-white'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className='bg-primary-200'>
            <TableRow>
              {columns?.map(col => {
                return (
                  <TableCell className='!text-black !text-center'>{col?.icon} {col?.name}</TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <div className="flex justify-center items-center py-5">
                    <CircularProgress size={24} />
                    <span className="ml-2">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : employeeData?.length < 1 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <div className="py-5 text-gray-400">No data available</div>
                </TableCell>
              </TableRow>
            ) : (
              employeeData?.users?.map((row:any, index: number) => (
                <TableRow
                  key={row.key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {columns.map((col) => (
                    <TableCell className={`!text-${col?.align}`}>
                      {col.render
                        ? col.render(row[col.key], row, index)
                        : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
            {/* {employeeData?.users?.map((row:any, index: number) => (
              <TableRow
                key={row.key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map((col) => (
                  <TableCell className={`!text-${col?.align}`}>
                    {col.render
                      ? col.render(row[col.key], row, index)
                      : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 25, 100]}
        component="div"
        count={Number(employeeData?.total)}
        rowsPerPage={Number(employeeData?.limit)}
        page={pagination?.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <AlertSnackbar
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={() => setAlert({ ...alert, open: false })}
      />

      <ModifyEmployee 
        open={openModifyEmployee}
        setOpen={setOpenModifyEmployee}
        form={formEmployee}
        setForm={setFormEmployee}
        resetForm={() => setFormEmployee(initialFormEmployee)}
        loading={loading}
        onFinish={onFinishModifyEmployee}
      />
    </>
  );
};

export default EmployeeList;
