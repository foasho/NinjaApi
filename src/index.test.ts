import { ChatCompletionRequestMessage } from "openai";
import { NpcApi } from "./NPCApi";

jest.mock('axios');
import axios from 'axios';

describe('NpcApi', () => {
  it("NPCApi", async () => {
    const mockData = {
      role: "system",
      content: "テストです",
    };
    (axios.post as jest.Mock).mockResolvedValue({ data: mockData });

    const conversations: ChatCompletionRequestMessage[] = [
        {
          role: "user",
          content: "こんにちは",
        },
      ];

    const response = await NpcApi(conversations);

    // response.statusが200であることを確認
    expect(response.status).toEqual(200);
  });
});