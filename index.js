// [x] initialize and configure Express app
// [x] initialize templating lib
// [x] create home controller
// [x] bind routing
// [x] create layout
// create data service
// - [x] read all
// - [x] read one by Id
// - [x] create
// - [x] search
// - [x] edit
// - [x] delete
// - [x] accessory read
// - [x] accessory create
// - [x] attach accessory
// - [ ] user service
// - [ ] register user
// - [ ] login user
// - [ ] logout user
// - [ ] add authorization checks to data modification
// implement controllers
// - [x] home (catalog)
// - [x] about
// - [x] details
// - [x] create
// - [x] improved home (search)
// - [x] edit
// - [x] delete
// - [x] create accessory
// - [x] attach accessory to car
// - [x] update details to include accessory
// - [ ] autho controller with login, register, logout actions
// - [ ] protect routes
// [x] add front-end code
// [x] add database connection
// [x] create Car model
// [x] upgrade car service to use Car model
// [x] add validation rules to Car model
// [x] create Accessory model
// [ ] add session middleware and auth libraries
// [ ] create User model
// [ ] add owner property to Car, Accessory models

const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');

const initDb = require('./models');

const carsService = require('./services/cars');
const accessoryService = require('./services/accessory');
const authService = require('./services/auth');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');

const create = require('./controllers/create');
const edit = require('./controllers/edit');
const deleteCar = require('./controllers/delete');
const accessory = require('./controllers/accessory');
const attach = require('./controllers/attach');
const {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  logoutGet,
} = require('./controllers/auth');

const { notFound } = require('./controllers/notFound');

start();

async function start() {
  await initDb();

  const app = express();

  app.engine(
    'hbs',
    hbs.create({
      extname: '.hbs',
    }).engine
  );
  app.set('view engine', 'hbs');

  app.use(
    session({
      secret: 'my super duper secret',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: 'auto' },
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use('/static', express.static('static'));
  app.use(carsService());
  app.use(accessoryService());
  app.use(authService());

  app.get('/', home);
  app.get('/about', about);
  app.get('/details/:id', details);

  app.route('/create').get(create.get).post(create.post);

  app.route('/delete/:id').get(deleteCar.get).post(deleteCar.post);

  app.route('/edit/:id').get(edit.get).post(edit.post);

  app.route('/accessory').get(accessory.get).post(accessory.post);

  app.route('/attach/:id').get(attach.get).post(attach.post);

   app.route('/register').get(registerGet).post(registerPost);

   app.route('/login').get(loginGet).post(loginPost);

  //  app.get('/logout', logout);

  app.all('*', notFound);

  app.listen(3000, () => console.log('Server started on port 3000'));
}
