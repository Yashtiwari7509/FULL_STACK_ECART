import { Router, Request, Response, NextFunction } from 'express'
import { IUser, UserModel } from '../Models/user'
import bcrypt from 'bcrypt'
import { UserErorr } from '../erorrs'
import jwt from 'jsonwebtoken'
const router = Router()

router.post('/register', async (req: Request, res: Response) => {
    
    const { username, password } = req.body
    const user = await UserModel.find({ username }) ;
    
    try {
        if (user[0]?.username === username) {
            return res.status(400).json({ type: UserErorr.USERNAME_ALREADY_EXISTS })
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({ username, password: hashedPassword })
            await newUser.save()
            res.json({ message: 'user registered sucessfully' })
        }


    } catch (error) {
        res.status(500).json({ message: error })

    }
})
router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(username,password,'aagyaa');
    
    if(!username){
return ;
    }

    try {
        const user: IUser = await UserModel.findOne({ username })
        if (!user) {
            return res.status(400).json({ type: UserErorr.USER_NOT_FOUND });
        }
        //checking hashed password with the user password
        const isValidpassword = await bcrypt.compare(password, user.password);

        if (!isValidpassword) {
            return res.status(400).json({ type: UserErorr.WRONG_CREDENTIALS })
        }
        const token = jwt.sign({ id:user?._id }, "secret")
        res.json({ token, userId:user?._id })


    } catch (error) {
        res.status(500).json({ message: "error" })
    }

})
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        jwt.verify(authHeader, 'secret', (error: any) => {

            if (error) {
                return res.sendStatus(403)
            }

            next()
        })
    }
    else {
        return res.sendStatus(401)
    }
}
router.get('/avilable-money/:userId', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    const { userid } = req.params;
    try {
        const user = await UserModel.findOne({ userid })
        if (!user) {
            res.status(400).json({ type: UserErorr.USER_NOT_FOUND })
        }
        console.log(user.availableMoney);
        
        res.json({ availableMoney  : user.availableMoney})
    } catch (error) {
        res.status(404).json({ error })
    }
})

export { router as userRouter }