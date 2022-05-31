import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import EmailRoute from './routes/email.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import DonateRoute from './routes/donate.route';
import BlogRoute from './routes/blog.route';
import PubMessageRoute from './routes/public-messages.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new EmailRoute(),
  new DonateRoute(),
  new BlogRoute(),
  new PubMessageRoute(),
]);

app.listen();
