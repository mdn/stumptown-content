# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

#!/bin/sh

API=$1
if [ $2 = '-r' ]
then
  NEW_BRANCH=false
else
  NEW_BRANCH=true
fi
CREATION_PATH='content/en-US/api/'

echo
echo "Updating current branch"
git pull
if [ "$NEW_BRANCH" ]
  git checkout -b "$API"
  echo "A new branch has been created named $API."
fi

git checkout -b "$API"

mkdir -p "$CREATION_PATH$API"
cp ov-template.md "$CREATION_PATH$API"/"$API".md
git add "$CREATION_PATH$API"/"$API".md

echo
echo "A template file has been created at"
echo "$CREATION_PATH$API/$API.md."
echo
echo "Follow the instructions in that file then commit and push the result."