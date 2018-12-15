from itertools import zip_longest
import re

import html5lib
import markdown

from stump.core.base import Store


SECTION_TAG = re.compile(r'<!-- *<(/?[a-zA-Z]+[a-zA-Z0-9_-]*)> *-->')


class Prose(Store):

    def __init__(self, path):
        super().__init__(path)

    def load(self):
        try:
            with open(self.path) as f:
                text = f.read()
        except Exception as e:
            self.msgs.error('{}: {}', self.filename, str(e))
            return

        # Ensure that we can extract well-defined sections.
        section_tags = SECTION_TAG.findall(text)
        if not section_tags:
            self.msgs.error(
                '{}: must contain one or more sections', self.filename)
            return
        if len(section_tags) != len(set(section_tags)):
            self.msgs.error(
                '{}: one or more section tags are repeated', self.filename)
            return
        for opn, close in zip_longest(section_tags[::2], section_tags[1::2]):
            if close != '/{}'.format(opn):
                self.msgs.error('{}: one or more section tags are missing '
                                'their preceding opening tag or subsequent '
                                'closing tag', self.filename)
                return

        # Extract the HTML from each section.
        chunks = SECTION_TAG.split(text)
        opn_tags = set(t for t in section_tags if not t.startswith('/'))
        for i, chunk in enumerate(chunks):
            if chunk in opn_tags:
                section_md = chunks[i + 1].strip()
                try:
                    html = markdown.markdown(section_md)
                except Exception as e:
                    self.msgs.error('{}: {}', self.filename, str(e))
                else:
                    self[chunk] = html

    def validate(self):
        super().validate()
        parser = html5lib.HTMLParser(strict=True)
        for section, html in self.items():
            if html:
                try:
                    parser.parseFragment(html)
                except Exception as e:
                    if 'ignored' in str(e).lower():
                        append_msg = self.msgs.warning
                    else:
                        append_msg = self.msgs.error
                    append_msg('{}: {}', self.filename, str(e))
