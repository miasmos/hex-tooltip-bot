import Axios from "axios";
import { TWITCH_SECRET, TWITCH_CLIENT_ID } from "../constants";

interface BearerTokenResponse {
    accessToken: string;
}

class Twitch {
    static uri = "https://id.twitch.tv/oauth2";

    static async bearerToken(): Promise<BearerTokenResponse> {
        const response = await Axios.post(
            // eslint-disable-next-line max-len
            `${this.uri}/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_SECRET}&grant_type=client_credentials`
        );
        const data = await response.data();
        return { accessToken: data.access_token };
    }
}

export default Twitch;
