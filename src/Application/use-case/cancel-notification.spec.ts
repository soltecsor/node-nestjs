import { Notification } from "../entities/notification"
import { inMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "../../../test/factories/notification-factory";

const notifications: Notification[] = [];

const notificationsRepository = {
   async create(notification: Notification){
        notifications.push(notification)
    }
}

describe("Cancel notifications", () => {

    it("should be able to cancel notifications", async () => {

        const notificationsRepository = new inMemoryNotificationsRepository();

        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = makeNotification();

        await notificationsRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    });

    it('should not to be able to cancel notification when it does not exist', async () => {

        const notificationsRepository = new inMemoryNotificationsRepository();

        const cancelNotification = new CancelNotification(notificationsRepository);

        expect(() => 
        {
            return  cancelNotification.execute({
            notificationId: 'fake=notification-id',
        });
     }).rejects.toThrow(NotificationNotFound)
    })

})