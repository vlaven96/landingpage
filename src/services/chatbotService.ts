// Types for API requests and responses
interface QuestionRequest {
  question: string;
}

interface ChatResponse {
  answer: string;
  page_name?: string;
  // Add any other properties your backend returns
  // For example:
  // unlockPage?: string;
  // dynamicPage?: {
  //   id: string;
  //   title: string;
  //   content: string;
  // };
}

// Use consistent API URL with fallback
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Send a question to the chatbot API and get a response
 * @param question The user's question text
 * @returns Promise with the chatbot's response
 */
export const askChatbot = async (question: string): Promise<ChatResponse> => {
  try {
    const response = await fetch(`${API_URL}/ask/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question } as QuestionRequest),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error calling chatbot API:", error);
    throw error;
  }
};

// Add more functions as needed, e.g.:
export const getChatHistory = async (): Promise<any> => {
  // Implementation for fetching chat history
};

// Default export for the whole service
const chatbotService = {
  askChatbot,
  getChatHistory,
};

export default chatbotService;
