#!/bin/sh

SECTIONS_CSV_FILE="sections.csv"
SECTIONS_LIST=(`cat ${SECTIONS_CSV_FILE} | tr -s ',' ' '`) # 配列へ変換
SECTIONS_NUM=`echo ${#SECTIONS_LIST[@]}` # データの数

# データ数繰り返す
for((i=0; i < ${SECTIONS_NUM}; i++));
do
  SECTION=`echo ${SECTIONS_LIST[${i}]}`

  ############################################################
  # scss
  ############################################################
  
  SCSS_SOURCE=../src/scss/parts/_.scss # コピー元
  SCSS_TARGET=../src/scss/parts/_${SECTION}.scss # コピー先
  SCSS_STYLE=../src/scss/style.scss # style.scss
  
  if [ ! -f $SCSS_TARGET ]; then
    # コピー（ダウルクォーテーションあるとバグる）
    cp -P -n $SCSS_SOURCE $SCSS_TARGET # 同盟ファイルは上書きしない
    # 置換（-i ''：バックアップなし）
    sed -i '' "s/.a{/.${SECTION}{/" $SCSS_TARGET # クラス名を変換
    # Style.scss追記
    echo "@import 'parts/_${SECTION}';" >> $SCSS_STYLE
  fi
  
  ############################################################
  # pug
  ############################################################
  
  PUG_SOURCE=../src/pug/parts/_.pug # コピー元
  PUG_TARGET=../src/pug/parts/_${SECTION}.pug # コピー先

  if [ ! -f $PUG_TARGET ]; then
    # コピー
    cp -P -n $PUG_SOURCE $PUG_TARGET # 同盟ファイルは上書きしない
    # 置換（-i ''：バックアップなし）
    sed -i '' "s/#id/#${SECTION}/" $PUG_TARGET # クラス名を変換
    sed -i '' "s/.class/.${SECTION}/" $PUG_TARGET # クラス名を変換
  fi

done
