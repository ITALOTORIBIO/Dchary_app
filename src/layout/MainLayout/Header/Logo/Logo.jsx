import { Box } from '@mui/material';
import logo from '../../../../assets/images/logo.png';

const Logo = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <img src={logo} alt="Logo de Admin" width="100" />
        </Box>
    );
};

export default Logo;
