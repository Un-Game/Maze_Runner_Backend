import { Lobby } from "../models/lobby.model";

export const generateUniqueJoinCode = async (): Promise<string> => {
    let code: string = "";
    let exists = true;

    while (exists) {
        code = Math.floor(100000 + Math.random() * 900000).toString();
        exists = (await Lobby.exists({ joinCode: code })) !== null;
    }

    return code;
};
