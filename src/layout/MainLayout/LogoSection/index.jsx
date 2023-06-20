import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import logo from '../../../assets/images/logo4.png';

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <img src={logo} alt="Logo de Admin" width="100" />
    </ButtonBase>
);

export default LogoSection;
