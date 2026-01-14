import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAuthStore } from '@/stores';

/**
 * Example Login Component sử dụng Auth Store
 */
export default function LoginExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading, error, clearError } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      Alert.alert('Success', 'Logged in successfully!');
    } catch {
      // Error được handle trong store
    }
  };

  return (
    <View className="flex-1 justify-center bg-white p-6">
      <Text className="mb-8 text-center text-3xl font-bold">Login</Text>

      {error && (
        <View className="mb-4 rounded-lg bg-red-100 p-4">
          <Text className="text-red-700">{error}</Text>
          <TouchableOpacity onPress={clearError}>
            <Text className="mt-2 text-red-500 underline">Dismiss</Text>
          </TouchableOpacity>
        </View>
      )}

      <TextInput
        className="mb-4 rounded-lg border border-gray-300 px-4 py-3"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />

      <TextInput
        className="mb-6 rounded-lg border border-gray-300 px-4 py-3"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />

      <TouchableOpacity
        className={`rounded-lg py-4 ${isLoading ? 'bg-blue-300' : 'bg-blue-500'}`}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text className="text-center text-lg font-semibold text-white">
          {isLoading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
