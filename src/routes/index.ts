import { Router } from 'express';
import testRoutes from './testRoutes.ts';
import quoteRoutes from './quoteRoutes.ts';
import userRouter from './users.routes.ts';
import authRoutes from './auth.routes.ts';
import taskRoutes from './taskRoutes.ts';



const router = Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/task',
        route: taskRoutes
    },
    {
        path: '/test',
        route: testRoutes
    },
    {
        path: '/users',
        route: userRouter
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