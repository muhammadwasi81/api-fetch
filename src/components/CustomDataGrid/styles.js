import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { DataGrid } from '@mui/x-data-grid';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f7f9fc',
    marginLeft: 0,
    minWidth: '250px',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
    }
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '30ch'
            }
        }
    }
}));

// data grid styles for table
export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 'none !important',
    '.MuiDataGrid-root': {
        borderColor: 'transparent'
    },
    '& .css-yrdy0g-MuiDataGrid-columnHeaderRow': {
        backgroundColor: '#f7f9fc'
    },
    '.MuiDataGrid-cell': {
        borderBottom: 'none'
    }
}));
