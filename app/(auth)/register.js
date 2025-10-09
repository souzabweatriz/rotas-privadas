import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    ScroolView,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function RegisterScreen(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const router = useRouter();

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }
        try {
            const result = await signUp(name, email, password);
            if (result.success) {
                router.push('/(app)/home');
            } else {
                Alert.alert('Erro', result.message || 'Erro ao registrar.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao registrar.');
        }finally {
            setLoading(false);
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            Alert.alert('Erro', 'Email inválido.');
            return;
        }
        
        setLoading(true);
        try {
            const result = await signUp(name, email, password);
            if (result.success) {
                Alert.alert('Sucesso', 'Registro realizado com sucesso!', [{ text: 'OK'}]);
            }else{
                Alert.alert('Erro', result.message || 'Erro ao registrar.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao registrar.');
        }finally {
            setLoading(false);
        }
    };
    return(
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        >
            <View style={styles.content}>
                <Text style={styles.emoji}>✨</Text>
                <Text style={styles.title}>Criar Conta</Text>
                <Text style={styles.subtitle}>Preencha os dados abaixo</Text>

                <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                editable={!loading}
                />
                <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
                />
                <TextInput
                style={styles.input}
                placeholder="Senha (minimo 6 caracteres)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                editable={!loading}
                />
                <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                editable={!loading}
                />
                <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Registrar</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
                disabled={loading}
                >
                    <Text style={styles.backText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7',
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingTop: 60,
        paddingBottom: 40,
    },
    emoji:{
        fontSize: 60,
        textAlign: 'center',
        marginBottom: 20,
    },
    tlte:{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle:{
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    input:{
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    button:{
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
        minHeight: 50,
        justifyContent: 'center',
    },
    buttonText:{
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    backButton:{
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
    },
    backText:{
        color: '#007AFF',
        fontSize: 14,
        fontWeight: 'bold',  
    },
    }
);