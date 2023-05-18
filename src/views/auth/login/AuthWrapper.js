// material-ui
import { styled } from '@mui/material/styles';
import imageBGLogin from '../../../assets/images/inicio_sesion.jpg';

const AuthWrapper = styled('div')(({ theme }) => ({
    backgroundImage: `url(${imageBGLogin})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 0',
    width: '100%'
}));

export default AuthWrapper;
