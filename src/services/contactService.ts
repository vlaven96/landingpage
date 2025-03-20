// Use consistent API URL with fallback
const API_URL = import.meta.env.VITE_API_URL || "https://api.example.com";

/**
 * Interface for contact form data
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Interface for contact form response
 */
export interface ContactResponse {
  success: boolean;
  message: string;
}

/**
 * Send contact form data to the backend
 * @param formData The contact form data
 * @returns Response with success status and message
 */
export const submitContactForm = async (
  formData: ContactFormData
): Promise<ContactResponse> => {
  console.log("Submitting form data:", formData);
  console.log("Using API URL:", API_URL);

  try {
    // For testing/demo purposes, we'll just return a successful response
    // In production, uncomment the actual API call below and comment out the mock code

    // Simulate API delay for more realistic behavior
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return a mock successful response
    // return {
    //   success: true,
    //   message: "Message sent successfully",
    // };


    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData),
      mode: 'cors' // Ensure CORS is handled properly
    });

    console.log('Server response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Error ${response.status}: ${response.statusText || errorText}`);
    }

    const data = await response.json();
    console.log('Server response data:', data);
    return {
        success: true,
        message: "Message sent successfully",
    }
    
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
