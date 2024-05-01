import app from "./app";
import config from "./config/config"

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});