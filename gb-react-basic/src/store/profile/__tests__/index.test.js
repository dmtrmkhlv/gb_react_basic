/**
 * Тест редьюсера
 */

import {initialState, profileReducer} from "../../profile/reducer";
import {
  changeProfileStatusAction,
  changeNameProfileAction,
  removeProfileAction
} from "../../profile/actions";

describe('profileReducer', () => {

  it('вызов редьюсера без экшена вернет initialState', () => {
    const result = profileReducer();

    expect(result).toEqual(initialState);
  });

  it('Профиль меняет статус', () => {
    const result = profileReducer(undefined, changeProfileStatusAction());

    expect(result).toEqual({
      name: "Profile #1",
      isShow: false
  });
  });

  it('Профиль удаляется', () => {
    const result = profileReducer(undefined, removeProfileAction());
    expect(result).toEqual({});
  });

  it('Профиль меняет имя', () => {
    const result = profileReducer(undefined, changeNameProfileAction('New Profile'));
    expect(result).toEqual({
      name: "New Profile",
      isShow: true
  });
  })

})