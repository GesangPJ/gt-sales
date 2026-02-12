// Base URL agar tidak terkena error ORIGIN

export const baseUrl = typeof window !== 'undefined'
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_BASE_URL