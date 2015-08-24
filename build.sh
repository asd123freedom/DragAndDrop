#!/bin/bash

# 配置目标路径，通常是rd的分支或者主干
# dist=""
dist='../med-mis-byq/frontend'

# edp.
edp build -f

# pathMapper

# 删除冗余less文件
find ./output -name "*.less" | xargs rm -f

mkdir -p $dist/web/asset


# 拷贝
rm -rf $dist/web/asset/*

cp -rf ./output/src/* $dist/web/asset
cp -rf ./output/views/* $dist/views

rm -rf output

#echo "成功发布至目录：$dist"
