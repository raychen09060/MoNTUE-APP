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
        Settings_icon: require('../images/Settings_deactived_icon_LM.png'),
        Tickets_icon: require('../images/Tickets_deactived_icon_LM.png'),
        Guide_icon: require('../images/Guide_deactived_icon_LM.png'),
    },
    dark: {
        bgc: '#000000',
        text: '#ffffff',
        outline: '#ffffff',
        glow: '#ffffff55',
        glow_outline: '#000000',
        Settings_icon: require('../images/Settings_deactived_icon_DM.png'),
        Tickets_icon: require('../images/Tickets_deactived_icon_DM.png'),
        Guide_icon: require('../images/Guide_deactived_icon_DM.png'),
    }
};

export const useLDM_Home = create((set) =>({
    isDarkMode: systemMode === 'dark',
    colors: systemMode === 'dark' ? modes.dark : modes.light,
    remoteBgColor: null,

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

    setRemoteBgColor: (color) => set({ remoteBgColor: color }),
}))