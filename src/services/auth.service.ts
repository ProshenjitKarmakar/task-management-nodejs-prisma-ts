import bcrypt from 'bcrypt';
import { Request } from "express";
import httpStatus from "http-status";
import Stripe from 'stripe';
import { AuthDao } from "./../dao/implementations/AuthDao.ts";
import responseHandler from "./../helpers/responseHandler.ts";
import { IGenerateTokenPayload } from "./../interfaces/auth.interface.ts";
import { TokenService } from "./token.service.ts";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20',
});

export class AuthService {
    private authDao: AuthDao;
    private tokenService: TokenService;

    constructor() {
        this.authDao = new AuthDao();
        this.tokenService = new TokenService();
    }

    registration = async (req: Request) => {
        try {
            const message = "User created successfully!";
            let data = { ...req.body };
            const where = {
                email: data.email
            }
            const uniqueEmail = await this.authDao.findOneByWhere(where)

            if (uniqueEmail) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Email Already Exists!');
            }

            let hashPassword = await bcrypt.hashSync(data.password, 10);

            data = {
                ...data,
                password: hashPassword
            }

            const response = await this.authDao.create(data);

            if (response) {
                const payload = {
                    name: response.name,
                    email: response.email,
                }
                return responseHandler.returnSuccess(httpStatus.OK, message, payload)
            }

            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Registration Failed!');

        } catch (e) {
            console.log("==Error==", e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!');
        }
    }

    login = async (req: Request) => {
        try {
            const { email, password } = req.body;
            const message = 'User Login Successfully!';
            const where = {
                email
            }
            const user = await this.authDao.findOneByWhere(where)
            if (!user) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'User not found!')
            }
            const passwordMatched = bcrypt.compareSync(password, user?.password as string)

            if (!passwordMatched) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Password didn\'t matched!')
            }

            let payload: IGenerateTokenPayload = {
                id: user.id,
                name: user.name,
                email: user.email,
            }

            const accessToken = await this.tokenService.generateToken(payload);

            if (accessToken) {
                payload = {
                    ...payload,
                    accessToken
                }

                return responseHandler.returnSuccess(httpStatus.OK, message, payload)
            }
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Token Generate Failed!')
        } catch (e) {
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!')
            console.log("====Error=====", e);
        }
    }

    loginWithGoogle = async (req: Request) => {

    }

    findAllUser = async (req: Request) => {
        try {
            const message = "User List Fetched Successfully!";

            const response = await this.authDao.findAll();
            return responseHandler.returnSuccess(httpStatus.OK, message, response)
        } catch (e) {
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!');
        }
    }

    userUpdate = async (req: Request) => {
        try {
            const message = 'User Updated Successfully!';
            const { name, email, password, id } = req.body;
            const data = {
                name,
                email,
                password
            }

            const response = await this.authDao.updateById(data, id);
            if (response) {
                return responseHandler.returnSuccess(httpStatus.OK, message, req.body);
            } else {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'User update failed!');
            }
        } catch (e) {
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!');
        }
    }

    stripePayment = async (req: Request) => {
        try {
            const { product_name, price, quantity, success_url, cancel_url } = req.body;
            const message = 'Stripe Payment URL created successfully!'
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: product_name,
                            },
                            unit_amount: price * 100, // Amount in cents
                        },
                        quantity: quantity,
                    },
                ],
                mode: 'payment',
                success_url: success_url,
                cancel_url: cancel_url,
            });

            if (session) {
                const payload = {
                    payment_url: session.url
                }
                return responseHandler.returnSuccess(httpStatus.OK, message, payload);
            }
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Stripe Payment URL generated failed!');
        } catch (e) {
            console.log("=====Error====", e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!');
        }
    }
}