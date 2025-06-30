import { injectable } from 'tsyringe';
import { AxiosFactory } from '@core/http/axios-factory';

export interface AuthResponse {
  displayName: string;
  token: string;
  latestLoginDate: Date;
}

/**
 * 認証を実装するrepository
 *
 * @export
 * @class AuthRepository
 */
@injectable()
export class AuthRepository {
  private repository = AxiosFactory.get();

  /**
   * ログインの実行
   *
   * @param {string} mailAddress ユーザーのメールアドレス
   * @param {string} password パスワード
   * @return {*}  {Promise<{ data: AuthResponse }>}
   * @memberof AuthRepository
   */
  public login(
    mailAddress: string,
    password: string
  ): Promise<{ data: AuthResponse }> {
    return this.repository.post('/login', {
      mailAddress: mailAddress,
      password: password
    });
  }
}
