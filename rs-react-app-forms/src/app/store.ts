import { configureStore } from '@reduxjs/toolkit'
import controlledFormReducer from './slices/controlledFormSlice'
// ...

export const store = configureStore({
  reducer: {
    controlledForm: controlledFormReducer,
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store