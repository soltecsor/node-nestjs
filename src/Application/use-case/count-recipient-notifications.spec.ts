import { inMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notification-repository";
import { CountRecipientNotifications } from "./count-notifications";
import { makeNotification } from "../../../test/factories/notification-factory";


describe("Count recipients notifications", () => {

    it("should be able to count recipient notifications", async () => {

        const notificationsRepository = new inMemoryNotificationsRepository();

        const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository);


        await notificationsRepository.create(makeNotification({recipientId:'recipient-1'}));

     
        await notificationsRepository.create(makeNotification({recipientId:'recipient-1'}));
        

        await notificationsRepository.create(makeNotification({recipientId:'recipient-2'}));

        
       const { count } = await countRecipientNotifications.execute({
            recipientId: 'recipient-1'
        });

        expect(count).toEqual(2);
    });


})