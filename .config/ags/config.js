import { Bar } from "./modules/bar/main.js";
import { applauncher } from "./modules/applauncher/main.js";
import { Quicksettings } from "./modules/quicksettings/main.js";
import { Powermenu } from "./modules/powermenu/powermenu.ts";
import { Datemenu } from "./modules/datemenu/main.ts";
import { Theme } from "./modules/theme/main.ts";

const inputFile = "./scss/main.scss";
const outputFile = "./scss/style.css";

function Loader() {
  Utils.exec('bash -c "rm ${AGS_CONFIG_DIR}/scss/style.css"');

  Utils.exec(
    'bash -c "sassc ${AGS_CONFIG_DIR}/scss/main.scss ${AGS_CONFIG_DIR}/scss/style.css"',
  );

  App.config({
    style: "./scss/style.css",
    windows: [
      Quicksettings(),
      Powermenu(),
      Datemenu(),
      Bar(),
      applauncher,
      Theme(),
    ],
  });
}

Loader();

/*	Utils.execAsync(['bash', '-c', 'rm ${AGS_CONFIG_DIR}/scss/style.css'])
        .then(out => print(out))
        .catch(err => print(err));


    Utils.execAsync(['bash', '-c', 'sassc ${AGS_CONFIG_DIR}/scss/main.scss ${AGS_CONFIG_DIR}/scss/style.css'])
        .then(out => print(out))
        .catch(err => print(err)); */
