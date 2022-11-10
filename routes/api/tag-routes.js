const router = require('express').Router();
const bodyParser = require('body-parser');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag,
      }]
    });
    if (tagData) {
      res.status(200).json(tagData);
    } else {
      res.status(404).json("No tag data found")
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [
        {
          model: Product,
          through: ProductTag,
        }
      ],
    }).then((tagData) => res.status(200).json(tagData));
    if (!tagData) {
      res.status(404).json({ message: 'There are no tags under that id' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((createTag) => res.status(200).json(createTag))
  if (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then((updateTag) => res.status(200).json(updateTag));
  if (err) {
    res.status(404).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deleteTag) => res.status(200).json(deleteTag)); 
  if(err) {
    res.status(404).json(err);
  }
});

module.exports = router;
