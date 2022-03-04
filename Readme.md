
# Prime number checker app

- Made usign node.js/express backend and React frontend
- 2 endpoint in backend: \
 /api/sumandcheck accepts query: ?numbers= 1-n integers separated with comma \
/api/checkprime accepts query: ?number= integer
- Endpoint responds with html status 200 or 400(if query misformatted) and JSON body
- Frontend input accepts numbers or numbers separated with comma. \
Misformatted input are not sent to backend, and presents error message for user
- Api calls are delayed 500ms after user stops typing to prevent excessive api calls

### Usage

- Live runnig in heroku at: [primenumbercheck.herokuapp.com](https://primenumbercheck.herokuapp.com/)
- To run locally: clone repository, npm install, cd frontend ,npm install
- Run tests (backend only): `npm run test`
- Run locally (react live develepoment): \
start backend with: `PORT=3005 npm start` \
start frontend with: `cd frontend && REACT_APP_BACKEND=http://localhost:3005 npm start`
- (use port 3005 on backend etc to prevent port collision with react-app)
- Run tests (backend only): `npm run test`
- Make frontend production build: `npm run buildfront`
- Deploy to heroku: `git push heroku main` \
(obviously all changes must be commited and heroku configured etc before this)
