from stump.core.base import YAML


class Recipe(YAML):

    REQUIRED_KEYS = (
        'body',
    )

    def get_ingredients(self):

        def expand(item):
            name, key = item.split('.')
            is_optional = False
            is_star = (key == '*')
            if key.endswith('?'):
                is_optional = True
                key = key.rstrip('?')
            return (name, key, is_optional, is_star)

        for item in self.get('body', ()):
            if 'meta.info-box' in item:
                for sub_item in item['meta.info-box']:
                    yield expand(sub_item)
            else:
                yield expand(item)
