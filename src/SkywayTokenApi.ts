import { nowInSec, SkyWayAuthToken, uuidV4 } from "@skyway-sdk/token";

interface SkywayTokenApiResponseProps {
  data: string | null;
  status: number;
  message: string;
}

export const SkywayTokenApi = async (
  appIdToken: string|undefined = undefined, 
  appSecretKey: string|undefined = undefined
): Promise<SkywayTokenApiResponseProps> => {
  const _id = appIdToken || process.env.SKYWAY_APP_ID || process.env.REACT_APP_SKYWAY_APP_ID;
  const _key = appSecretKey || process.env.SKYWAY_APP_SECRET_KEY || process.env.REACT_APP_SKYWAY_APP_SECRET_KEY; 
  let token = "";
  try {
    token = new SkyWayAuthToken({
      jti: uuidV4(),
      iat: nowInSec(),
      exp: nowInSec() + 3600 * 24,
      scope: {
        app: {
          id: _id as string,
          turn: true,
          actions: ["read"],
          channels: [
            {
              id: "*",
              name: "*",
              actions: ["write"],
              members: [
                {
                  id: "*",
                  name: "*",
                  actions: ["write"],
                  publication: {
                    actions: ["write"],
                  },
                  subscription: {
                    actions: ["write"],
                  },
                },
              ],
              sfuBots: [
                {
                  actions: ["write"],
                  forwardings: [
                    {
                      actions: ["write"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    }).encode(_key as string);
  } catch (e: any) {
    return {
      data: null,
      status: 500,
      message: e.message,
    };
  }
  return {
    data: token,
    status: 200,
    message: "success",
  };
}
