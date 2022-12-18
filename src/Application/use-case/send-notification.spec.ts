import { SendNotification } from "./send-notification"
import { Notification } from "../entities/notification"
import { inMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notification-repository";

const notifications: Notification[] = [];

const notificationsRepository = {
   async create(notification: Notification){
        notifications.push(notification)
    }
}

describe("Send notifications", () => {

    it("should be able to send notifications", async () => {
        const notificationsRepository = new inMemoryNotificationsRepository();
        const sendNotification = new SendNotification(notificationsRepository);
  
        const { notification } = await sendNotification.execute({
            content:"This is a notification",
            category: 'social',
            recipientId: 'example-recipient-id'
        });

        expect(notificationsRepository.notifications[0]).toEqual(notification);
    });

})