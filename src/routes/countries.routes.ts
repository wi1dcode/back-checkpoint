import { Router, Request, Response } from "express";
import CountryServices from "../services/countries.services";

const router = Router();

router.post("/create", async (req: Request, res: Response) => {
  const { code, name, emoji } = req.body;

  try {
    const country = await new CountryServices().create({ code, name, emoji });
    res.send(country);
  } catch (err: any) {
    res.status(400).send({ message: err.message, success: false });
  }
});

router.get("/list", async (req: Request, res: Response) => {
  const countries = await new CountryServices().list();
  res.send(countries);
});

router.get("/find/:code", async (req: Request, res: Response) => {
  const code = req.params.code;
  try {
    const country = await new CountryServices().find(code);
    res.send(country);
  } catch (err: any) {
    res.status(404).send({ message: err.message, success: false });
  }
});

router.patch("/update/:code", async (req: Request, res: Response) => {
  const code = req.params.code;
  const data = req.body;
  try {
    const country = await new CountryServices().update(code, data);
    res.send(country);
  } catch (err: any) {
    res.status(400).send({ message: err.message, success: false });
  }
});

router.delete("/delete/:code", async (req: Request, res: Response) => {
  const code = req.params.code;
  try {
    await new CountryServices().delete(code);
    res.send({ success: true });
  } catch (err: any) {
    res.status(404).send({ message: err.message, success: false });
  }
});

export default router;
