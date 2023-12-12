import { createAction, createReducer, on, props } from "@ngrx/store";



export const addFormAction = createAction("[Form] new", props<{ JsonData: any }>())
export const addResponseAction = createAction("[Res] new", props<{ formData: {} }>())




export const formReducer = createReducer(
  {
    JsonData: [],
    responses: [],
    counter: 0
  },
  on(addFormAction, (state: any, payload) => {

    return { ...state, JsonData: payload.JsonData }
  }),
  on(addResponseAction, (state: any, payload) => {
    const newData = [...state.responses, payload.formData]
    return { ...state, responses: newData }
  })
)
