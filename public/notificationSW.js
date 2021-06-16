const NotificationsEnums = {
  Event_Starting: 1,
  Bet_Placed: 2,
  Event_Ended: 3,
  Event_Result_Declared: 4,
  Challenge_Received: 5,
  Challenge_Accepted: 6,
  Dispute_Occured: 7,
  Claim_Username: 8,
  Challenge_Declined: 9
};

const ChallengesEnums = {
  Sent: 0,
  Received: 1,
  Accepted: 2,
  Completed: 3
};

const getTimeAndDateFromEpoch = (epoch) => {
  const date = new Date(epoch * 1000);
  return date.toLocaleString();
};

const generateNotificationMessage = (notificationInfo) => {
  switch (notificationInfo.type) {
    case NotificationsEnums.Event_Starting:
      return `A sub event of ${
        notificationInfo.payload.eventName
      } tournament is starting at ${getTimeAndDateFromEpoch(
        notificationInfo.payload.startTime
      )}`;
    case NotificationsEnums.Bet_Placed:
      return `$${notificationInfo.payload.betAmount} amount bet placed for ${
        notificationInfo.payload.eventName
      } and it is starting at ${getTimeAndDateFromEpoch(
        notificationInfo.payload.startTime
      )}`;
    case NotificationsEnums.Event_Ended:
      return `${
        notificationInfo.payload.isTournamentChildEvent
          ? `A sub event of ${notificationInfo.payload.eventName} tournament`
          : `${notificationInfo.payload.eventName}`
      } has ended at ${getTimeAndDateFromEpoch(
        notificationInfo.payload.endTime
      )}`;
    case NotificationsEnums.Event_Result_Declared:
      return `Result for ${
        notificationInfo.payload.isTournamentChildEvent
          ? `a sub event of ${notificationInfo.payload.eventName} tournament`
          : `${notificationInfo.payload.eventName}`
      } is declared.`;
    case NotificationsEnums.Challenge_Received:
      return `Challenge received from ${notificationInfo.payload.sender}.`;
    case NotificationsEnums.Challenge_Accepted:
      return `${notificationInfo.payload.sender} accepted your challenge.`;
    case NotificationsEnums.Dispute_Occured:
      return `Contrasting results have been submitted for ${
        notificationInfo.payload.isTournamentChildEvent
          ? `a sub event of ${notificationInfo.payload.eventName} tournament`
          : `${notificationInfo.payload.eventName}`
      }. Please submit evidence for your claim.`;
    case NotificationsEnums.Claim_Username:
      return `Your PSN username ${notificationInfo.payload.idOnNetwork} was successfully claimed by other user on Chain Games.`;
    case NotificationsEnums.Challenge_Declined:
      return `${notificationInfo.payload.sender} declined your challenge.`;
  }
};

const getPathToRoute = (notificationInfo) => {
  if (
    [
      NotificationsEnums.Event_Starting,
      NotificationsEnums.Bet_Placed,
      NotificationsEnums.Event_Ended,
      NotificationsEnums.Event_Result_Declared
    ].includes(notificationInfo.type)
  ) {
    return `/gameInformationPage/${notificationInfo.payload.eventID}`;
  } else if (notificationInfo.type === NotificationsEnums.Challenge_Received) {
    return `/myChallenges?tab=${ChallengesEnums.Received}`;
  } else if (notificationInfo.type === NotificationsEnums.Challenge_Accepted) {
    return `/myChallenges?tab=${ChallengesEnums.Accepted}`;
  } else if (notificationInfo.type === NotificationsEnums.Dispute_Occured) {
    return `/dispute/${notificationInfo.payload.eventID}`;
  } else if (notificationInfo.type === NotificationsEnums.Claim_Username) {
    return `/userAccountSetting`;
  } else if (notificationInfo.type === NotificationsEnums.Dispute_Occured) {
    return `/dispute/${notificationInfo.payload.eventID}`;
  } else if (notificationInfo.type === NotificationsEnums.Challenge_Declined) {
    return `/myChallenges`;
  }
};

self.addEventListener('push', (e) => {
  const { notification } = e.data.json();

  let body = generateNotificationMessage(notification);
  let url = getPathToRoute(notification);

  const notificationsOptions = {
    body: body,
    image:
      'https://battle.testnet.chaingames.io/_next/static/images/chain-logo-centered-full-f075062880df8785aef83632db9fefbf.png',
    icon: 'https://battle.chaingames.io/chaingames-logo.png',
    data: { url }
  };

  self.registration.showNotification('Chain Games', notificationsOptions);
});

self.addEventListener('notificationclick', function (event) {
  let url = event.notification.data.url;
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
