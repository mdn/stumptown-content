import os.path

from stump.constants import RECIPE_DIR
from stump.core.base import YAML


class Meta(YAML):

    REQUIRED_KEYS = (
        'mdn-url',
        'recipe',
        'title',
    )

    @property
    def recipe_path(self):
        recipe = self.get('recipe')
        if recipe:
            return os.path.join(RECIPE_DIR, '{}.yaml'.format(recipe))
        return None

    def validate(self):
        super().validate()
        # Validate the recipe path
        if self.recipe_path and not os.path.exists(self.recipe_path):
            self.error('{}: the recipe "{}" does not exist',
                       self.filename, self.recipe_path)
