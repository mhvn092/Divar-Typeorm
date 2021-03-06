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
        const response = await got(`https://api.divar.ir/v8/web-search/mashhad/${req.params.name}`);
        if (!response) {
            res.status(404).send('no such category');
        } else {
            const json = JSON.parse(response.body);
            var main = json.schema.json_schema.properties;
            if (main.brand_model) {
                const main2 = main.brand_model.properties.value.items.enum;
                res.send("<b>Please Choose Your Specific Brand and eneter in the url</b><br>" + main2);
            } else {
                res.send("<b>Your Chooosen Category Does Not Have Specific models, for a Beautified api, please enter your category in format like this to start getting your ads</b><br>"
                    + `/api/un/${req.params.name}`);
            }
        };
    } catch (error) {
        console.log(error);
    }
});

router.get("/:name/:name2", async (req, res) => {
    try {
        const name1 = req.params.name;
        const name2 = req.params.name2;
        const response = await got(`https://api.divar.ir/v8/web-search/mashhad/${name1}/${name2}`);
        if (!response) {
            res.status(404).send('no such product');
        } else {
            const cat = new CategoryEntity();
                cat.name = name2;
                await categoryservice.insert(cat);
           // setInterval(async () => {
                const json = JSON.parse(response.body);
                json.widget_list.forEach(async (item: { data: { title: any }; }) => {
                    const ad = new AdEntity();
                    ad.title = item.data.title;
                    await adservice.insert(ad);
                    await adservice.addCategory(ad,cat);
                    console.log('past the first');
                    await categoryservice.CategoryAdPlus(cat,ad);
                    console.log('pass the second')

            //    }, 1000000000);
            })
            return res.send('done');
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/:name/:name2/:id", async (req, res) => {
    const ad= await adservice.find(parseInt(req.params.id))
    res.json(ad);
});

router.delete("/:name/:name2/:id", async (req, res) => {
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


export {router as CatfullController};

