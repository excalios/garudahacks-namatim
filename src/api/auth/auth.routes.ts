import User from 'api/users/users.model';
import { NextFunction, Request, Response, Router } from 'express';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'lib/jwt';
import Disability from 'api/disabilities/disabilities.model';

const router: Router = Router();

// Signup Validation
const signupSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8).required('Password is required'),
    birth_date: yup.date().required(),
    id_card_number: yup.string().matches(/[0-9]/).required('NIK is required'),
    last_job: yup.string().required('Last Job is required'),
    last_salary: yup.string().required('Last Salary is required'),
    province_id: yup.string().uuid().required('Province is required'),
    disabilities: yup.array().of(
        yup.object().shape({
            id: yup.string().uuid(),
            name: yup.string().required(),
        })
    ),
    regency_id: yup.string().uuid().required('Regency is required'),
    district_id: yup.string().uuid().required('District is required'),
    subdistrict_id: yup.string().uuid().required('Sub District is required'),
});

router.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            signupSchema
                .validate(req.body, {
                    abortEarly: false,
                })
                .catch(err => {
                    res.status(401);
                    throw err;
                });

            const isUserExist: User | undefined = await User.query()
                .where({
                    email: req.body.email,
                })
                .orWhere({
                    id_card_number: req.body.id_card_number,
                })
                .first();

            if (isUserExist) {
                const err: Error = new Error('Account already exist');
                res.status(400);
                throw err;
            }

            const hashedPassword: string = await bcrypt.hash(
                req.body.password,
                12
            );

            const signedUpUser: User = await User.query().insert({
                ...req.body,
                password: hashedPassword,
            });

            // Relate the user disabiities
            // Or
            // Create a disabilities if it doesn't exist
            req.body.disabilities.map(async (disability: Disability) => {
                if (disability.id) {
                    const selectedDisability: Disability | undefined =
                        await Disability.query().findById(disability.id);
                    if (selectedDisability)
                        await signedUpUser
                            .$relatedQuery('disabilities')
                            .relate(selectedDisability);
                } else {
                    let selectedDisability: Disability | undefined =
                        await Disability.query()
                            .where('name', disability.name)
                            .first();
                    if (!selectedDisability) {
                        selectedDisability = await Disability.query().insert(
                            disability
                        );
                    }
                    await signedUpUser
                        .$relatedQuery('disabilities')
                        .relate(selectedDisability);
                }
            });

            delete signedUpUser.password;

            const payload: string = await jwt({
                id: signedUpUser.id,
                name: signedUpUser.name,
                email: signedUpUser.email,
            });

            res.status(200).json({
                user: {
                    id: signedUpUser.id,
                    name: signedUpUser.name,
                    email: signedUpUser.email,
                },
                payload,
            });
        } catch (err) {
            next(err);
        }
    }
);

export default router;
