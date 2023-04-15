import { createTheme } from '@mui/material/styles';
import { esES as coreEsES } from '@mui/material/locale';
import { esES } from '@mui/x-date-pickers';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './styles/compStyleOverride';
import themePalette from './styles/palette';
import themeTypography from './styles/typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
    const color = colors;

    const themeOption = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.primaryLight,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.primaryDark,
        menuSelectedBack: color.primaryLight,
        divider: color.grey200,
        customization
    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption)
    };

    const themes = createTheme(themeOptions, coreEsES, esES);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;
