import colors from "colors";
import server from "./server";

// Define port, if the first one is not available, 4000 is used
const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(colors.cyan.bold(`REST API funcionando en el puerto ${port}`));
});
