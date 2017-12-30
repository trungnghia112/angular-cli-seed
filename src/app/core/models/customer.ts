export class UserModel {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  sex: number;
  birthday: string;
  address: string;

  constructor(fields?: {
    id?: string,
    full_name?: string,
    email?: string,
    phone?: string,
    sex?: number,
    birthday?: string,
    address?: string
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
