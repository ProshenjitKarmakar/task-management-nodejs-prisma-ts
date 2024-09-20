import { Router } from 'express';
import testRoutes from './testRoutes';
import quoteRoutes from './quoteRoutes';
const router = Router();
const defaultRoutes = [
    {
        path: '/test',
        route: testRoutes
    },
    {
        path: '/quote',
        route: quoteRoutes
    },
];
defaultRoutes.forEach((item) => {
    router.use(item.path, item.route);
});
export default router;
