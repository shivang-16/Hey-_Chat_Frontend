import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addGroupRequest } from '../../redux/slice/group';
import { getGroups } from '../../redux/actions/groupActions';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalBox({open, setOpen}) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
const [groupName, setGroupName] = useState()
const [messages, setMessages] = useState([])
const {user} = useSelector(state => state.user)
const dispatch = useDispatch()
  const handleClose = () => setOpen(false);
  
  const handleCreate = (e) => {
    e.preventDefault()
    const groupInfo = {
        groupName: groupName,
        creatorName: user.name,
        creatorId: user._id
    }

    dispatch(getGroups(groupName, messages))
    setOpen(false)
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create Groups with Hey! Chat
            </Typography>
            <form style={{display: 'flex', flexDirection:'column'}} onSubmit={handleCreate}>
            <TextField placeholder='Enter group name' value={groupName} onChange={e => setGroupName(e.target.value)}/>
            <Button type='submit'>Create</Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}