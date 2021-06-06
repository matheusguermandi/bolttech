export default interface IUserDTO {
  id?: string;
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
}
