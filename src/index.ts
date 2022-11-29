if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import mongoose from 'mongoose';
import { PORT, USER_NAME, PASSWORD, CLUSTER_INFO } from './constants';
import * as serverService from './services/server.service';

(async () => {
  try {
    await mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@${CLUSTER_INFO}.mongodb.net/managerApp`)
                  .then(() => console.log('Connected to DB'))
                  .catch((error) => console.error(error));
    serverService.server.listen(process.env.PORT || PORT, () => {
      console.log('Server is listening on PORT ', process.env.PORT || PORT);
    });
  } catch (error) {
    console.log(error);
  }
})();


process.on('SIGINT', async () => {
  await mongoose.disconnect();
  process.exit();
});
