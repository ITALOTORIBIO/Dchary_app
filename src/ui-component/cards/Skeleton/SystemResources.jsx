// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// project imports
import { gridSpacing } from 'store/constant';

const SystemResources = () => (
    <Card>
        <CardContent>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid
                        container
                        paddingX={{ md: '1rem', lg: '3rem', xl: '5rem' }}
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={gridSpacing}
                    >
                        <Grid item xs zeroMinWidth>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Skeleton variant="rectangular" height={20} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container paddingX={{ md: '1rem', lg: '3rem', xl: '5rem' }}>
                        <Grid item xs={12}>
                            <Grid container spacing={4}>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <Grid item xs={12} marginTop="1rem">
                                        <Skeleton variant="rectangular" height={250} />
                                    </Grid>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <Grid item xs={12} marginTop="1rem">
                                        <Skeleton variant="rectangular" height={250} />
                                    </Grid>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <Grid item xs={12} marginTop="1rem">
                                        <Skeleton variant="rectangular" height={250} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} marginBottom="1rem">
                            <Grid container marginTop="1rem" display="flex">
                                <Grid item xs={12} paddingY="0.25rem">
                                    <Grid item>
                                        <Skeleton variant="text" height={30} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} paddingY="0.25rem">
                                    <Grid item>
                                        <Skeleton variant="text" height={30} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} paddingY="0.25rem">
                                    <Grid item>
                                        <Skeleton variant="text" height={30} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} paddingY="0.25rem">
                                    <Grid item>
                                        <Skeleton variant="text" height={30} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default SystemResources;
