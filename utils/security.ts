import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

/**
 * Secure Storage Utility
 * Sử dụng Expo SecureStore để lưu trữ dữ liệu nhạy cảm
 */
export class SecureStorage {
  /**
   * Lưu giá trị vào secure storage
   */
  static async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error saving to secure storage:', error);
      throw error;
    }
  }

  /**
   * Lấy giá trị từ secure storage
   */
  static async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error reading from secure storage:', error);
      return null;
    }
  }

  /**
   * Xóa giá trị khỏi secure storage
   */
  static async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing from secure storage:', error);
      throw error;
    }
  }

  /**
   * Lưu object vào secure storage (tự động serialize)
   */
  static async setObject(key: string, value: any): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await this.setItem(key, jsonValue);
  }

  /**
   * Lấy object từ secure storage (tự động deserialize)
   */
  static async getObject<T>(key: string): Promise<T | null> {
    const jsonValue = await this.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  }
}

/**
 * Crypto Utility
 * Các hàm mã hóa và hash
 */
export class CryptoUtil {
  /**
   * Tạo hash SHA256
   */
  static async sha256(data: string): Promise<string> {
    return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, data);
  }

  /**
   * Tạo UUID ngẫu nhiên
   */
  static generateUUID(): string {
    return Crypto.randomUUID();
  }

  /**
   * Tạo bytes ngẫu nhiên
   */
  static getRandomBytes(length: number): Uint8Array {
    return Crypto.getRandomBytes(length);
  }
}

/**
 * Token Manager
 * Quản lý authentication tokens an toàn
 */
export class TokenManager {
  private static readonly ACCESS_TOKEN_KEY = 'access_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

  static async setAccessToken(token: string): Promise<void> {
    await SecureStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  static async getAccessToken(): Promise<string | null> {
    return await SecureStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static async setRefreshToken(token: string): Promise<void> {
    await SecureStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  static async getRefreshToken(): Promise<string | null> {
    return await SecureStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static async clearTokens(): Promise<void> {
    await SecureStorage.removeItem(this.ACCESS_TOKEN_KEY);
    await SecureStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}
