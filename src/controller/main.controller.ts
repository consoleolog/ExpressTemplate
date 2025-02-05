import {GetMapping} from "../decorator/method.decorator";
import Controller from "../decorator/controller.decorator";
import {Request, Response} from "express";

@Controller("/")
export class MainController {
    @GetMapping("/")
    public index(req: Request, res: Response) {
        res.json({
            msg: "Hello World",
        });
    }
}