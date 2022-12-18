import { Module } from "@nestjs/common";
import { SendNotification } from "@application/use-case/send-notification";
import { CancelNotification } from "src/Application/use-case/cancel-notification";
import { ReadNotification } from "src/Application/use-case/read-notifications";
import { UnReadNotification } from "src/Application/use-case/unread-notification";
import { GetRecipientNotifications } from "src/Application/use-case/get-recipient-notifications";
import { CountRecipientNotifications } from "src/Application/use-case/count-notifications";
import { NotificationsController } from "@infra/http/controllers/notifications.controller";
import { DatabaseModule } from "../database/database.module";

@Module({
    imports:[ DatabaseModule ],
    controllers:[
        NotificationsController
    ],
    providers:[
        SendNotification,
        CancelNotification,
        ReadNotification,
        UnReadNotification,
        GetRecipientNotifications,
        CountRecipientNotifications
    ]
})

export class HttpModule {}