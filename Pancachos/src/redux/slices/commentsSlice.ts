import { createSlice } from '@reduxjs/toolkit'
import { fetchProductComments, createComment, deleteComment, updateComment } from '../thunks/commentsThunks'

interface Comment {
  id: string
  product_id: string
  user_id: string
  content: string
  rating: number
  created_at: string
}

interface CommentsState {
  comments: Comment[]
  loading: boolean
  error: string | null
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch comments
    builder
      .addCase(fetchProductComments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductComments.fulfilled, (state, action) => {
        state.loading = false
        state.comments = action.payload
      })
      .addCase(fetchProductComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Create comment
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false
        state.comments.unshift(action.payload)
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Delete comment
    builder
      .addCase(deleteComment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false
        state.comments = state.comments.filter((c) => c.id !== action.payload)
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Update comment
    builder
      .addCase(updateComment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false
        const index = state.comments.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.comments[index] = action.payload
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearComments } = commentsSlice.actions
export default commentsSlice.reducer
