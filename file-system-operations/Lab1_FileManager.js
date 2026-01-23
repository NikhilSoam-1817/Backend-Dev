
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log("\n1.Read 2.Write 3.Copy 4.Delete 5.List 6.Exit");
  rl.question("Choose option: ", async (choice) => {
    try {
      if (choice === '6') return rl.close();

      rl.question("Enter path/source: ", async (p1) => {
        p1 = path.resolve(p1);

        switch (choice) {
          case '1':
            const rs = fs.createReadStream(p1, { encoding: 'utf8' });
            rs.on('data', chunk => process.stdout.write(chunk));
            break;

          case '2':
            rl.question("Enter text: ", async (text) => {
              await fs.promises.appendFile(p1, text + "\n", 'utf8');
              menu();
            });
            return;

          case '3':
            rl.question("Enter destination: ", async (p2) => {
              p2 = path.resolve(p2);
              fs.createReadStream(p1).pipe(fs.createWriteStream(p2));
              menu();
            });
            return;

          case '4':
            await fs.promises.unlink(p1);
            break;

          case '5':
            const files = await fs.promises.readdir(p1);
            files.forEach(f => console.log(f));
            break;
        }
      });
    } catch (err) {
      console.error("Error:", err.message);
      menu();
    }
  });
}

menu();
