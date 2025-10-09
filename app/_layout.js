import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout(){
    return(
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarStyle: 
            { 
                backgroundColor: '#fff',
                borderTopWidth: 1,
                borderTopColor: '#e0e0e0',
            },
            tabBarActiveTintColor: '#0076AFF',
            tabBarInactiveTintColor: '#868',
        }}
        >
            
            <Tabs.Screen 
            name="Home" 
            options={{
                title: "Home",
                tabBarIcon: ({color}) => (
                    <Text style={{fontSize: 24}}>🏠</Text>
                )
            }}
            />
            <Tabs.Screen 
            name="Profile" 
            options={{
                title: "Profile",
                tabBarIcon: ({color}) => (
                    <Text style={{fontSize: 24}}>👤</Text>
                )
            }}
             />
        </Tabs>
    )
}