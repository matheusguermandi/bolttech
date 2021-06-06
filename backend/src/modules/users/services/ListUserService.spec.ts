import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ListUserService from './ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let listUser: ListUserService;

describe('ListUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        listUser = new ListUserService(fakeUsersRepository);
    });

    it('should be able to list all users', async () => {
        const user00 = await fakeUsersRepository.create({
            name: 'teste 00',
            email: 'teste00@hotmail.com',
            password: 'secret',
        });

        const user01 = await fakeUsersRepository.create({
            name: 'teste 01',
            email: 'teste01@hotmail.com',
            password: 'secret',
        });

        const user02 = await fakeUsersRepository.create({
            name: 'teste 02',
            email: 'teste02@hotmail.com',
            password: 'secret',
        });

        const list = await listUser.execute();

        expect(list).toEqual([user00, user01, user02]);
    });

});
