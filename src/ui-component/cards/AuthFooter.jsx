// material-ui
import { Link, Typography, Stack } from '@mui/material';

const AuthFooter = () => (
    <Stack direction="row" justifyContent="center">
        <Typography variant="subtitle2" component={Link} href="https://binareon.com" target="_blank" underline="hover">
            &copy; binareon.com
        </Typography>
    </Stack>
);

export default AuthFooter;
