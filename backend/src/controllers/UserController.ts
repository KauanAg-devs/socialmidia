//libraries
import express from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//components
import { userModel } from "../schemas/User";
import { Document } from 'mongoose';
const jwtSecretKey = process.env.JWTSECRETKEY as string

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


class UserController {
  constructor() { }

  public async signinHandler(req: express.Request, res: express.Response) {
    const { name, password, email } = req.body

    if (!name || !email || !password)
      return res.status(403).json({ msg: `credentials required` });

    const doesUserExists = await userModel.findOne({ name, password, email })

    if (doesUserExists)
      return res.status(401).json({ msg: `this user exists` });

    const hashedPassword = await bcrypt.hash(password, 10)

    const createdUser = await userModel.create({
      name,
      password: hashedPassword,
      email
    })

    const token = jwt.sign({ _id: createdUser.id }, jwtSecretKey)
    res.status(201).json({ msg: token })
  }

  public async loginHandler(req: express.Request, res: express.Response) {
    const { name, password, email } = req.body
    if (!(name || email) || !password) return res.status(403).json({ msg: `credentials required` });

    const foundUser = await userModel.find({ $or: [{ name }, { email }] });
    if (foundUser.length === 0) return res.status(401).json({ msg: `this user doesn't exist` });

    let isPasswordCorrect = false;
    let correctUser: Document<any, any> | undefined;

    for (const user of foundUser) {
      isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        correctUser = user;
        break;
      }
    }

    if (!isPasswordCorrect) return res.status(401).json({ msg: `wrong password` });

    const token = jwt.sign({ _id: correctUser?._id }, jwtSecretKey);
    res.status(200).json({ msg: token })
  }

  public async deleteHandler(req: express.Request, res: express.Response) {
    const foundUser = await userModel.findByIdAndDelete(req.user._id)
    res.status(200).json({ msg: `user ${foundUser?.name} deleted` })
  }

  public async updateHandler(req: express.Request, res: express.Response) {
    const { name, password, email } = req.body
    console.log(req.user._id);

    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, { name, password, email }, { new: true })
    res.status(200).json({ msg: `user ${updatedUser?.name} updated` })
  }
}
export default new UserController();
