// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// project imports
import { gridSpacing } from 'store/constant';

const ProcessesStatus = () => (
    <Card>
        <CardContent>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={50} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                                <Grid item xs={6}>
                                    <Skeleton variant="rectangular" height={20} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                                        <Grid item xs zeroMinWidth>
                                            <Skeleton variant="rectangular" height={20} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Skeleton variant="rectangular" height={20} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                                <Grid item xs={6}>
                                    <Skeleton variant="rectangular" height={20} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                                        <Grid item xs zeroMinWidth>
                                            <Skeleton variant="rectangular" height={20} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Skeleton variant="rectangular" height={20} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                                <Grid item xs={6}>
                                    <Skeleton variant="rectangular" height={20} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                                        <Grid item xs zeroMinWidth>
                                            <Skeleton variant="rectangular" height={20} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Skeleton variant="rectangular" height={20} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                                <Grid item xs={6}>
                                    <Skeleton variant="rectangular" height={20} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                                        <Grid item xs zeroMinWidth>
                                            <Skeleton variant="rectangular" height={20} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Skeleton variant="rectangular" height={20} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                                <Grid item xs={6}>
                                    <Skeleton variant="rectangular" height={20} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                                        <Grid item xs zeroMinWidth>
                                            <Skeleton variant="rectangular" height={20} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Skeleton variant="rectangular" height={20} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default ProcessesStatus;
