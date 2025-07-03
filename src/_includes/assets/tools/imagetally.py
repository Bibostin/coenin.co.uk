# This program works in a given directory to generate a standard html structure 
# that can be emebedded in a pages to create "galleries" of multimedia content.
#
# The script iterates over all mp4, jpg png files in a given working directory,
# backs the files up to a preservation path, generates a thumbnail for the file
# and then writes a html reference that points this thumbnail to the original
# file as a html <a> link.
#
# bibostin@coenin.co.uk

import os
import glob
import shutil
import re
import ffmpeg
from PIL import Image
from datetime import datetime as datetime

current_time = datetime.now()
thumbnail_array = []
string_array = []
filecount = 0

def sort_by_numeric(list_to_sort):
    return list(map(int, re.findall(r'\d+', list_to_sort)))[0]

# Fetch a valid file path
while True:
    check = input("use current working directory? y/n ")
    if check.casefold() == "y":
        dir_path = os.path.dirname(os.path.abspath(__file__))
        break
    elif check.casefold() == "n":
        dir_path = input("enter full file path to image directory: ")
        if os.path.exists(dir_path):
            break
        print("inputted path appears invalid!")
    else:
        print("invalid input.")

# Make a backup of the current image directory and generate thumbnails
thumbnail_dir_path = os.path.join(dir_path, "thumbnails")
backup_dir_path = os.path.join(dir_path, f"{current_time}-backup")
images = list(glob.iglob(os.path.join(dir_path, "*.jpg")))  # Find .jpg files
images += list(glob.iglob(os.path.join(dir_path, "*.png")))  # Add .png files
videos = list(glob.iglob(os.path.join(dir_path, "*.mp4")))  # Find .mp4 files

os.mkdir(backup_dir_path)
if not os.path.exists(thumbnail_dir_path):
    print(f"Thumbnail dir does not exist, creating at {thumbnail_dir_path}")
    os.mkdir(os.path.join(dir_path, "thumbnails"))

# Handle image files
for file in images:
    if os.path.isfile(file):
        #backup file
        print(f"Preserving {file}")
        shutil.copy2(file, backup_dir_path)
        # Generate thumbnail
        file_name = file.rsplit("/", 1)[1]
        image = Image.open(file)
        image.thumbnail((250, 250))
        thumbnail_array.append(os.path.join(thumbnail_dir_path, file_name))
        print(f"Generating thumbnail as {thumbnail_array[-1]}")
        image.save(thumbnail_array[-1])
        # Generate HTML structure for images
        string_array.append(f"<a href=\"{file_name}\"><img class=\"thumbnail\" src=\"thumbnails/{file_name}\"></img></a>")
    else:
        print(f"file {file} appears invalid, skipping")

# Handle video files
for file in videos:
    if os.path.isfile(file):
        print(f"Preserving {file}")
        shutil.copy2(file, backup_dir_path)
        file_name = file.rsplit("/", 1)[1]
        thumbnail_file = os.path.join(thumbnail_dir_path, f"{os.path.splitext(file_name)[0]}.png")
        print(f"Generating video thumbnail as {thumbnail_file}")
        ffmpeg.input(file, ss=1).output(thumbnail_file, vframes=1).run()
        string_array.append(f"<a href=\"{file_name}\"><img class=\"thumbnail\" src=\"thumbnails/thumbnails/{file_name}\"></img></a>")
    else:
        print(f"file {file} appears invalid, skipping")

# Write the HTML output to a file
string_array.sort(key=sort_by_numeric)
with open("image-elements.txt", "w") as file:
    for string in string_array:
        file.write(f"{string}\n")

print(f"{len(string_array)} total items processed, writing produced HTML to image-elements.txt")
