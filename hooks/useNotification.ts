import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const useNotification = {
  requestPermissions: async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  },

  scheduleDailyReminder: async (enabled: boolean, hour: number, minute: number) => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    if (!enabled) {
      console.log('Đã tắt nhắc nhở học tập.');
      return;
    }

    const hasPermission = await useNotification.requestPermissions();
    if (!hasPermission) {
      console.log('User chưa cấp quyền thông báo');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Time to study! 📚',
        body: 'Keep your streak alive. Spend a few minutes learning medical English today!',
        sound: true,
      },
      trigger: {
        hour: hour,
        minute: minute,
        repeats: true,
      } as Notifications.NotificationTriggerInput,
    });

    console.log(`Đã lên lịch nhắc nhở vào ${hour}:${minute} mỗi ngày.`);
  },
};
