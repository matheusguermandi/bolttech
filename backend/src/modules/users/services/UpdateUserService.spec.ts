import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let updateUser: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    updateUser = new UpdateUserService(
      fakeUsersRepository,
    );
  });

  it('should be able to update the user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Matheus01',
      email: 'matheus_guermandi@hotmail.com',
    });

    const updatedUser = await updateUser.execute({
      id: user.id,
      name: 'Matheus02',
      email: 'matheusguermand@gmail.com',
    });

    expect(updatedUser.name).toBe('Matheus02');
    expect(updatedUser.email).toBe('matheusguermand@gmail.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    expect(
      updateUser.execute({
        id: 'non-existing',
        name: 'Matheus',
        email: 'matheusguermand@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to switch to another existing email', async () => {
    await fakeUsersRepository.create({
      name: 'Matheus01',
      email: 'matheus_guermandi@hotmail.com',
      password: '123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Matheus02',
      email: 'matheusguermand@gmail.com',
      password: '123',
    });

    await expect(updateUser.execute({
      id: user.id,
      name: 'Matheus_02',
      email: 'matheus_guermandi@hotmail.com',
    })).rejects.toBeInstanceOf(AppError);
  });

});
