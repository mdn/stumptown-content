import os.path

import yaml


class Messages(dict):

    LEVELS = ('error', 'warning', 'info')

    def __init__(self, *children):
        super().__init__()
        self.children = children

    def has_errors(self):
        return bool(self.get('error'))

    def has_warnings(self):
        return bool(self.get('warning'))

    def print(self, *levels, **kwargs):
        for child in self.children:
            child.print(*levels, **kwargs)
        indent = kwargs.pop('indent', 0)
        for level in (levels or self.LEVELS):
            for msg in self.get(level, ()):
                for line in msg.splitlines():
                    text = '{}{}: {}'.format((' ' * indent), level, line)
                    print(text, **kwargs)

    def error(self, msg, *args, **kwargs):
        self.setdefault('error', []).append(msg.format(*args, **kwargs))

    def warning(self, msg, *args, **kwargs):
        self.setdefault('warning', []).append(msg.format(*args, **kwargs))

    def info(self, msg, *args, **kwargs):
        self.setdefault('info', []).append(msg.format(*args, **kwargs))


class Store(dict):

    REQUIRED_KEYS = ()

    def __init__(self, path):
        super().__init__()
        self.msgs = Messages()
        if path is None:
            self.path = None
            self.filename = None
            self.msgs.error('{}: path is None', self.__class__)
        else:
            self.path = os.path.abspath(path)
            self.filename = os.path.basename(path)
            self.load()
            self.validate()

    def load(self):
        raise NotImplementedError

    def validate(self):
        keys = self.keys()
        # Ensure the presence of required keys
        for key in sorted(self.REQUIRED_KEYS):
            if key not in keys:
                self.msgs.error(
                    '{}: missing required key "{}"', self.filename, key)
            elif not self[key]:
                self.msgs.error(
                    '{}: required key "{}" is empty', self.filename, key)


class YAML(Store):

    def load(self):
        try:
            with open(self.path) as f:
                self.update(yaml.load(f))
        except Exception as e:
            self.msgs.error('{}: {}', self.filename, str(e))
