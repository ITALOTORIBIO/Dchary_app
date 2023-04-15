import { useState } from 'react';

// material-ui
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Add, KeyboardDoubleArrowDown, Search } from '@mui/icons-material';

// project imports
import { gridSpacing } from 'store/constant';
import ListInformationUser from './list-information-user/ListInformationUser';
import AddUserModal from './add-user-modal/AddUserModal';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenUser } from 'store/modal';

const User = () => {
    const [user, setUser] = useState('');
    const { open } = useSelector((state) => state.modalUser);
    const dispatch = useDispatch();

    const handleShowAddUserModal = () => {
        dispatch(modalOpenUser(!open));
    };

    const handleChangeUser = (event) => setUser(event.target.value);

    const handleClickSearch = () => {
        setUser('');
    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item width="100%">
                    <MainCard>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Typography variant="h4">Lista de Usuarios</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Button
                                            sx={{
                                                textTransform: 'uppercase',
                                                paddingX: '1.25rem',
                                                paddingY: '0.5rem'
                                            }}
                                            variant="contained"
                                            endIcon={<Add />}
                                            onClick={handleShowAddUserModal}
                                        >
                                            Añadir Usuario
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            sx={{
                                                textTransform: 'uppercase',
                                                paddingX: '1.25rem',
                                                paddingY: '0.5rem'
                                            }}
                                            variant="contained"
                                            endIcon={<KeyboardDoubleArrowDown />}
                                        >
                                            Herramientas
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing} alignItems="center">
                                    <Grid item>
                                        <Box width={385} maxWidth="100%">
                                            <TextField
                                                fullWidth
                                                label="Buscar usuario"
                                                name="user"
                                                value={user}
                                                type="search"
                                                variant="standard"
                                                onChange={handleChangeUser}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            sx={{
                                                textTransform: 'uppercase',
                                                paddingX: '1.25rem',
                                                paddingY: '0.5rem'
                                            }}
                                            variant="contained"
                                            endIcon={<Search />}
                                            onClick={handleClickSearch}
                                        >
                                            Buscar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item width="100%">
                    <MainCard>
                        <ListInformationUser />
                    </MainCard>
                </Grid>
            </Grid>
            <AddUserModal open={open} />
        </>
    );
};

export default User;
