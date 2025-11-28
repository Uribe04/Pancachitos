import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../config/supabaseClient'
import type { User } from '../../types/user'

// Login User
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', credentials.email)
        .eq('password', credentials.password)
        .single()

      if (error) {
        return rejectWithValue('Email o contraseña inválidos')
      }

      return data as User
    } catch (err) {
      return rejectWithValue('Error en login. Intenta nuevamente.')
    }
  }
)

// Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      // Verificar si el email ya existe
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', userData.email)
        .single()

      if (existingUser) {
        return rejectWithValue('El email ya está registrado')
      }

      // Crear nuevo usuario
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()

      if (error) {
        return rejectWithValue(error.message || 'Error en registro')
      }

      return data as User
    } catch (err) {
      return rejectWithValue('Error en registro. Intenta nuevamente.')
    }
  }
)

// Get User by ID
export const getUserById = createAsyncThunk(
  'auth/getUserById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        return rejectWithValue('Usuario no encontrado')
      }

      return data as User
    } catch (err) {
      return rejectWithValue('Error al obtener usuario')
    }
  }
)

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ userId, updates }: { userId: string; updates: Partial<User> }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        return rejectWithValue(error.message || 'Error al actualizar perfil')
      }

      return data as User
    } catch (err) {
      return rejectWithValue('Error al actualizar perfil')
    }
  }
)

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) {
    throw new Error(error.message)
  }
  return data.user
}