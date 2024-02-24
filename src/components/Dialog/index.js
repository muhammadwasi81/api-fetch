import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import propTypes from 'prop-types'
import Loader from '../Loader/Loader'

export const CustomDialog = ({
    isOpen,
    handleClose = () => { },
    title = "",
    subtitle,
    children,
    isLoading = false
}) => (
    <>
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <DialogContent>
                        <DialogContentText>{subtitle}</DialogContentText>
                        {children}
                    </DialogContent>
                </>
            )}
            <DialogActions>
                <Button onClick={handleClose} variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </>
)

CustomDialog.propTypes = {
    isOpen: propTypes.bool.isRequired,
    handleClose: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
    subtitle: propTypes.string,
    isLoading: propTypes.bool,
    children: propTypes.element.isRequired,
}