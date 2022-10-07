const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: [
            'id',
            'product_name',
            'price',
            'stock',
            'category_id'
          ]
        }
      ]
    });
    res.json(tagData);
  }
  catch (error) {
    res.status(507).json(error)
   }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagID = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {model: Product,
          attributes: [
            'id',
            'product_name',
            'price',
            'stock',
            'category_id'
          ]
        }
      ]
    });
    if(tagID) {
      res.json(tagID);
    } else {
      res.status(404).json({ error: "Tag not found, try a different ID"});
    }
  }
  catch (error) {
    res.status(508).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  let newTag = {
    tag_name: req.body.tag_name || 'Unknown Tag(Please rename)'
  }
  try {
    const tagNew = await Tag.create(newTag);
    res.json(tagNew)
  }
  catch (error) {
    res.status(507).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if(tagUpdate){
      res.json({ status: `successfully updated tag with ID = ${req.params.id}`})
    } else {
      res.status(404).json({ error: "Tag not found, try a different ID"})
    }
  }
  catch (error) {
    res.status(509).json(error)
  }
});

// router.delete('/:id', (req, res) => {
//   // delete on tag by its `id` value
// });

module.exports = router;
