#!/usr/bin/env python3
import sys

from stump.core.document import gather

exit_code = 0
print('validating documents...')
for doc in gather('.'):
    print((' ' * 3) + '{}...'.format(doc.path))
    doc.msgs.print(indent=6)
    if doc.msgs.has_errors():
        exit_code = 1

sys.exit(exit_code)
