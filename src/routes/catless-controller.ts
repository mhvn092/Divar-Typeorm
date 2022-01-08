import express from "express";
import got from 'got';
import { AdEntity } from "../entities/ad";
import { CategoryEntity } from "../entities/category";
import { AdService } from "../services/ad-service";
import { CategoryService } from "../services/category-service";

const router = express.Router();
router.use(express.json());

const adservice = new AdService();
const categoryservice = new CategoryService();

router.get("/", async (req, res) => {
    try {
        const response = await got(`https://api.divar.ir/v8/web-search/mashhad/`);
        const json = JSON.parse(response.body);
        var main = json.schema.ui_schema.category.urischema.display;
        var main2 = Object.keys(main);
        res.send("<b>Please Choose Your Category and enter in the url</b><br>" + main2);
    } catch (error) {
        console.log(error);
    }
});


router.get("/:name", async (req, res) => {
    try {
        const name1 = req.params.name;
        const response = await got(`https://api.divar.ir/v8/web-search/mashhad/${name1}/`);
        if (!response) {
            res.status(404).send('no such product');
        } else {
            setInterval(async () => {
                const cat = new CategoryEntity();
                cat.name = name1;
                await categoryservice.insert(cat);
                const json = JSON.parse(response.body);
                json.widget_list.forEach(async (item: { data: { title: any }; }) => {
                    const ad = new AdEntity();
                    ad.title = item.data.title;
                    await adservice.insert(ad);
                    return res.json(ad);
                }, 10000);
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/:name/:id", async (req, res) => {
    const ad= await adservice.find(parseInt(req.params.id))
    res.json(ad);
});

router.delete("/:name/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const ad = await adservice.find(parseInt(id));
      if (!ad) {
        return res.status(404).send("ad not found");
      }
      await adservice.delete(parseInt(id));
      return res.json(ad);
    } catch (e) {
      return res.status(500).send(`Error: ${e}`);
    }
  });


export {router as CatlessController};

