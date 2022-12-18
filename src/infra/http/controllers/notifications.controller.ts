import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-case/send-notification';
import { CreateNotificationBody } from '../../../controllers/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from 'src/Application/use-case/cancel-notification';
import { ReadNotification } from 'src/Application/use-case/read-notifications';
import { UnReadNotification } from 'src/Application/use-case/unread-notification';
import { CountRecipientNotifications } from 'src/Application/use-case/count-notifications';
import { GetRecipientNotifications } from 'src/Application/use-case/get-recipient-notifications';
 
@Controller('notifications')
export class NotificationsController {

  constructor(
    private sendNotification:SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private UnReadNotification: UnReadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications
  ) {}

  @Patch(':id/cancel')
  async cancel(
    @Param('id') id:string
    ) {

      await this.cancelNotification.execute({
        notificationId: id
      }); 
    }
  
  @Get('/count/from/:recipientId')  
  async countFromRecipient(
    @Param('recipientId') recipientId:string
  ) {

    const { count } = await this.countRecipientNotifications.execute({
      recipientId
    })

    return{
      count
    }
  }

  @Get('from/:recipientId')
  async getFromRecipient(
    @Param('recipientId') recipientId:string
  ) {

    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    })

    return{
      notifications:notifications.map(NotificationViewModel.toHttp)
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {

    await this.readNotification.execute({
      notificationId: id
    })
  
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {

    await this.UnReadNotification.execute({
      notificationId: id
    })
  
  }

  @Post()
  async create(@Body() body:CreateNotificationBody) {
    
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      recipientId,
      category
    })

    return { notification:NotificationViewModel.toHttp(notification)};
  }
}
