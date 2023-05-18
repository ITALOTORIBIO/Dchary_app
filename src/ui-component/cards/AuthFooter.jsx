// material-ui
import { Link, Typography, Stack } from '@mui/material';

const AuthFooter = () => (
    <Stack direction="row" justifyContent="center">
        <Typography variant="subtitle2" component={Link} href="https://binareon.com" target="_blank" underline="hover">
            &copy; 2023 - D'Chary Asocs.
        </Typography>
    </Stack>
);

export default AuthFooter;
