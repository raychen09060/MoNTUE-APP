import { Stack } from 'expo-router';

export default function NewsLayout() {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{ title: 'News Details' }} />
        </Stack>
    );
}