import { Notification } from "../entities/notification"
import { inMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notification-repository";
import { UnReadNotification } from "./unread-notification";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "../../../test/factories/notification-factory";

const notifications: Notification[] = [];

const notificationsRepository = {
   async create(notification: Notification){
        notifications.push(notification)
    }
}

describe("unread notifications", () => {

    it("should be able to unread notifications", async () => {

        const notificationsRepository = new inMemoryNotificationsRepository();

        const UnReadNotification = new UnReadNotification(notificationsRepository);

        const notification = makeNotification({
            readAt: new Date()
        });

        await notificationsRepository.create(notification);

        await UnReadNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].readAt).toBeNull();
    });

    it('should not to be able to unread notification when it does not exist', async () => {

        const notificationsRepository = new inMemoryNotificationsRepository();

        const UnReadNotification = new UnReadNotification(notificationsRepository);

        expect(() => 
        {
            return  UnReadNotification.execute({
            notificationId: 'fake=notification-id',
        });
     }).rejects.toThrow(NotificationNotFound)
    })

})