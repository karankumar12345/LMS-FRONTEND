/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";
import AdminSidebar from '@/app/_components/Admin/sidebar/AdminSidebar';
import Heading from '@/utils/Heading';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  IconButton,
  FormControl,
  useTheme,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import DashBoardHeader from '@/app/_components/Admin/DashBoardHeader';
import Admin from '@/app/_hooks/AdminProt';
import ThemedAllUser from '../_components/ALLUser/AllUsers';
import { useUpdateUserRoleMutation } from '../../../../redux/features/auth/authapi';

type Props = {};

interface UserDialogProps {
  userEmail: string;
  onConfirm: (role: string) => void;
  onClose: () => void;
  onEmailChange: (email: string) => void;
}

const UserDeletionDialog: React.FC<UserDialogProps> = ({ userEmail, onConfirm, onClose, onEmailChange }) => {
  const theme = useTheme();
  const [selectedRole, setSelectedRole] = useState('user');

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole((event.target as HTMLInputElement).value);
  };

  const handleDelete = () => {
    onConfirm(selectedRole);
  };

  return (
    <Dialog open onClose={onClose} PaperProps={{ sx: { borderRadius: '12px', width: '500px' } }}>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          Change User Role
        </Typography>
        <IconButton aria-label="close" onClick={onClose} sx={{ color: theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ px: 4, py: 2 }}>
        <Typography variant="body1" gutterBottom>
          This action will change the role of the specified user.
        </Typography>

        {/* Input Field for Email */}
        <TextField
          fullWidth
          label="User Email"
          variant="outlined"
          value={userEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          sx={{ mt: 2 }}
        />

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Select Role:
          </Typography>
          <RadioGroup aria-label="role" name="role" value={selectedRole} onChange={handleRoleChange}>
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Change Role
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Page: React.FC<Props> = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>('');
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async (role: string) => {
    if (role !== 'cancel' && selectedUserEmail) {
      try {
        console.log(`Changing role of ${selectedUserEmail} to ${role}...`);
        await updateUserRole({ email: selectedUserEmail, role }).unwrap();
        console.log('Role changed successfully');
      } catch (err) {
        console.error('Failed to change role', err);
      }
    }
    setOpenDialog(false);
  };

  const handleEmailChange = (email: string) => {
    setSelectedUserEmail(email);
  };

  return (
    <div>
      <Admin>
        <Heading title="LEARNING -Admin" description="learning" keywords="lal" />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[84%]">
            <DashBoardHeader />
            <div className="flex justify-end mr-10 mt-4">
              <Button variant="contained" color="error" onClick={handleOpenDialog}>
                Change User Role
              </Button>
            </div>
            <ThemedAllUser isTeam={false} />
          </div>
        </div>
      </Admin>

      {openDialog && (
        <UserDeletionDialog
          userEmail={selectedUserEmail}
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDialog}
          onEmailChange={handleEmailChange}
        />
      )}
    </div>
  );
};

export default Page;
