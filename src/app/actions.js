'use server'
 
import { cookies } from 'next/headers'
 

export default async function setCookies(token, tokenExpires){
  cookies().set('token', token)
  cookies().set('tokenExpires', tokenExpires)
}