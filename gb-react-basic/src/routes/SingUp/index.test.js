/**
 * Тест компонента-контейнера
 */

import React from 'react';
import {fireEvent, render, act} from '@testing-library/react';
import {SingUpTest} from "./SingUpTest.js";
import {userApi} from "../../services/request/user";
import {LoginFormTestIds} from "../Login/LoginTest";

jest.mock('../../services/request/user.js');


describe('SingUpTest', () => {

  it('корректная авторизация', () => {

    const login = 'test@test.ru';
    const password = 'test123';

    const component = render(<SingUpTest />)

    const loginField = component.queryByTestId(LoginFormTestIds.loginField)
    const passwordField = component.queryByTestId(LoginFormTestIds.passwordField)
    const submitButton = component.queryByTestId(LoginFormTestIds.submit)

    act(() => {
      fireEvent.change(loginField, {
        target: {
          value: login,
        }
      })
      fireEvent.change(passwordField, {
        target: {
          value: password,
        }
      })
    })

    act(() => {
      fireEvent.click(submitButton);
    })

    expect(userApi.login).toHaveBeenCalledWith(login, password);

  });

})