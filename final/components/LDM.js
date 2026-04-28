import { Appearance } from 'react-native';
import { create } from 'zustand';

const systemMode = Appearance.getColorScheme();

const modes = {
    light: {
        bgc: '#ffffff',
        text: '#000000',
        outline: '#000000',
        glow: '#90909055',
        glow_outline: '#ffffff',
        Logo_img: require('../images/logo_LM.png'),
        Settings_icon: require('../images/Settings_deactived_icon_LM.png'),
        Tickets_icon: require('../images/Tickets_deactived_icon_LM.png'),
        Guide_icon: require('../images/Guide_deactived_icon_LM.png'),
        Back_icon: require('../images/Back_icon_LM.png'),
        User_img: require('../images/User_LM.png'),
        Language_switch_icon: require('../images/Language_switch_icon_LM.png'),
        Display_mode_icon: require('../images/Display_mode_icon_LM.png'),
        Notification_icon: require('../images/Notification_icon_LM.png'),
        Contact_icon: require('../images/Contact_icon_LM.png'),
        Info_icon: require('../images/Info_icon_LM.png'),
        Next_icon: require('../images/Next_icon_LM.png'),

    },
    dark: {
        bgc: '#000000',
        text: '#ffffff',
        outline: '#ffffff',
        glow: '#ffffff55',
        glow_outline: '#000000',
        Logo_img: require('../images/logo_DM.png'),
        Settings_icon: require('../images/Settings_deactived_icon_DM.png'),
        Tickets_icon: require('../images/Tickets_deactived_icon_DM.png'),
        Guide_icon: require('../images/Guide_deactived_icon_DM.png'),
        Back_icon: require('../images/Back_icon_DM.png'),
        User_img: require('../images/User_DM.png'),
        Language_switch_icon: require('../images/Language_switch_icon_DM.png'),
        Display_mode_icon: require('../images/Display_mode_icon_DM.png'),
        Notification_icon: require('../images/Notification_icon_DM.png'),
        Contact_icon: require('../images/Contact_icon_DM.png'),
        Info_icon: require('../images/Info_icon_DM.png'),
        Next_icon: require('../images/Next_icon_DM.png'),
    }
};

export const useLDM = create((set) =>({
    isDarkMode: systemMode === 'dark',
    colors: systemMode === 'dark' ? modes.dark : modes.light,

    toggleTheme: () => set((state) => {
        const newMode = !state.isDarkMode;
        return {
            isDarkMode: newMode,
            colors: newMode ? modes.dark : modes.light,
        };
    }),

    setTheme: (mode) => set({
        isDarkMode: mode === 'dark',
        colors: mode === 'dark' ? modes.dark : modes.light,
    }),
}))