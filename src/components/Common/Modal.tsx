import * as React from 'react'
import { Transition } from 'react-transition-group'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import ModalClose from '@mui/joy/ModalClose'
import { Divider } from '@mui/joy'

interface AlertDialogProps {
    title: string | React.ReactNode
    content: React.ReactNode
    open: boolean
    setOpen: (value: boolean) => void
    size?: 'sm' | 'md' | 'lg'
}
export default function FadeModalDialog({
    title,
    content,
    open,
    setOpen,
    size,
}: AlertDialogProps) {
    return (
        <React.Fragment>
            <Transition in={open} timeout={400}>
                {(state: string) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={() => setOpen(false)}
                        slotProps={{
                            backdrop: {
                                sx: {
                                    opacity: 0,
                                    backdropFilter: 'none',
                                    transition: `opacity 400ms, backdrop-filter 400ms`,
                                    ...{
                                        entering: {
                                            opacity: 1,
                                            backdropFilter: 'blur(8px)',
                                        },
                                        entered: {
                                            opacity: 1,
                                            backdropFilter: 'blur(8px)',
                                        },
                                    }[state],
                                },
                            },
                        }}
                        sx={{
                            visibility:
                                state === 'exited' ? 'hidden' : 'visible',
                        }}>
                        <ModalDialog
                            size={size}
                            sx={{
                                opacity: 0,
                                width:
                                    size === 'lg'
                                        ? '100%'
                                        : size === 'md'
                                        ? '50%'
                                        : '',
                                transition: `opacity 300ms`,
                                ...{
                                    entering: { opacity: 1 },
                                    entered: { opacity: 1 },
                                }[state],
                            }}>
                            <ModalClose />
                            <DialogTitle>{title}</DialogTitle>
                            <Divider inset="none" />
                            <DialogContent>{content}</DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
        </React.Fragment>
    )
}
