import { injectable } from 'tsyringe';
import { AxiosFactory } from '@core/http/axios-factory';

export interface UserDetailResponse {
  id: number;
  name: string;
  email: string;
  detail: string;
  birthday: Date;
  validStartDate: Date;
  validEndDate: Date;
}
export interface UserEditRequest {
  name: string;
  email: string;
  detail: string;
  birthday: string;
  validStartDate: string;
  validEndDate: string;
}

/**
 * ユーザデータを処理するrepository
 *
 * @export
 * @class UserRepository
 */
@injectable()
export class UserRepository {
  private repository = AxiosFactory.get();
  /**
   * ユーザ一覧取得実行
   *
   * @return {*}  {Promise<{ data: UserResponse[] }>}
   * @memberof UserRepository
   */
  public getUserList(): Promise<{ data: UserDetailResponse[] }> {
    return this.repository.get('/users');
  }

  /**
   * ユーザ詳細取得
   *
   * @param {number} id
   * @return {*}  {Promise<{ data: UserDetailResponse }>}
   * @memberof UserRepository
   */
  public getUser(id: number): Promise<{ data: UserDetailResponse }> {
    return this.repository.get('/user/' + id);
  }

  /**
   * ユーザ詳細更新
   *
   * @param {number} id
   * @param {UserEditRequest} userDetail
   * @return {*}  {Promise<{ data: any }>}
   * @memberof UserRepository
   */
  public editUser(
    id: number,
    userDetail: UserEditRequest
  ): Promise<{ data: void }> {
    return this.repository.put('/user/' + id, userDetail);
  }

  /**
   * ユーザ削除
   *
   * @param {number} id
   * @return {*}  {Promise<{ data: any }>}
   * @memberof UserRepository
   */
  public deleteUser(id: number): Promise<{ data: void }> {
    return this.repository.delete('/user/' + id);
  }

  /**
   * ユーザ追加
   *
   * @param {number} id
   * @param {UserEditRequest} userDetail
   * @return {*}  {Promise<{ data: any }>}
   * @memberof UserRepository
   */
  public addUser(userDetail: UserEditRequest): Promise<{ data: string }> {
    return this.repository.post('/user', userDetail);
  }
}
