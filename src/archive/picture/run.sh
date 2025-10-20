#!/bin/bash
picture_root_directory="/mnt/d/pictures"
# rules
# source_directory|rule|target_directory
rule="
$picture_root_directory/归档/记录/Screenshots|IMG_2015*.jpg|$picture_root_directory/归档/生活/2015-生活;
$picture_root_directory/归档/记录/Screenshots|IMG_2016*.jpg|$picture_root_directory/归档/生活/2016-生活;
$picture_root_directory/归档/记录/Screenshots|IMG_2017*.jpg|$picture_root_directory/归档/生活/2017-生活;
$picture_root_directory/归档/记录/Screenshots|IMG_2018*.jpg|$picture_root_directory/归档/生活/2018-生活;
$picture_root_directory/归档/记录/Screenshots|IMG_2019*.jpg|$picture_root_directory/归档/生活/2019-生活;
$picture_root_directory/归档/记录/Screenshots|IMG_2020*.jpg|$picture_root_directory/归档/生活/2020-生活;
$picture_root_directory/归档/记录/Screenshots|IMG_2021*.jpg|$picture_root_directory/归档/生活/2021-生活;
$picture_root_directory/归档/记录/Screenshots|IMG_2022*.jpg|$picture_root_directory/归档/生活/2022-生活;
"
rule=$(echo "$rule"|tr -d '\n\r')
# split location
rules=("${rule//;/ }")
# how to make string to array
rules=( $rules )

# myvar="string1,string2,string3"
# IFS="," read -ra myarray <<< $myvar

# myvar="string1 string2 string3"
# myarray=($myvar)
echo "${rules[0]}"

# echo "${rules[@]}"
for r in "${rules[@]}";
do
  echo "do work rule:""$r"
  detail_rule=(${rule//\|/ })
  files=( $(find "${detail_rule[0]}" -type f -name "${detail_rule[1]}") )
  for f in "${files[@]}"; 
  do
      echo $f
  done
done
cd $picture_root_directory || exit
# find $picture_root_directory -type f -name "IMG_2021*.jpg"
# find . -name "IMG_2021" -f '.jpg'