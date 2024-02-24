import React, { useState, useEffect } from 'react';
import { CustomDataGrid } from '../../components/CustomDataGrid';
import { Container, IconButton } from '@mui/material';
import DarkMode from '../../components/DarkMode/DarkMode';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { CustomDialog } from '../../components/Dialog';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UserDetails from '../UseDetails';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [userDetail, setUserDetail] = useState({})

    const handleClickOpen = () => setIsOpen(true)
    const handleDialogClose = () => setIsOpen(false)

    const fetchData = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
            const todosData = await response.json()
            console.log(todosData, "this is the data")
            setTodos(todosData)
            setIsLoading(true)
            return todosData
        } catch (error) {
            setIsLoading(false)
            throw new Error(`Error fetching data: ${error}`, { cause: error })
        }
    }

    const fetchDataByID = async (id) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            const userData = await response.json()
            console.log(userData, "user data")
            setUserDetail(userData)
            setIsLoading(true)
            return userData
        } catch (error) {
            setIsLoading(false)
            throw new Error(`Error fetching data: ${error}`, { cause: error })
        }
    }

    const deleteUser = async (id) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'DELETE'
            });
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
            // fetchData();
            toast.success('User deleted Successfully')
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error(`Error deleting User:`, { cause: error })
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    console.log(todos)

    const columns = [
        { field: 'id', headerName: 'id', width: 100 },
        { field: 'name', headerName: 'name', width: 180 },
        { field: 'email', headerName: 'EMAIL', width: 200 },
        { field: 'phone', headerName: 'PHONE', width: 200 },
        {
            field: 'address', headerName: 'ADDRESS', width: 300,
            renderCell: (params) => {
                console.log(params)
                return params.row.address.city + ' ' + params.row.address.street + ' ' + params.row.address.zipcode
            }
        },
        { field: 'website', headerName: 'WEBSITE', width: 200 },
        {
            field: 'company', headerName: 'COMPANY NAME', width: 200,
            renderCell: (params) => {
                return params.row.company.name
            }
        },
        {
            field: 'Actions', headerName: 'Actions', width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton color='error' onClick={() => deleteUser(params.row.id)}>
                            <GridDeleteIcon />
                        </IconButton>
                        <IconButton color='primary' onClick={() => {
                            console.log(params.row.id)
                            handleClickOpen()
                            fetchDataByID(params.row.id)
                        }}>
                            <VisibilityIcon />
                        </IconButton>
                    </>
                )
            }
        }
    ];
    return (
        <>
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
            />
            <Container sx={{ mt: 5 }} maxWidth="lg">
                <DarkMode />
                <CustomDataGrid
                    isSearch={true}
                    rows={todos || []}
                    columns={columns}
                    isLoading={!isLoading}
                />
                <CustomDialog
                    isOpen={isOpen}
                    handleClose={handleDialogClose}
                    title="View User Details"
                >
                    <UserDetails data={userDetail} isLoading={!isLoading} />
                </CustomDialog>
            </Container>
        </>
    )
}

export default Home