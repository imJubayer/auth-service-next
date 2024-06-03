import React from 'react'
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

interface CustomTransitionProps extends TransitionProps {
    children: React.ReactElement
}

const CustomTransition = React.forwardRef<unknown, CustomTransitionProps>(
    (props, ref) => <Slide direction="up" ref={ref} {...props} />,
)

interface AlertDialogProps {
    title: string | React.ReactNode
    content: React.ReactNode
    open: boolean
    setOpen: (value: boolean) => void
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const AlertDialogSlide: React.FC<AlertDialogProps> = ({
    title,
    content,
    open,
    setOpen,
    maxWidth,
}) => {
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Dialog
                open={open}
                fullWidth
                maxWidth={maxWidth}
                TransitionComponent={CustomTransition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default AlertDialogSlide
