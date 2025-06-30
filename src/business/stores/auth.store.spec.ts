/* eslint-disable @typescript-eslint/no-unused-vars */
// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { container } from 'tsyringe';
import { describe, it, expect, beforeEach } from 'vitest';
import { createApp } from 'vue';
import { AuthRepository, AuthResponse } from '../repositories/auth.repository';
import { useAuthStore } from './auth.store';

export class MockAuthRepository {
  public async login(
    _mailAddress: string,
    _password: string
  ): Promise<{ data: AuthResponse }> {
    return {
      data: {
        displayName: 'test',
        token: 'test-token',
        latestLoginDate: new Date()
      }
    };
  }
}

beforeEach(() => {
  // Piniaのセットアップ
  const app = createApp({});
  const pinia = createPinia().use(piniaPluginPersistedstate);
  app.use(pinia);
  setActivePinia(pinia);
  // DI機構を用いてAuthRepositoryのモックを差し込む
  container.register<MockAuthRepository>(AuthRepository, {
    useClass: MockAuthRepository
  });
});

describe('Auth Store', () => {
  it('logout', async () => {
    const auth = useAuthStore();
    await auth.logout();
    expect(auth.getToken).toBeUndefined();
  });

  it('login', async () => {
    const auth = useAuthStore();
    await auth.login('test@test.com', 'password');
    expect(auth.getToken).toEqual('test-token');
  });
});
