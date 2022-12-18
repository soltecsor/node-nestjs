import { Notification } from "../entities/notification"
import { inMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notification-repository";
import { ReadNotification } from "./read-notifications";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "../../../test/factories/notification-factory";

const notifications: Notification[] = [];

const notificationsRepository = {
   async create(notification: Notification){
        notifications.push(notification)
    }
}

describe("read notifications", () => {

    it("should be able to read notifications", async () => {

        const notificationsRepository = new inMemoryNotificationsRepository();

        const readNotification = new ReadNotification(notificationsRepository);

        const notification = makeNotification();

        await notificationsRepository.create(notification);

        await readNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
    });

    it('should not to be able to read notification when it does not exist', async () => {

        const notificationsRepository = new inMemoryNotificationsRepository();

        const readNotification = new ReadNotification(notificationsRepository);

        expect(() => 
        {
            return  readNotification.execute({
            notificationId: 'fake=notification-id',
        });
     }).rejects.toThrow(NotificationNotFound)
    })

})