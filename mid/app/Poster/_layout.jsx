import { Stack } from 'expo-router';

export default function PosterLayout() {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{ title: 'Poster Details' }} />
        </Stack>
    );
}