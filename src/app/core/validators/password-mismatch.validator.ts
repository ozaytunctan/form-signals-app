import {customError, form, validate} from '@angular/forms/signals';
import {signal} from '@angular/core';

export const passwordMismatch = (password: any, confirmPassword: any) =>
  validate(confirmPassword, ({value, valueOf}) => {
    const pass = valueOf(password);
    const confirm = value();

    return pass && confirm && pass !== confirm
      ? customError({kind: 'passwordMismatch', message: 'Şifreler uyuşmuyor.'})
      : null;
  });


export interface User {
  password: string;
  confirmPassword: string;
}

const userModel = signal(
  {
    password: '',
    confirmPassword: '',
  }
)

const forms = form<User>(userModel, (path) => {
  passwordMismatch(path.password, path.confirmPassword);
})
