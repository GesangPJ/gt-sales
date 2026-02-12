// Fungsi untuk format tanggal dari ISO ke DD-MM-YYYY

export const formatTanggal = (isoString: string | Date | null): string => {
  if (!isoString) return '-'
  
  try {
    const date = typeof isoString === 'string' 
      ? new Date(isoString.replace(/\+00:00$/, ''))  // Clean timezone
      : isoString
    
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  } catch {
    return '-'
  }
}

export const formatTanggalJam = (isoString: string | Date | null): string => {
  if (!isoString) return '-'
  
  try {
    const date = typeof isoString === 'string' 
      ? new Date(isoString.replace(/\+00:00$/, ''))
      : isoString
    
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  } catch {
    return '-'
  }
}


