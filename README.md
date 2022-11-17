yarn の場合

$ cd ~/wrksp
$ git clone https://github.com/delicha/react-dnd-multiple-target.git
$ cd ~/wrksp/react-dnd-multiple-target
$ cat package.json | jq '."dependencies"|keys|join(" ")' -r | xargs yarn add
$ rm -rf package-lock.json
$ yarn start

npm の場合

$ cd ~/wrksp
$ git clone https://github.com/delicha/react-dnd-multiple-target.git
$ cd ~/wrksp/react-dnd-multiple-target
$ cat package.json | jq '."dependencies"|keys|join(" ")' -r | xargs npm install
$ rm -rf package-lock.json
$ npm run start
