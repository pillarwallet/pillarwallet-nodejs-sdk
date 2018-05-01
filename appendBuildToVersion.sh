#!/bin/bash
OLDVERSION=$(node -e "console.log( require('./package.json').version )");
VERSION=$(echo $OLDVERSION | cut -d- -f1);
BUILD=$(echo $OLDVERSION | cut -d- -f2);

if [[ ! -z "$CIRCLE_BUILD_NUM" ]]
then
  NEWBUILD=$CIRCLE_BUILD_NUM
else
  if [[ -z "$BUILD" || "$BUILD" = "$VERSION" ]]
  then
    NEWBUILD=1
  else
    NEWBUILD=$(echo $BUILD + 1 | bc);
  fi
fi

npm version $VERSION-$NEWBUILD
