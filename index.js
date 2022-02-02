// [x]  initialize and configure Express app
// [x] initialize Templating library
// [x] creating home controller
// [x] bind routing
// [x] create layout
// create data service
// - [x] read all
// - [x] read one by Id
// - [x] create
// - [x] edit
// - [x] delete
// - [x] search
// - [ ] accessoory read
// - [ ] accessoory create
// - [ ] attach accessory
// [ ] implement controllers
// - [x] home (catalog)
// - [x] details
// - [x] about
// - [x] create
// - [x] improved home (search)
// - [x] edit
// - [x] delete
// - [ ] attach accessory to car
// - [ ] update details to include accessory
// [x] add front-end code
// [ ] add database  connection
// [ ] create Car model
// [ ] upgrade car service to use Car model
// [ ] Create Accessory model

const express = require('express');
const hbs = require('express-handlebars');

const initDb = require('./models/index');

const carsService = require('./services/cars');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const deleteCar = require('./controllers/delete');
const editCar = require('./controllers/edit');

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

  app.use(express.urlencoded({ extended: true }));
  app.use('/static', express.static('static'));
  app.use(carsService());

  app.get('/', home);
  app.get('/about', about);

  app.route('/create').get(create.get).post(create.post);

  app.get('/details/:id', details);

  app.route('/delete/:id').get(deleteCar.get).post(deleteCar.post);
  app.route('/edit/:id').get(editCar.get).post(editCar.post);

  app.all('*', notFound);

  app.listen(3000, () => console.log('Server started on port 3000!'));
}
