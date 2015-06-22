# Minecraft Machine Learning Dataset: Generation Instructions

## Overview
The files needed to generate the Minecraft dataset are provided here.

The world has one chunk defined, which is 16x16 blocks wide by 256 blocks high.

## Contents
* **world** - The ```world``` folder in the Minecraft server folder should be replaced with this folder.
* **server.properties** - The ```server.properties``` file in the Minecraft server folder should be replaced with this file.
* **world-processed** - This is what the ```world``` folder is transformed into after it is loaded the first time by the Minecraft server.
* **display-world.py** - Illustrates how to use the ```pymclevel``` Python interface to display world data.

## Screenshot
![Screenshot](screenshot.png)

## Instructions
* Download [MCEdit Unified](https://khroki.github.io/MCEdit-Unified/) as a GUI world editor
* Clone the [MCEdit Unified repository](https://github.com/Khroki/MCEdit-Unified) to obtain the Python programmatic world editor.
* To run ```display-world.py```, **cd** to the ```MCEdit-Unified``` folder that you cloned from the repository, and run ```python2 ~/minecraft-dataset-generation/display-world.py``` (replace with the correct path on your system as needed.)
* The file ```pymclevel/mclevel.py``` in the ```MCEdit-Unified``` repository provides a useful explanation of how to interact with the ```pymclevel``` API.
