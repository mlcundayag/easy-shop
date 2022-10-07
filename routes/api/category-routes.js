const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
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
    })
    res.json(categoryData);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryID = await Category.findOne({
      where: {
        id: req.params.id,
      },
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
    if(categoryID) {
    res.json(categoryID);
  } else {
    res.status(404).json({error: "Category not found, try a different ID"});
  }
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  let newCategory = {
    category_name: req.body.category_name || 'Unknown Category(Please rename)'
  }
  try {
    const categoryNew = await Category.create(newCategory);
    res.json(categoryNew)
  } catch (error) {
    res.status(502).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(categoryUpdate === 1) {
      res.json({status: `successfully updated category with ID = ${req.params.id}`});
    } else {
      res.status(404).json({error: "Category not found, try a different ID"});
    }
  } catch (error) {
    res.status(503).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    if(categoryDelete) {
      res.json({status: `successfully deleted category with ID = ${req.params.id}`})
    } else {
      res.status(404).json({error: "Category not found, try a different ID"})
    }
  } catch (error) {
    res.status(503).json(error);
  }
});

module.exports = router;
