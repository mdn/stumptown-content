import os
import os.path

from stump.core.meta import Meta
from stump.core.prose import Prose
from stump.core.recipe import Recipe
from stump.core.base import Messages


def gather(root):
    for path, dirs, filenames in os.walk(root):
        if Document.META in filenames:
            yield Document(path)


class Document:

    META = 'meta.yaml'
    PROSE = 'prose.md'

    def __init__(self, path):
        super().__init__()
        self.path = os.path.abspath(path)
        self.meta = Meta(os.path.join(self.path, self.META))
        self.prose = Prose(os.path.join(self.path, self.PROSE))
        self.recipe = Recipe(self.meta.recipe_path)
        self.msgs = Messages(self.meta.msgs, self.prose.msgs, self.recipe.msgs)
        self.validate()

    def validate(self):
        for name, key, is_optional, is_star in self.recipe.get_ingredients():
            store = getattr(self, name)
            if not is_star:
                if not (store.get(key) or is_optional):
                    self.msgs.error('"{}" is missing or empty within {}', key,
                                    store.filename)
