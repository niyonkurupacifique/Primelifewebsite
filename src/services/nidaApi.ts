// NIDA API service for national ID verification
export interface NidaResponse {
  foreName: string;
  surnames: string;
  dateofbirth: string;
  // Add other fields as needed
}

// Helper function to format date for HTML date input (YYYY-MM-DD)
export const formatDateForInput = (dateString: string): string => {
  try {
    // If the date is already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    // Try to parse the date and format it
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    
    // Format as YYYY-MM-DD for HTML date input
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const searchSubscriber = async (nationalId: string): Promise<NidaResponse | null> => {
  try {
    // Replace this URL with your actual NIDA API endpoint
    const response = await fetch(`https://apps.prime.rw/customerbackend/User/api/CheckNationalId`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ NationalId: nationalId }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('NIDA API error:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error calling NIDA API:', error);
    return null;
  }
};

// Helper function to determine gender from national ID
export const getGenderFromNationalId = (nationalId: string): string => {
  const genderDigit = nationalId.replace(/\D/g, '')[5];
  if (genderDigit === '8') {
    return 'Male';
  } else if (genderDigit === '7') {
    return 'Female';
  }
  return '';
};
