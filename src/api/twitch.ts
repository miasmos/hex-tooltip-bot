import Axios from "axios";
import { TWITCH_SECRET, TWITCH_CLIENT_ID } from "../constants";
import Logger from "../logger";

interface BearerTokenResponse {
    accessToken: string;
}

class Twitch {
    static uri = "https://id.twitch.tv/oauth2";

    static async bearerToken(): Promise<BearerTokenResponse> {
        try {
            const response = await Axios.post(
                // eslint-disable-next-line max-len
                `${this.uri}/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_SECRET}&grant_type=client_credentials`
            );
            return { accessToken: response.data.access_token };
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }
}

export default Twitch;
