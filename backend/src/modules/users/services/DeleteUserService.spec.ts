import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import DeleteUserService from './DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUser: DeleteUserService;

describe('DeleteUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteUser = new DeleteUserService(
      fakeUsersRepository,
    );
  });

  it('should be able to delete a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Matheus',
      email: 'matheus@hotmail.com',
      password: 'secret'
    });

    await deleteUser.execute(user.id);

    const list = await fakeUsersRepository.list()

    expect(list).toEqual([]);
  });

  it('should not be able to delete the profile from non-existing user', async () => {
    expect(
      deleteUser.execute('non-existing'),
    ).rejects.toBeInstanceOf(AppError);
  });

});
