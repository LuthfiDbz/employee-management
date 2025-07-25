import { Alert, Backdrop, Box, Button, Fade, IconButton, Modal, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FormEmployee, GetEmployeeData } from "../../Interface/Pages/employeeInterface";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  open: {
    visible: boolean,
    data?: GetEmployeeData
  };
  form: FormEmployee,
  setForm: React.Dispatch<React.SetStateAction<FormEmployee>>
  resetForm: () => void
  setOpen: (state: { visible: boolean }) => void
  loading: boolean;
  onFinish: () => void
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: 1,
  boxShadow: 24,
};

const ModifyEmployee: React.FC<Props> = ({
  open,
  setOpen,
  form,
  setForm,
  resetForm,
  loading,
  onFinish
}) => {

  useEffect(() => {
    if(form?.id) {

    } else {
      resetForm()
    }
  }, [open])
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      onClose={() => setOpen({ visible: false })}
      open={open.visible}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open.visible}>
        <Box sx={style}>
          <Box className="flex justify-between items-center mb-10 bg-primary-200 rounded-t py-3 px-4">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add New Employee
            </Typography>
            <IconButton onClick={() => setOpen({ visible: false })}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form>
            <Box className="flex gap-2 px-4 mb-4">
              <TextField
                label="ID"
                name="ssn"
                value={form?.ssn}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Firstname "
                name="firstName"
                value={form?.firstName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>
            <Box className="flex gap-2 px-4 mb-4">
              <TextField
                label="Lastname"
                name="lastName"
                value={form?.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Age"
                name="age"
                value={form?.age}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>
            <Box className="flex gap-2 px-4 mb-4">
              <TextField
                label="Email"
                name="email"
                value={form?.email}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Phone Number"
                name="phone"
                value={form?.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>
            <Box className="flex gap-2 px-4">
              <TextField
                label="Job Title"
                name="title"
                value={form?.title}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Department"
                name="department"
                value={form?.department}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>
            <br />

            <Box className="text-end py-4 px-4">
              <Button
                variant="contained"
                size="medium"
                // type="submit"
                loading={loading}
                onClick={onFinish}
                sx={{ textTransform: 'none', paddingBlock: '0.45rem', marginLeft: '1rem'}}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModifyEmployee;
