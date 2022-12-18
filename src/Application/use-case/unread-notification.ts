import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface UnReadNotificationRequest {
    notificationId: string;
}

type UnReadNotificationResponse = void

@Injectable()
export class UnReadNotification {

    constructor(
        private notificationsRepository: NotificationsRepository
    ){}
    async execute(request: UnReadNotificationRequest): Promise <UnReadNotificationResponse>{
        const { notificationId }  = request;

        const notification = await this.notificationsRepository.findById(notificationId);

        if(!notification){
            throw new NotificationNotFound();
        }

        notification.read();

        await this.notificationsRepository.save(notification);

    }
}