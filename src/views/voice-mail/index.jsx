// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import ListInformationVoiceMail from './list-information-voice-mail/ListInformationVoiceMail';

const VoiceMail = () => {
    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item width="100%">
                    <MainCard>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Typography variant="h4">Lista de Buzón de voz</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item width="100%">
                    <MainCard>
                        <ListInformationVoiceMail />
                    </MainCard>
                </Grid>
            </Grid>
        </>
    );
};

export default VoiceMail;
