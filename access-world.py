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
#level_filename = "/Users/cosmo/minecraft-server/world/level.dat" # Server version
#level_filename = "/Users/cosmo/minecraft-dataset-generation/world-processed/level.dat" # Processed repository version
#level_filename = "/Users/cosmo/Library/Application Support/minecraft/saves/test6b/level.dat" # MCEdit saved version

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

# Save the updated world
chunk.chunkChanged()
world.saveInPlace()

# world.saveToFile("level_updated.dat")
# # world.saveInPlace
#
# # Check what methods and attributes the world exposes
# for elem in dir(world):
#     print(elem)