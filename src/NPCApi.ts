import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from "openai";

interface IConversation {
  role: "system" | "user" | "assistant";
  content: string;
}

interface IConversationResponse {
  data: IConversation;
  status: number;
  message: string;
}

type NpcApiProps = {
  conversations: ChatCompletionRequestMessage[];
  OPENAI_API_KEY?: string;
  maxTokens?: number;
};
export const NpcApi = async (
  conversations: ChatCompletionRequestMessage[],
  OPENAI_API_KEY = undefined,
  maxTokens = 150,
): Promise<IConversationResponse> => {
  const key = OPENAI_API_KEY || process.env.OPENAI_API_KEY || process.env.REACT_APP_OPENAI_API_KEY;
 if (!key) {
    return {
      data: {
        role: "system",
        content: "",
      },
      status: 405,
      message: "API key is not available",
    };
  }
  const configuration = new Configuration({
    apiKey: key,
  });
  const openai = new OpenAIApi(configuration);
  let completion = "";
  try {
    const messages = conversations.map((prevMessage) => ({
      role: prevMessage.role,
      content: prevMessage.content,
    }));
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: maxTokens,
    });
    if (response.data.choices && response.data.choices.length > 0) {
      if (response.data.choices[0]["message"]) {
         const mes = response.data.choices[0]["message"];
         if (mes.content){
            completion = mes.content.trim();
         }
      }
    }
  }
  catch (error) {
    return {
      data: {
        role: "system",
        content: "",
      },
      status: 500,
      message: "Error fetching data",
    };
  }
  return {
    data: {
      role: "assistant",
      content: completion,
    },
    status: 200,
    message: "success",
  };
};