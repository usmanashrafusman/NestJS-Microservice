import { HttpStatus } from "@nestjs/common"
import { IReponseMessage, IResponse, IResponseData } from "src/common/config"

type Messages = IReponseMessage[] | string

class SuccessfulResponse<T> implements IResponse<T> {
    data: IResponseData<T>
    success = true
    status = HttpStatus.OK
    messages: IReponseMessage[]

    constructor(data: IResponseData<T>, messages?: Messages) {
        this.data = data;
        this.messages = []
        if (typeof messages === "string") {
            const message: IReponseMessage = {
                code: 200,
                message: messages
            }
            this.messages.push(message);
        } else if (Array.isArray(messages)) {
            this.messages = messages
        }
    }

    toString() {
        const { data, success, status, messages } = this;
        return JSON.stringify({ data, success, status, messages })
    }
}

export default SuccessfulResponse;