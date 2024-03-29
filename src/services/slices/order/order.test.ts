import { expect } from "@jest/globals";
import fetchMock from "fetch-mock";
import { AnyAction } from "redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { ThunkActionType } from "../../..";
import { BASE_URL } from "../../../utils/api-constants";

import orderReducer, {
  createOrder,
  createOrderFailed,
  createOrderPending,
  createOrderSuccess,
  getOrderByNumber,
  getOrderByNumberFailed,
  getOrderByNumberPending,
  getOrderByNumberSuccess,
  initialState,
} from "./order";
import { OrderState } from "./order";

const middlewares = [thunk];
const mockStore = configureMockStore<OrderState, ThunkActionType>(middlewares);

describe("Orders reducer", () => {
  afterEach(() => fetchMock.restore());

  it("Check initial state", () => {
    expect(orderReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("Create order success", () => {
    fetchMock.postOnce(`${BASE_URL}/orders`, {
      status: 200,
      order: { number: 123456 },
      success: true,
    });

    const expectedActions = [createOrderPending(), createOrderSuccess({ orderNumber: 123456 })];
    const store = mockStore(initialState);

    return store.dispatch(createOrder(["ing1", "ing2"]) as unknown as AnyAction).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(orderReducer(initialState, createOrderSuccess({ orderNumber: 123456 }))).toEqual({
        ...initialState,
        orderNumber: 123456,
        createOrderState: "success",
      });
    });
  });

  it("Create order failed", () => {
    fetchMock.postOnce(`${BASE_URL}/orders`, { status: 400, success: false });

    const expectedActions = [createOrderPending(), createOrderFailed()];
    const store = mockStore(initialState);

    return store.dispatch(createOrder(["ing1", "ing2"]) as unknown as AnyAction).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(orderReducer(initialState, createOrderFailed())).toEqual({
        ...initialState,
        createOrderState: "failed",
      });
    });
  });

  it("Get order by number success", () => {
    fetchMock.getOnce(`${BASE_URL}/orders/${123456}`, {
      status: 200,
      orders: [{ name: "order", number: 123456 }],
      success: true,
    });

    const expectedActions = [
      getOrderByNumberPending(),
      getOrderByNumberSuccess({ name: "order", number: 123456 }),
    ];
    const store = mockStore(initialState);

    return store.dispatch(getOrderByNumber(123456) as unknown as AnyAction).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(
        orderReducer(initialState, getOrderByNumberSuccess({ name: "order", number: 123456 }))
      ).toEqual({
        ...initialState,
        selectedOrder: { name: "order", number: 123456 },
        getOrderByNumberState: "success",
      });
    });
  });

  it("Get order by number failed", () => {
    fetchMock.getOnce(`${BASE_URL}/orders`, { status: 400, success: false });

    const expectedActions = [getOrderByNumberPending(), getOrderByNumberFailed()];
    const store = mockStore(initialState);

    return store.dispatch(getOrderByNumber(123456) as unknown as AnyAction).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(orderReducer(initialState, getOrderByNumberFailed())).toEqual({
        ...initialState,
        getOrderByNumberState: "failed",
      });
    });
  });
});
