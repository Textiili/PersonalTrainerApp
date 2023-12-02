import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-gb';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: null, duration: '', activity: '', customer: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const linkTraining = () => {
        setTraining({...training, customer: props.customer.links[0].href});
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    const changeDate = (date) => {
        setTraining({...training, date: date.toISOString()});
      }

    const saveTraining = () => {
        if (training.date != null && training.duration != '' && training.activity != '') {
            props.saveTraining(training);
            handleClose();

            //Palautetaan kyseisen asiakkaan treenilomake alkutilanteeseen!
            setTraining({...training, date: null, duration: '', activity: ''})
        } else alert("Adding training failed! Fill all needed data.");
    }

    return(
        <>
        <div>
            <Button size="small" onClick={() => {
                handleClickOpen();
                linkTraining();
            }}>
                NEW
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                    <DialogContent>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DatePicker 
                                autoFocus
                                margin="dense"
                                value={null}
                                onChange={changeDate}
                                fullWidth
                            />
                        </LocalizationProvider>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="duration"
                            value={training.duration}
                            onChange={e => handleInputChange(e)}
                            label="Duration"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="activity"
                            value={training.activity}
                            onChange={e => handleInputChange(e)}
                            label="Activity"
                            fullWidth
                        />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={saveTraining}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        </>
    )
}