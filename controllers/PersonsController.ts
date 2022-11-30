import Person from "../models/Person.js";
import dotenv from "dotenv";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
dotenv.config();

const createPerson = async (req: Request, res: Response) => {
  const { name } = req.body;
  const findName = await Person.findOne({ name });
  if (!findName) {
    const resGender = await axios(`${process.env.GENDER_API}${name}`).catch(
      (err) => console.log(err)
    );
    const resNation = await axios(`${process.env.NATION_API}${name}`).catch(
      (err) => console.log(err)
    );
    if (resGender && resNation) {
      //gender
      let { gender, probability: genderProbability } = resGender.data;
      if (gender == null) gender = "Unknown";

      //nation
      const dataNation = resNation.data.country;
      let nationality = "NotFound";
      let nationalityProbability = "0";
      if (dataNation.length !== 0) {
        const max = Math.max(...dataNation.map((o: any) => o.probability));
        const { country_id, probability } = dataNation.find(
          (o: any) => o.probability == max
        );
        nationality = country_id;
        nationalityProbability = probability;
      }
      const person = await Person.create({
        name,
        gender,
        genderProbability,
        nationality,
        nationalityProbability,
      });
      res.status(StatusCodes.OK).json({ person });
    }
  }
};
const getPersons = async (req: Request, res: Response) => {
  const allPersons = await Person.find({});
  res.status(StatusCodes.CREATED).json({ allPersons });
};

export { createPerson, getPersons };
