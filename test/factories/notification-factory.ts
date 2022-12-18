import { Notification, NotificationProps } from "../../src/Application/entities/notification";
import { Content } from "../../src/Application/entities/content";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {} ) {
    return new Notification({ 
        category:'social',
        content: new Content('Nova solicitação de amizade'),
        recipientId:'recipient-2',
        ...override
    });
}