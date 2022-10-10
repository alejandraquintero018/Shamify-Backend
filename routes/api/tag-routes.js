const router = require('express').Router();
const bodyParser = require('body-parser');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Category.findAll({
  // be sure to include its associated Product data
      include: [{ model: Product }],
      id: req.body.Product.id,
      product_name: req.body.Product.product_name,
      price: req.body.Product.price,
      stock: req.body.Product.stock,
      category_id: req.body.Product.category_id,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const categoryData = await Category.findByPk(req.params.id, {
       // be sure to include its associated Product data
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'There are no categories under that id' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
