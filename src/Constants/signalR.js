import {store} from '../../Store/store';
import {createConnectionSignalR, newMessageAction} from '../../Store/Action';

const {
  HubConnectionBuilder,
  HttpTransportType,
  LogLevel,
} = require('@microsoft/signalr');

export const hubConnectionBuilder = Id => {
  console.log('user id', Id);
  let connection = new HubConnectionBuilder()
    .withUrl(`https://vinvi.dsmeglobal.com/chatHub`, {
      accessTokenFactory: () => {
        return Id.toString();
      },
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    .configureLogging(LogLevel.Debug)
    .build();
  connection.serverTimeoutInMilliseconds = 6000000;
  connection.keepAliveIntervalInMilliseconds = 3000000;
  console.log('connection', connection);
  debugger;

  startConnection(connection);
  connection.onclose(async () => {
    console.error('Something went wrong:');
    store.dispatch(createConnectionSignalR(null));
    startConnection(connection);
  });
};

export const startConnection = connection => {
  connection
    .start()
    .then(() => {
      store.dispatch(createConnectionSignalR(connection));
      newMessageReceiver(connection);
    })
    .catch(err => {
      console.log('connection.start error', err);
      setTimeout(() => {
        startConnection(connection);
      }, 2000);
    });
};

export const newMessageReceiver = connection => {
  debugger;
  connection.on('ReceiveMessage', messageData => {
    console.log('messageData', messageData);
    store.dispatch(newMessageAction(messageData));
  });
};
