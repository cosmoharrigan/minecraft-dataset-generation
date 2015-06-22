"""
Loads a Minecraft level file and displays, for the chunk located at (0, 0),
the 2D NumPy arrays for the slices at each altitude that contains blocks.
"""

from __future__ import print_function
import mclevel
import numpy as np

__author__ = "Cosmo Harrigan"

# Load the level data: set the path using level_filename here
level_filename = "/Users/cosmo/minecraft-dataset-generation/world/level.dat" # Unprocessed repository version
# level_filename = "/Users/cosmo/minecraft-server/world/level.dat" # Server version
# level_filename = "/Users/cosmo/minecraft-dataset-generation/world-processed/level.dat" # Processed repository version
# level_filename = "/Users/cosmo/Library/Application Support/minecraft/saves/test6b/level.dat" # MCEdit saved version

world = mclevel.loadWorld(level_filename)

# Check how many chunks are defined in the world
chunks = world.getChunks()
print("Number of chunks: {0}".format(len(list(chunks))))

# Print the position of each chunk
# chunk_positions = list(world.allChunks)
# print("Chunk positions:")
# for chunk_position in chunk_positions:
#     print(chunk_position)

# In this case, we will only work with the chunk located at (0, 0) since we
# are defining a small world that fits within one chunk.
chunk = world.getChunk(0, 0)

block_count = 0

# Display the blocks at each slice that is non-empty
for altitude in range(256):
    # Print the slice of this altitude
    altitude_slice = chunk.Blocks[:, :, altitude]

    # If the altitude slice contains any blocks, print it
    if np.sum(altitude_slice):
        print("---- Altitude: {0}".format(altitude))
        print(altitude_slice)
        block_count += np.count_nonzero(altitude_slice)

print("Total block count: {0}".format(int(block_count)))

# Modify a block: set coordinate (0, 0) at altitude 2 to be a mushroom
chunk.Blocks[0, 0, 2] = 40

# Erase any blocks above the grass
#for altitude in range(256 - 2):
#    chunk.Blocks[:, :, altitude] = 0
chunk.Blocks[:, :, 2:255] = 0

# Randomly place 10 blocks according to certain constraints
num_blocks = 10
for i in range(num_blocks):
    # Randomly choose x and y coordinates within the range of 0 to 15
    x = np.random.randint(0, 15)
    y = np.random.randint(0, 15)
    # Randomly choose an altitude coordinate between 2 (the first level above the grass) and 10
    altitude = np.random.randint(2, 10)
    # Randomly choose a block type from 1 (stone), 17 (wood), 40 (mushroom)
    block_type = np.random.choice([1, 17, 40])
    # Place the block
    chunk.Blocks[x, y, altitude] = block_type

# Save the updated world
chunk.chunkChanged()
world.saveInPlace()

# # Check what methods and attributes the world exposes
# [print(elem) for elem in dir(world)]
