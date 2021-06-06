import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FindUsersService from './FindUserService';

let fakeUsersRepository: FakeUsersRepository;
let findUser: FindUsersService;

describe('FindUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    findUser = new FindUsersService(fakeUsersRepository);
  });

  it('should be able to find user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Matheus',
      email: 'matheus_guermandi@hotmail.com',
      password: '123',
    });

    const profile = await findUser.execute(user.id);

    expect(profile.name).toBe('Matheus');
    expect(profile.email).toBe('matheus_guermandi@hotmail.com');
  });

  it('should not be able to find non-existing user', async () => {
    expect(
      findUser.execute('non-existing'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
