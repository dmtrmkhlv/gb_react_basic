/**
 * Тест презентационного компонента
 */
import React from 'react'
import {render, fireEvent, act} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {LoginTest, LoginFormTestIds} from "./LoginTest";

describe('Login', () => {

  it('вызов метода onSubmit по клику на кнопки', () => {
    const onSubmit = jest.fn();
    const component = render(<LoginTest onSubmit={onSubmit}/>)

    act(() => {
      fireEvent.click(component.queryByTestId(LoginFormTestIds.submit));
    })

    expect(onSubmit).toBeCalled();
  });

  it('ввод данных в поле Login', () => {
    const loginValue = 'auth';
    const setFieldValue = jest.fn();
    const component = render(<LoginTest setFieldValue={setFieldValue}/>)

    const loginField = component.queryByTestId(LoginFormTestIds.loginField);

    act(() => {
      fireEvent.change(loginField, {
        target: {
          value: loginValue,
        }
      })
    })

    expect(setFieldValue).toHaveBeenCalledWith('login', loginValue);
  })

})