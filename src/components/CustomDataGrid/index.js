import { useState } from 'react';
import { Box, Card, Grid, Toolbar } from '@mui/material';
import {
    Search,
    SearchIconWrapper,
    StyledDataGrid,
    StyledInputBase
} from './styles';
import Loader from '../Loader/Loader';

export const CustomDataGrid = ({
    isSearch = false,
    columns,
    rows = [],
    isLoading,
    getRowId
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = Array.isArray(rows)
        ? rows.filter((item) => {
            const searchValue = searchTerm.toLowerCase();
            return Object.values(item).some((value) =>
                String(value).toLowerCase().includes(searchValue)
            );
        })
        : [];

    console.log(filteredData, 'filteredData');
    return (
        <Card component={'div'} sx={{ p: 2, width: "100%" }}>
            {isSearch && (
                <Toolbar sx={{ mb: 2 }}>
                    <Grid container spacing={2} justifyContent="space-between">
                        <Grid item>
                            <Search>
                                <SearchIconWrapper>
                                    {/* <SearchIcon /> */}
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    inputProps={{ 'aria-label': 'search users...' }}
                                />
                            </Search>
                        </Grid>
                    </Grid>
                </Toolbar>
            )}
            {isLoading ? (
                <Loader />
            ) : (
                <Box sx={{ width: "100%", minWidth: 800, height: 400 }}>
                    <StyledDataGrid
                        rows={filteredData}
                        columns={columns}
                        pageSizeOptions={[5, 10, 25]}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } }
                        }}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        getRowId={getRowId}
                    />
                </Box>
            )}
        </Card>
    );
};
